<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class AgreementForm extends Model {
  public ?int $id;
  public int $user_id;
  public int $guidance_id;
  public int $schoolyear_id;
  public ?int $case_note_id;
  public ?int $called_slip_id;
  public string $agreement_pic;
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
  public function getCalledSlipId():?int
  {
    return $this->called_slip_id;
  }
  public function getAgreementPic(): string
  {
    return $this->agreement_pic;
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
      "called_slip_id BIGINT",
      "agreement_pic TEXT NOT NULL",
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
      ['called_slip_id', CalledInSlip::getTableName(), 'id', 'SET NULL', 'RESTRICT'],
    ];
  }
}