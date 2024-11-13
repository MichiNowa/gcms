<?php

namespace Smcc\Gcms\orm\models;
use DateTime;

class StudentProfile extends Model {
  public ?int $id;
  public string $profile_pic;
  public string $middle_name;
  public string $suffix_name;
  public int $age;
  public string $bloodtype;
  public float $height;
  public float $weight;
  public string $civil_status;
  public string $citizenship;
  public string $address;
  public string $birthdate;
  public string $contact;
  public string $religion;
  public string $emergency_name;
  public string $emergency_relationship;
  public string $emergency_contact;
  public string $father_last_name;
  public string $father_first_name;
  public string $father_middle_name;
  public string $father_contact;
  public string $father_occupation;
  public string $father_employee_type;
  public string $father_education_attainment;
  public string $mother_last_name;
  public string $mother_first_name;
  public string $mother_middle_name;
  public string $mother_contact;
  public string $mother_occupation;
  public string $mother_employee_type;
  public string $mother_education_attainment;
  public string $parent_address;
  public string $parent_marital_status;
  public string $doctoral;
  public string $doctoral_graduated;
  public string $doctoral_honors;
  public string $doctoral_program;
  public string $masteral;
  public string $masteral_graduated;
  public string $masteral_honors;
  public string $masteral_program;
  public string $college;
  public string $college_graduated;
  public string $college_honors;
  public string $college_program;
  public string $techvoc;
  public string $techvoc_graduated;
  public string $techvoc_honors;
  public string $highschool;
  public string $highschool_graduated;
  public string $highschool_honors;
  public string $als;
  public string $als_graduated;
  public string $als_honors;
  public string $elementary;
  public string $elementary_graduated;
  public string $elementary_honors;
  public string $support;
  public int $number_of_siblings;
  public string $siblings;
  public int $home_persons_living;
  public int $home_children;
  public string $homelife;
  public string $workathome;
  public ?string $work;
  public string $discipline_type;
  public string $discipline_handle;
  public string $sleep_time;
  public string $have_friends;
  public ?string $why_friend;
  public string $hobbies;
  public string $enjoy;
  public string $organization_out_of_school;
  public string $health_history;
  public string $health_exhibit_mannerisms;
  public string $health_past_operations;
  public string $health_allergies;
  public string $indigenous_group;
  public ?string $indigenous_group_specify;
  public string $differently_abled;
  public ?string $differently_abled_specify;
  public string $solo_parent;
  public ?string $solo_parent_specify;
  public ?string $created_at;
  public ?string $updated_at;

  public function getId(): int|string
  {
    return $this->id;
  }
  public function getProfilePic(): string
  {
    return $this->profile_pic;
  }
  public function getMiddleName(): string
  {
    return $this->middle_name;
  }
  public function getSuffixName(): string
  {
    return $this->suffix_name;
  }
  public function getAge(): int
  {
    return $this->age;
  }
  public function getBloodtype(): string
  {
    return $this->bloodtype;
  }
  public function getHeight(): float
  {
    return $this->height;
  }
  public function getWeight(): float
  {
    return $this->weight;
  }
  public function getCivilStatus(): string
  {
    return $this->civil_status;
  }
  public function getCitizenship(): string
  {
    return $this->citizenship;
  }
  public function getAddress(): string
  {
    return $this->address;
  }
  public function getBirthdate(): string
  {
    return $this->birthdate;
  }
  public function getContact(): string
  {
    return $this->contact;
  }
  public function getReligion(): string
  {
    return $this->religion;
  }
  public function getEmergencyName(): string
  {
    return $this->emergency_name;
  }
  public function getEmergencyRelationship(): string
  {
    return $this->emergency_relationship;
  }
  public function getEmergencyContact(): string
  {
    return $this->emergency_contact;
  }
  public function getFatherLastName(): string
  {
    return $this->father_last_name;
  }
  public function getFatherFirstName(): string
  {
    return $this->father_first_name;
  }
  public function getFatherMiddleName(): string
  {
    return $this->father_middle_name;
  }
  public function getFatherContact(): string
  {
    return $this->father_contact;
  }
  public function getFatherOccupation(): string
  {
    return $this->father_occupation;
  }
  public function getFatherEmployeeType(): string
  {
    return $this->father_employee_type;
  }
  public function getFatherEducationAttainment(): string
  {
    return $this->father_education_attainment;
  }
  public function getMotherLastName(): string
  {
    return $this->mother_last_name;
  }
  public function getMotherFirstName(): string
  {
    return $this->mother_first_name;
  }
  public function getMotherMiddleName(): string
  {
    return $this->mother_middle_name;
  }
  public function getMotherContact(): string
  {
    return $this->mother_contact;
  }
  public function getMotherOccupation(): string
  {
    return $this->mother_occupation;
  }
  public function getMotherEmployeeType(): string
  {
    return $this->mother_employee_type;
  }
  public function getMotherEducationAttainment(): string
  {
    return $this->mother_education_attainment;
  }
  public function getParentAddress(): string
  {
    return $this->parent_address;
  }
  public function getParentMaritalStatus(): string
  {
    return $this->parent_marital_status;
  }
  public function getDoctoral(): string
  {
    return $this->doctoral;
  }
  public function getDoctoralGraduated(): string
  {
    return $this->doctoral_graduated;
  }
  public function getDoctoralHonors(): string
  {
    return $this->doctoral_honors;
  }
  public function getDoctoralProgram(): string
  {
    return $this->doctoral_program;
  }
  public function getMasteral(): string
  {
    return $this->masteral;
  }
  public function getMasteralGraduated(): string
  {
    return $this->masteral_graduated;
  }
  public function getMasteralHonors(): string
  {
    return $this->masteral_honors;
  }
  public function getMasteralProgram(): string
  {
    return $this->masteral_program;
  }
  public function getCollege(): string
  {
    return $this->college;
  }
  public function getCollegeGraduated(): string
  {
    return $this->college_graduated;
  }
  public function getCollegeHonors(): string
  {
    return $this->college_honors;
  }
  public function getCollegeProgram(): string
  {
    return $this->college_program;
  }
  public function getTechvoc(): string
  {
    return $this->techvoc;
  }
  public function getTechvocGraduated(): string
  {
    return $this->techvoc_graduated;
  }
  public function getTechvocHonors(): string
  {
    return $this->techvoc_honors;
  }
  public function getHighschool(): string
  {
    return $this->highschool;
  }
  public function getHighschoolGraduated(): string
  {
    return $this->highschool_graduated;
  }
  public function getHighschoolHonors(): string
  {
    return $this->highschool_honors;
  }
  public function getAls(): string
  {
    return $this->als;
  }
  public function getAlsGraduated(): string
  {
    return $this->als_graduated;
  }
  public function getAlsHonors(): string
  {
    return $this->als_honors;
  }
  public function getElementary(): string
  {
    return $this->elementary;
  }
  public function getElementaryGraduated(): string
  {
    return $this->elementary_graduated;
  }
  public function getElementaryHonors(): string
  {
    return $this->elementary_honors;
  }
  public function getSupport(): string
  {
    return $this->support;
  }
  public function getNumberOfSiblings(): int
  {
    return $this->number_of_siblings;
  }
  public function getSiblings(): array
  {
    return json_decode($this->siblings ?? "[]", true);
  }
  public function getSiblingsString(): string
  {
    return $this->siblings;
  }
  public function setSiblings(array $siblings = []): void
  {
    $this->siblings = json_encode($siblings, true);
  }
  public function getHomePersonsLiving(): int
  {
    return $this->home_persons_living;
  }
  public function getHomeChildren(): int
  {
    return $this->home_children;
  }
  public function getHomelife(): string
  {
    return $this->homelife;
  }
  public function getWorkathome(): string
  {
    return $this->workathome;
  }
  public function getWork(): ?string
  {
    return $this->work;
  }
  public function getDisciplineType(): string
  {
    return $this->discipline_type;
  }
  public function getDisciplineHandle(): string
  {
    return $this->discipline_handle;
  }
  public function getSleepTime(): string
  {
    return $this->sleep_time;
  }
  public function getHaveFriends(): string
  {
    return $this->have_friends;
  }
  public function getWhyFriend(): ?string
  {
    return $this->why_friend;
  }
  public function getHobbies(): string
  {
    return $this->hobbies;
  }
  public function getEnjoy(): string
  {
    return $this->enjoy;
  }
  public function getOrganizationOutOfSchool(): string
  {
    return $this->organization_out_of_school;
  }
  public function getHealthHistory(): array
  {
    return json_decode($this->health_history ?? "[]", true);
  }
  public function getHealthHistoryString(): string
  {
    return $this->health_history;
  }
  public function setHealthHistory(array $items = []): void
  {
    $this->health_history = json_encode($items, true);
  }
  public function getHealthExhibitMannerisms(): string
  {
    return $this->health_exhibit_mannerisms;
  }
  public function getHealthPastOperations(): string
  {
    return $this->health_past_operations;
  }
  public function getHealthAllergies(): string
  {
    return $this->health_allergies;
  }
  public function getIndigenousGroup(): string
  {
    return $this->indigenous_group;
  }
  public function getIndigenousGroupSpecify(): ?string
  {
    return $this->indigenous_group_specify;
  }
  public function getDifferentlyAbled(): string
  {
    return $this->differently_abled;
  }
  public function getDifferentlyAbledSpecify(): ?string
  {
    return $this->differently_abled_specify;
  }
  public function getSoloParent(): string
  {
    return $this->solo_parent;
  }
  public function getSoloParentSpecify(): ?string
  {
    return $this->solo_parent_specify;
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
      "profile_pic TEXT NOT NULL",
      "middle_name VARCHAR(255) DEFAULT ''",
      "suffix_name VARCHAR(255) DEFAULT ''",
      "age INT(2) NOT NULL",
      "bloodtype VARCHAR(10) NOT NULL",
      "height DECIMAL(5, 2) NOT NULL",
      "weight DECIMAL(5, 2) NOT NULL",
      "civil_status VARCHAR(255) NOT NULL",
      "citizenship VARCHAR(255) NOT NULL",
      "address TEXT NOT NULL",
      "birthdate DATE NOT NULL",
      "contact VARCHAR(15) NOT NULL",
      "religion VARCHAR(255) NOT NULL",
      "emergency_name VARCHAR(255) NOT NULL",
      "emergency_relationship VARCHAR(255) NOT NULL",
      "emergency_contact VARCHAR(15) NOT NULL",
      "father_last_name VARCHAR(255) NOT NULL",
      "father_first_name VARCHAR(255) NOT NULL",
      "father_middle_name VARCHAR(255) DEFAULT ''",
      "father_contact VARCHAR(15) NOT NULL",
      "father_occupation VARCHAR(255) NOT NULL",
      "father_employee_type VARCHAR(255) NOT NULL",
      "father_education_attainment VARCHAR(255) NOT NULL",
      "mother_last_name VARCHAR(255) NOT NULL",
      "mother_first_name VARCHAR(255) NOT NULL",
      "mother_middle_name VARCHAR(255) DEFAULT ''",
      "mother_contact VARCHAR(15) NOT NULL",
      "mother_occupation VARCHAR(255) NOT NULL",
      "mother_employee_type VARCHAR(255) NOT NULL",
      "mother_education_attainment VARCHAR(255) NOT NULL",
      "parent_address TEXT NOT NULL",
      "parent_marital_status VARCHAR(255) NOT NULL",
      "doctoral VARCHAR(255) DEFAULT ''",
      "doctoral_graduated VARCHAR(255) DEFAULT ''",
      "doctoral_honors VARCHAR(255) DEFAULT ''",
      "doctoral_program VARCHAR(255) DEFAULT ''",
      "masteral VARCHAR(255) DEFAULT ''",
      "masteral_graduated VARCHAR(255) DEFAULT ''",
      "masteral_honors VARCHAR(255) DEFAULT ''",
      "masteral_program VARCHAR(255) DEFAULT ''",
      "college VARCHAR(255) DEFAULT ''",
      "college_graduated VARCHAR(255) DEFAULT ''",
      "college_honors VARCHAR(255) DEFAULT ''",
      "college_program VARCHAR(255) DEFAULT ''",
      "techvoc VARCHAR(255) DEFAULT ''",
      "techvoc_graduated VARCHAR(255) DEFAULT ''",
      "techvoc_honors VARCHAR(255) DEFAULT ''",
      "highschool VARCHAR(255) DEFAULT ''",
      "highschool_graduated VARCHAR(255) DEFAULT ''",
      "highschool_honors VARCHAR(255) DEFAULT ''",
      "als VARCHAR(255) DEFAULT ''",
      "als_graduated VARCHAR(255) DEFAULT ''",
      "als_honors VARCHAR(255) DEFAULT ''",
      "elementary VARCHAR(255) DEFAULT ''",
      "elementary_graduated VARCHAR(255) DEFAULT ''",
      "elementary_honors VARCHAR(255) DEFAULT ''",
      "support VARCHAR(255) NOT NULL",
      "number_of_siblings INT(2) NOT NULL",
      "siblings TEXT",
      "home_persons_living INT(3) NOT NULL",
      "home_children INT(3) NOT NULL",
      "homelife VARCHAR(50) NOT NULL",
      "workathome VARCHAR(3) NOT NULL",
      "work TEXT",
      "discipline_type TEXT NOT NULL",
      "discipline_handle TEXT NOT NULL",
      "sleep_time VARCHAR(255) NOT NULL",
      "have_friends VARCHAR(3) NOT NULL",
      "why_friend TEXT",
      "hobbies TEXT NOT NULL",
      "enjoy TEXT NOT NULL",
      "organization_out_of_school TEXT DEFAULT ''",
      "health_history TEXT NOT NULL",
      "health_exhibit_mannerisms TEXT DEFAULT ''",
      "health_past_operations TEXT DEFAULT ''",
      "health_allergies TEXT DEFAULT ''",
      "indigenous_group VARCHAR(3) NOT NULL",
      "indigenous_group_specify TEXT DEFAULT ''",
      "differently_abled VARCHAR(3) NOT NULL",
      "differently_abled_specify TEXT DEFAULT ''",
      "solo_parent VARCHAR(3) NOT NULL",
      "solo_parent_specify TEXT DEFAULT ''",
      "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
      "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
    ];
  }
}