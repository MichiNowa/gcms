<?php

namespace Smcc\Gcms\orm;

use Error;
use PDO;
use PDOException;
use Smcc\Gcms\orm\models\AgreementForm;
use Smcc\Gcms\orm\models\BasicStatus;
use Smcc\Gcms\orm\models\CollegeStatus;
use Smcc\Gcms\orm\models\Schoolyear;
use Smcc\Gcms\orm\models\StudentBasic;
use Smcc\Gcms\orm\models\Users;
use Smcc\Gcms\orm\models\StudentCollege;
use Smcc\Gcms\orm\models\StudentProfile;
use Smcc\Gcms\orm\models\Notification;
use Smcc\Gcms\orm\models\AssessmentForm;
use Smcc\Gcms\orm\models\Assessment;
use Smcc\Gcms\orm\models\CalledInSlip;
use Smcc\Gcms\orm\models\CaseNote;
use Smcc\Gcms\orm\models\FeedbackForm;
use Smcc\Gcms\orm\models\OTPToken;
use Smcc\Gcms\orm\models\ReferralForm;

class Database {
  private static $instance = null;
  private ?PDO $db = null;
  private string $host = DB_HOST ?? 'localhost';
  private string $dbname = DB_NAME ?? 'gcms';
  private string $user = DB_USER ?? 'root';
  private string $pass = DB_PASS ?? '';
  private array $modelClasses = [
    Schoolyear::class,
    Users::class,
    Notification::class,
    StudentProfile::class,
    StudentCollege::class,
    StudentBasic::class,
    BasicStatus::class,
    CollegeStatus::class,
    AssessmentForm::class,
    Assessment::class,
    CalledInSlip::class,
    CaseNote::class,
    AgreementForm::class,
    ReferralForm::class,
    FeedbackForm::class,
    OTPToken::class,
  ];

  private function __construct() {
    try {
      $this->db = new PDO("mysql:host={$this->host};dbname={$this->dbname}", $this->user, $this->pass);
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
      $this->createTables();
      $this->createForeignConstraints();
    } catch (PDOException $e) {
      // disable error reporting
      error_reporting(0);
      showPage('error', 'Database Connection Error', ['error' => "Database Connection Failed. Database Server cannot be reached. May be shutdown or unable to reach connection."]);
      exit;
    }
  }

  public function getPDO(): ?PDO {
    return $this->db;
  }

  public static function createSeed() {
    if (count(Users::findMany('role', 'superadmin')) === 0) {
      if (Users::getRowCount(["username" => "superadmin"]) === 0) {
        // create new account for superadmin
        $user = new Users();
        $user->username = "superadmin";
        $user->setPassword("superadmin");
        $user->first_name = "EDP";
        $user->middle_initial = "";
        $user->last_name = "Office";
        $user->gender = "Male";
        $user->email = "edp@smccnasipit.edu.ph";
        $user->profile_pic = "/images/default-user.png";
        $user->role = "superadmin";
        $user->status = true;
        $user->save();
      }
    }
  }

  private function createTables() {
    foreach ($this->modelClasses as $class) {
      $instance = new $class();
      $table = $instance::getTableName();
      try {
        $query = "CREATE TABLE IF NOT EXISTS $table (". implode(", ", $instance->getCreateTable()) . ")";
        $this->db->exec($query);
      } catch (PDOException $e) {
        debug_write("Error creating table: ". $e->getMessage());
      }
    }
  }

  private function createForeignConstraints() {
    foreach ($this->modelClasses as $class) {
      $instance = new $class();
      $table = $instance::getTableName();
      foreach ($instance->getForeignConstraints() as $constraint) {
        [$column, $refTable, $refColumn, $onDelete, $onUpdate] = $constraint;
        try {
          $query = "ALTER TABLE $table ADD CONSTRAINT fk_{$table}_{$column}_{$refTable}_{$refColumn} FOREIGN KEY ($column) REFERENCES {$refTable}($refColumn)";
          if ($onDelete) {
            $query.= " ON DELETE $onDelete";
          }
          if ($onUpdate) {
            $query.= " ON UPDATE $onUpdate";
          }
          $this->db->exec($query);
        } catch (PDOException $e) {}
      }
    }
  }

  public static function getInstance() {
    if (self::$instance === null) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function query(string $sql, $params = [], $fetchMethod = PDO::FETCH_ASSOC): array
  {
    $stmt = $this->db->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll($fetchMethod);
  }

  public function insert(string $table, array $data, $primaryKey = 'id'): bool|int|string
  {
    try {
      $cols = array_keys($data);
      $q = "INSERT INTO $table (". implode(", ", $cols). ") VALUES (". implode(", ", array_fill(0, count($cols), '?')) .")";
      $stmt = $this->db->prepare($q);
      $values = array_values($data);
      if ($stmt->execute(array_values($data))) {
        $lastId = $this->db->lastInsertId();
        // Only override lastId if you explicitly provide a primary key
        if (isset($data[$primaryKey]) && $data[$primaryKey] !== null) {
          $lastId = $data[$primaryKey];
        }
        return $lastId;
      }
      $errorInfo = $stmt->errorInfo();
      throw new Error(strval($errorInfo[2]));
    } catch (\Exception $e) {
      debug_write("Insert failed error: " . $e->getMessage());
    }
    return false;
  }


  public function update(string $table, array $data, $primaryKey = "id"): bool
  {
    try {
      $keys = array_filter(array_keys($data), fn($af) => $af !== 'created_at' && $af !== 'updated_at' && $af !== $primaryKey);
      $values = [...array_map(fn($k) => $data[$k], $keys), $data[$primaryKey]];
      $set = array_map(fn($k) => "$k=?", $keys);
      $stmt = $this->db->prepare("UPDATE $table SET ". implode(", ", $set). " WHERE $primaryKey =?");
      if ($stmt->execute($values)) {
        return true;
      }
      $errorInfo = $stmt->errorInfo();
      throw new Error(strval($errorInfo[2]));
    } catch (\Exception $e) {
      debug_write("Update failed error: " . $e->getMessage());
    }
    return false;
  }

  public function delete(string $table, array $condition): bool
  {
    $this->db->beginTransaction();
    $set = array_map(fn($k) => "$k=?", array_keys($condition));
    $stmt = $this->db->prepare("DELETE FROM $table WHERE ". implode(" AND ", $set));
    if ($stmt->execute(array_values($condition))) {
      $this->db->commit();
      return true;
    }
    $this->db->rollBack();
    return false;
  }
}