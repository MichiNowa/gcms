<?php

namespace Smcc\Gcms\orm\models;

use DateTime;

class Users extends Model
{
  public ?int $id;
  public string $username;
  public string $password;
  public string $first_name;
  public string $middle_initial;
  public string $last_name;
  public string $gender;
  public string $email;
  public string $profile_pic;
  public string $role;
  public bool $status;
  public ?string $created_at;
  public ?string $updated_at;

  public function setPassword(string $password)
  {
    $this->password = password_hash($password, PASSWORD_DEFAULT);
  }

  public function checkPassword(string $password): bool
  {
    return password_verify($password, $this->password);
  }

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getUsername(): string
  {
    return $this->username;
  }
  public function getPassword(): string
  {
    return $this->password;
  }
  public function getFirstName(): string
  {
    return $this->first_name;
  }
  public function getMiddleInitial(): string
  {
    return $this->middle_initial;
  }
  public function getLastName(): string
  {
    return $this->last_name;
  }
  public function getGender(): string
  {
    return $this->gender;
  }
  public function getEmail(): string
  {
    return $this->email;
  }
  public function getProfilePic(): string
  {
    return $this->profile_pic;
  }
  public function getRole(): string
  {
    return $this->role;
  }
  public function getStatus(): bool
  {
    return $this->status;
  }
  public function getCreatedAt(): DateTime
  {
    $parts = explode(" ", $this->created_at);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }
  public function getUpdatedAt(): DateTime
  {
    $parts = explode(" ", $this->updated_at);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }

  public function getCreateTable(): array
  {
    return [
      "id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY",
      "username VARCHAR(255) NOT NULL UNIQUE",
      "password VARCHAR(255) NOT NULL",
      "first_name VARCHAR(255) NOT NULL",
      "middle_initial VARCHAR(255)",
      "last_name VARCHAR(255) NOT NULL",
      "gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male'",
      "email VARCHAR(255) NOT NULL UNIQUE",
      "profile_pic VARCHAR(255) DEFAULT ''",
      "role ENUM('superadmin', 'admin', 'student') DEFAULT 'student'",
      "status BOOLEAN DEFAULT TRUE",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
  public function getForeignConstraints(): array
  {
    return [];
  }
}
