<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class Schoolyear extends Model {
  public ?int $id;
  public int|string $year;
  public bool $editable;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getYear(): int|string
  {
    return $this->year;
  }
  public function isEditable(): bool
  {
    return $this->editable;
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
      "year YEAR NOT NULL",
      "editable BOOLEAN DEFAULT TRUE NOT NULL",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array
  {
    return [];
  }
}