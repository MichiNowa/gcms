<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class AssessmentForm extends Model {
  public ?int $id;
  public int $schoolyear_id;
  public string $category_name;
  public string $items;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getSchoolyearId(): int
  {
    return $this->schoolyear_id;
  }
  public function getCategoryName(): string
  {
    return $this->category_name;
  }
  public function getItems(): array
  {
    return json_decode($this->items, true);
  }
  public function getItemsString(): string
  {
    return $this->items;
  }
  public function setItems(array $items): void
  {
    $this->items = json_encode($items);
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
      "schoolyear_id BIGINT NOT NULL",
      "category_name VARCHAR(255) NOT NULL",
      "items TEXT DEFAULT '[]' NOT NULL",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      "UNIQUE (schoolyear_id, category_name)",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['schoolyear_id', Schoolyear::getTableName(), 'id', 'CASCADE', 'CASCADE'],
    ];
  }
}