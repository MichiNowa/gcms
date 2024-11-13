<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class Assessment extends Model {
  public ?int $id;
  public int $user_id;
  public int $assessment_form_id;
  public string $assessment_response;
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
  public function getAssessmentFormId(): int
  {
    return $this->assessment_form_id;
  }
  public function getAssessmentResponse(): array
  {
    return json_decode($this->assessment_response, true);
  }
  public function getAssessmentResponseString(): string
  {
    return json_encode($this->assessment_response);
  }
  public function setAssessmentResponse(array $items)
  {
    $this->assessment_response = json_encode($items);
  }
  public function getCreatedAt(): DateTime {
    $parts = explode(" ", $this->created_at);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }
  public function getUpdatedAt(): DateTime {
    $parts = explode(" ", $this->updated_at);
    return new DateTime($parts[0]."T".$parts[1].".000+08:00");
  }
  public function getScore(): float
  {
    $score = 0;
    $form = AssessmentForm::findOne('id', $this->assessment_form_id);
    if (!$form) return 0;
    $items = $form->getItems();
    foreach ($this->getAssessmentResponse() as $item) {
      $score += !$item['response'] ? 0 : (
        array_reduce($items, function($init, $it) use($item) {
          if (strval($item['id']) === strval($it['id'])) {
            return !$it['alarming'] ? 1 : 100;
          }
          return $init;
        }, 0)
      );
    }
    return $score;
  }
  public function getCreateTable(): array
  {
    return [
      "id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY",
      "user_id BIGINT NOT NULL",
      "assessment_form_id BIGINT NOT NULL",
      "assessment_response TEXT DEFAULT '[]' NOT NULL",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      "UNIQUE (user_id, assessment_form_id)",
    ];
  }
  public function getForeignConstraints(): array {
    return [
      ['user_id', Users::getTableName(), 'id', 'CASCADE', 'CASCADE'],
      ['assessment_form_id', AssessmentForm::getTableName(), 'id', 'CASCADE', 'CASCADE'],
    ];
  }
}