<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class OTPToken extends Model {
  public ?int $id;
  public int $user_id;
  public string $otp;
  public string $otp_expiry;
  public bool $otp_verified;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getUserId(): int {
    return $this->user_id;
  }
  public function getOTP(): string {
    return $this->otp;
  }
  public function getOTPExpiry(): DateTime {
    $parts = explode(" ", $this->otp_expiry);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }
  public function setOTPExpiry(DateTime $expiry) {
    $this->otp_expiry = $expiry->format("Y-m-d H:i:s");
  }
  public function getOTPExpiryString(): string {
    return $this->otp_expiry;
  }
  public function getOTPVerified(): bool {
    return $this->otp_verified;
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
      "otp VARCHAR(6) NOT NULL",
      "otp_expiry DATETIME NOT NULL",
      "otp_verified BOOLEAN DEFAULT FALSE NOT NULL",
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