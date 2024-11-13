<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class CalledInSlip extends Model {
  public ?int $id;
  public int $user_id;
  public int $guidance_id;
  public int $schoolyear_id;
  public string $scheduled_date;
  public string $scheduled_time;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getUserId(): int
  {
    return $this->user_id;
  }
  public function getGuidanceId(): int
  {
    return $this->guidance_id;
  }
  public function getSchoolyearId(): int
  {
    return $this->schoolyear_id;
  }
  public function getScheduledDate(): string
  {
    return $this->scheduled_date;
  }
  public function getScheduledTime(): string
  {
    return $this->scheduled_time;
  }
  public function getSchedule(): DateTime
  {
    $sd = $this->scheduled_date;
    $st = $this->scheduled_time;
    $sched = new DateTime("{$sd}T{$st}.000+08:00");
    return $sched;
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
      "guidance_id BIGINT NOT NULL",
      "schoolyear_id BIGINT NOT NULL",
      "scheduled_date DATE NOT NULL",
      "scheduled_time TIME NOT NULL",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['user_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['guidance_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['schoolyear_id', Schoolyear::getTableName(), 'id', 'CASCADE', 'CASCADE'],
    ];
  }
}