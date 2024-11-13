<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class FeedbackForm extends Model {
  public ?int $id;
  public int $user_id;
  public int $guidance_id;
  public int $schoolyear_id;
  public ?int $case_note_id;
  public string $ratings;
  public string $comments;
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
  public function getCaseNoteId(): ?int
  {
    return $this->case_note_id;
  }
  public function getRatings(): array
  {
    return json_decode($this->ratings ?? "[]", true);
  }
  public function getRatingsString(): string
  {
    return $this->ratings;
  }
  public function setRatings(array $ratings): void
  {
    $this->ratings = json_encode($ratings);
  }
  public function getComments(): string
  {
    return $this->comments;
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
      "case_note_id BIGINT",
      "ratings TEXT DEFAULT '[]' NOT NULL",
      "comments TEXT DEFAULT '' NOT NULL",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['user_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['guidance_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['schoolyear_id', Schoolyear::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['case_note_id', CaseNote::getTableName(), 'id', 'SET NULL', 'RESTRICT'],
    ];
  }
}