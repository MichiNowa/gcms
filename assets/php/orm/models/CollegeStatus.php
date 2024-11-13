<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class CollegeStatus extends Model {
  public ?int $id;
  public int $college_id;
  public string $status;
  public string $reason;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getCollegeId(): int
  {
    return $this->college_id;
  }
  public function getStatus(): string
  {
    return $this->status;
  }
  public function getReason(): string
  {
    return $this->reason;
  }
  public function getCreatedAt(): DateTime {
    $parts = explode(" ", $this->created_at);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }
  public function getUpdatedAt(): DateTime {
    $parts = explode(" ", $this->updated_at);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }
  public function getCreateTable(): array
  {
    return [
      "id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY",
      "college_id BIGINT NOT NULL",
      "status ENUM('pending', 'completed', 'rejected') DEFAULT 'pending'",
      "reason TEXT DEFAULT ''",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['college_id', StudentCollege::getTableName(), 'id', 'CASCADE', 'CASCADE'],
    ];
  }
}