<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class BasicStatus extends Model {
  public ?int $id;
  public int $basic_id;
  public string $status;
  public string $reason;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): ?int
  {
    return $this->id;
  }
  public function getBasicId(): int
  {
    return $this->basic_id;
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
      "basic_id BIGINT NOT NULL",
      "status ENUM('pending', 'completed', 'rejected') DEFAULT 'pending'",
      "reason TEXT DEFAULT ''",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['basic_id', StudentBasic::getTableName(), 'id', 'CASCADE', 'CASCADE'],
    ];
  }
}