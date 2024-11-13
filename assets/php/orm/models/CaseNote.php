<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class CaseNote extends Model {
  public ?int $id;
  public int $user_id;
  public int $guidance_id;
  public int $schoolyear_id;
  public ?int $called_slip_id;
  public string $interaction_type;
  public string $details;
  public string $information_by_counselor;
  public string $client_decision;
  public string $behavioral_observation;
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
  public function getCalledSlipId(): ?int
  {
    return $this->called_slip_id;
  }
  public function getInteractionType(): string
  {
    return $this->interaction_type;
  }
  public function getDetails(): string
  {
    return $this->details;
  }
  public function getInformationByCounselor(): string
  {
    return $this->information_by_counselor;
  }
  public function getClientDecision(): string
  {
    return $this->client_decision;
  }
  public function getBehavioralObservation(): string
  {
    return $this->behavioral_observation;
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
      "called_slip_id BIGINT",
      "interaction_type ENUM('Individual', 'Group', 'Called-in', 'Walked-in', 'Referred', 'Follow-up') DEFAULT 'Individual' NOT NULL",
      "details TEXT DEFAULT '' NOT NULL",
      "information_by_counselor TEXT DEFAULT '' NOT NULL",
      "client_decision TEXT DEFAULT '' NOT NULL",
      "behavioral_observation TEXT DEFAULT '' NOT NULL",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['user_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['guidance_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['schoolyear_id', Schoolyear::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['called_slip_id', CalledInSlip::getTableName(), 'id', 'SET NULL', 'RESTRICT'],
    ];
  }
}