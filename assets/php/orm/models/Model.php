<?php

namespace Smcc\Gcms\orm\models;

use Smcc\Gcms\orm\Database;

interface BaseModel
{
  public static function getTableName(): string;
  public static function all(): array;
  public static function findAll(): array;
  public static function findMany($col, $value): array;
  public static function findOne($col, $value): ?static;
  public static function getRowCount(array $condition): int;
  public function getCreateTable(): array;
  public function getForeignConstraints(): array;
  public function save(): bool|int|string;
  public function delete(): bool;
  public function toArray(): array;
  public function toJSON(): string;
}

class Model implements BaseModel
{

  public function __construct()
  {
    foreach ($this->getCreateTable() as $column) {
      $col = explode(" ", $column)[0];
      $datatype = explode(" ", $column)[1];
      if (str_starts_with(strtolower($datatype), "enum")) {
        $default = explode("default ", strtolower($column));
        $default = array_pop($default);
        $default = explode(" ", $default);
        $default = array_shift($default);
        $default = trim($default, "'");
        $this->{$col} = $default;
        continue;
      }
      try {
        $this->{$col} = null;
      } catch (\Throwable $e) {
        try {
          $this->{$col} = '';
        } catch (\Throwable $e) {
          $this->{$col} = 0;
        }
      }
    }
  }

  public function getCreateTable(): array {
    return [];
  }
  public function getForeignConstraints(): array {
    return [];
  }

  public static function getTableName(): string
  {
    $class = get_called_class();
    return strtolower(basename(str_replace('\\', '/', $class)));
  }
  public static function all(): array
  {
    $db = Database::getInstance();
    $tablename = self::getTableName();
    return $db->query("SELECT * FROM $tablename");
  }

  public static function findAll(): array
  {
    $db = Database::getInstance();
    $tablename = self::getTableName();
    $result = $db->query("SELECT * FROM $tablename");
    switch (count($result)) {
      case 0:
        return [];
      default: {
        $modelRows = [];
        foreach ($result as $row) {
          $model = new static();
          foreach ($row as $key => $value) {
            $model->{$key} = $value;
          }
          $modelRows[] = $model;
        }
        return $modelRows;
      }
    }
  }

  public static function findMany($col, $value): array
  {
    $db = Database::getInstance();
    $tablename = self::getTableName();
    $result = $db->query("SELECT * FROM $tablename WHERE $col =?", [$value]);
    switch (count($result)) {
      case 0:
        return [];
      default: {
          $modelRows = [];
          foreach ($result as $row) {
            $model = new static();
            foreach ($row as $key => $value) {
              $model->{$key} = $value;
            }
            $modelRows[] = $model;
          }
          return $modelRows;
        }
    }
  }

  public static function findOne($col, $value): ?static
  {
    $db = Database::getInstance();
    $tablename = self::getTableName();
    $result = $db->query("SELECT * FROM $tablename WHERE $col =?", [$value]);
    switch (count($result)) {
      case 0:
        return null;
      default: {
        $model = new static();
        foreach ($result[0] as $key => $value) {
          $model->{$key} = $value;
        }
        return $model;
      }
    }
  }

  public static function getRowCount($condition): int
  {
    $db = Database::getInstance();
    $cols = array_keys($condition);
    $cond = array_map(fn($c) => "$c =?", $cols);
    $tablename = self::getTableName();
    $result = $db->query("SELECT COUNT(*) as count FROM $tablename WHERE " . implode(" AND ", $cond), array_map(fn($col) => $condition[$col], $cols));
    return $result[0]["count"];
  }

  public function save(): bool|int|string
  {
    try {
      $db = Database::getInstance();
      $tablename = self::getTableName();
      $columns = $db->query("DESC $tablename", [], \PDO::FETCH_COLUMN);
      $primaryKey = array_filter($db->query("DESC $tablename"), fn($qv) => $qv["Key"] === "PRI")[0]["Field"];

      $data = [];
      foreach ($columns as $column) {
        if ($column === $primaryKey && (!isset($this->{$column}) || $this->{$column} === null)) {
          continue;
        }
        $data[$column] = $this->{$column};
      }

      if (array_key_exists($primaryKey, $data) && isset($data[$primaryKey]) && $data[$primaryKey] !== null) {
        return $db->update($tablename, $data, $primaryKey);
      }

      return $db->insert($tablename, $data, $primaryKey);
    } catch (\PDOException $e) {
      debug_write("Error occurred while saving {$tablename}: " . $e->getMessage());
      return false;
    }
  }

  public function delete(): bool
  {
    $db = Database::getInstance();
    $tablename = self::getTableName();
    $q = $db->query("DESC $tablename");
    $primaryKey = array_filter($q, fn($qv) => $qv["Key"] === "PRI")[0]["Field"];
    return $db->delete(self::getTableName(), [$primaryKey => $this->{$primaryKey}]);
  }

  public function toArray(): array
  {
    $arr = [];
    foreach (static::getCreateTable() as $colDesc) {
      $col = explode(" ", $colDesc)[0];
      if (is_string($this->{$col})
        && ((str_starts_with($this->{$col}, "[") && str_ends_with($this->{$col}, "]"))
          || (str_starts_with($this->{$col}, "{") && str_ends_with($this->{$col}, "}")))
      ) {
        $arr[$col] = [...json_decode($this->{$col}, true)];
      } else {
        $arr[$col] = $this->{$col};
      }
    }
    return $arr;
  }

  public function toJSON(): string
  {
    return json_encode($this->toArray());
  }
}
