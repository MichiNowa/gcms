<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class Notification extends Model {
  public ?int $id;
  public int $user_id;
  public string $title;
  public string $message;
  public string $href;
  public bool $is_read;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getUserId(): int {
    return $this->user_id;
  }
  public function getTitle(): string {
      return $this->title;
  }
  public function getMessage(): string {
      return $this->message;
  }
  public function getHref(): string {
      return $this->href;
  }
  public function isRead(): bool {
      return $this->is_read;
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
      "user_id BIGINT NOT NULL",
      "title VARCHAR(255) NOT NULL",
      "message TEXT NOT NULL",
      "href VARCHAR(255) NOT NULL",
      "is_read BOOLEAN DEFAULT FALSE",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['user_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
    ];
  }
}