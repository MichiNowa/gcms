<?php

use Smcc\Gcms\orm\models\BasicStatus;
use Smcc\Gcms\orm\models\CollegeStatus;
use Smcc\Gcms\orm\models\StudentBasic;
use Smcc\Gcms\orm\models\StudentCollege;
use Smcc\Gcms\orm\models\Users;

if (empty($data)): ?>
  <div>Not Found</div>
<?php else:

  $userData = ($student['user'] instanceof Users) ? $student['user'] : null;
  $studentData = $education === "basic" || $education === "college" ? $student['student'] : null;
  $studentStatus = $education === "basic" || $education === "college" ? $student['profile_status'] : null;
  $studentProfile = $education === "basic" || $education === "college" ? $student['student_profile'] : null;

  $caseNoteInteractionTypes = [
    "Individual",
    "Group",
    "Called-in",
    "Walked-in",
    "Reffered",
    "Follow-up",
  ];

  function getNominal(int|string $n)
  {
    if (is_nan(intval($n))) return $n;
    return str_ends_with(strval($n), "1")
      ? "{$n}st"
      : (str_ends_with(strval($n), "2")
        ? "{$n}nd"
        : (str_ends_with(strval($n), "3")
          ? "{$n}rd"
          : "{$n}th"));
  }

?>
  <div class="tw-font-['Times New Roman'] tw-h-[13in] tw-w-[8.5in] tw-p-[0.4in] print:tw-p-0 print:tw-h-[calc(13in-0.8in)] print:tw-max-h-[calc(13in-0.8in)] print:tw-w-[calc(8.5in-0.8in)] print:tw-max-w-[calc(8.5in-0.8in)] tw-mx-auto print:tw-mx-0 tw-my-4 print:tw-my-0 tw-shadow-lg print:tw-shadow-none tw-bg-white tw-border print:tw-border-none">
    <div class="tw-min-h-[calc(13in-0.8in-1.0in)]">
      <table class="tw-mx-auto">
        <tbody>
          <tr>
            <td class="tw-w-[90px]">
              <img src="<?= pathname('images/smcc.gif') ?>" alt="SMCC Logo">
            </td>
            <td class="tw-p-4 tw-text-center">
              <div class="tw-text-[23px] tw-font-bold">Saint Michael College of Caraga</div>
              <div>Brgy.4, Nasipit, Agusandel Norte, Philippines</div>
              <div>Tel. Nos. +63 085343-3251 / +63085283-3113</div>
              <div> No.+63 085808-0892</div>
              <div>www.smccnasipit.edu.ph</div>
            </td>
            <td class="tw-w-[110px]">
              <img src="<?= pathname('images/1.jpg') ?>" alt="SMCC Logo">
            </td>
          </tr>
        </tbody>
      </table>
      <?= br() ?>
      <?= br() ?>
      <div class="tw-font-bold tw-w-full tw-text-center">
        CASE NOTES
      </div>
      <?= br() ?>
      <?= br() ?>

      <div>
        <div>
          Student ID:&nbsp;<span class="tw-underline"><?= $userData?->getUsername() ?></span>
        </div>
        <?= br() ?>
        <div>
          Student Name:&nbsp;<span class="tw-underline tw-capitalize"><?= strtolower($userData?->getFirstName() ?? "") ?> <?= ($studentStatus instanceof BasicStatus || $studentStatus instanceof CollegeStatus) && $studentStatus?->getStatus() === "completed" ? strtolower($studentProfile->getMiddleName()) . " " : strtolower($userData?->getMiddleInitial() ?? "") . ". " ?><?= strtolower($userData?->getLastName() ?? "") ?> <?= ($studentStatus instanceof BasicStatus || $studentStatus instanceof CollegeStatus) && $studentStatus?->getStatus() === "completed" ? strtolower($studentProfile->getSuffixName()) : "" ?></span>
        </div>
        <div class="tw-mr-4">
          Grade/Yr.Level:&nbsp;<span class="tw-underline"><?= ($studentStatus instanceof BasicStatus || $studentStatus instanceof CollegeStatus) && $studentStatus->getStatus() === "completed" ? ($studentData instanceof StudentBasic ? "Grade " . $studentData->getGradeLevel() : ($studentData instanceof StudentCollege ? getNominal($studentData->getYearLevel()) . " Year" : "")) : "" ?></span>
        </div>
        <div class="tw-mr-4">
          Section/Course:&nbsp;<span class="tw-underline"><?= ($studentStatus instanceof BasicStatus || $studentStatus instanceof CollegeStatus) && $studentStatus->getStatus() === "completed" ? ($studentData instanceof StudentBasic ? $studentData->getSection() : ($studentData instanceof StudentCollege ? $studentData->getCourse() : "")) : "" ?></span>
        </div>
        <div class="tw-mr-4">
          Academic Year: A.Y.&nbsp;<span class="tw-underline"><?= $school_year ?></span>
        </div>
        <?= br() ?>
        <div class="">
          Date:&nbsp;<span class="tw-underline"><?= $case_note?->getCreatedAt()->format("F j, Y") ?></span>
        </div>
      </div>
      <?= br(); ?>
      <div>

        <div class="tw-flex tw-justify-start tw-items-center tw-gap-x-2">
          <?php foreach ($caseNoteInteractionTypes as $n => $it): ?>
            <div class="tw-text-[14pt] tw-flex-shrink">
              <?= displayCheckbox($case_note?->getInteractionType() === $it) ?>
            </div>
            <div class="tw-mr-3"><?= $it ?></div>
          <?php endforeach ?>
        </div>

        <?= br(); ?>
        <?= br(); ?>

        <div class="">
          <div class="tw-font-bold">
            Details of the Problem:
          </div>
          <div class="tw-text-justify">
            <?= $case_note?->getDetails() ?>
          </div>
        </div>
        <?= br(); ?>
        <div class="">
          <div class="tw-font-bold">
            Information given by the Guidance Counselor:
          </div>
          <div class="tw-text-justify">
            <?= $case_note?->getInformationByCounselor() ?>
          </div>
        </div>
        <?= br(); ?>
        <div class="">
          <div class="tw-font-bold">
            Client's decision/future plan
          </div>
          <div class="tw-text-justify">
            <?= $case_note?->getClientDecision() ?>
          </div>
        </div>
        <?= br(); ?>
        <div class="">
          <div class="tw-font-bold">
            Behavorial Observaation (if there's any)
          </div>
          <div class="tw-text-justify">
            <?= $case_note?->getBehavioralObservation() ?>
          </div>
        </div>
        <?= br(); ?>
        <?= br(); ?>
        <div>
          <div class="tw-flex tw-flex-col tw-text-center tw-max-w-fit">
            <div class="tw-border-b tw-border-b-black tw-capitalize">
              <?= $guidance?->getFirstName() ?? "" ?> <?= $guidance?->getMiddleInitial() ? $guidance?->getMiddleInitial() . ". " : "" ?><?= $guidance?->getLastName() ?? "" ?>
            </div>
            <div class="tw-text-sm">
              Guidance Counselor/In-charge
            </div>
          </div>
          <?= br(); ?>
          <div class="">
            Date:&nbsp;<span class="tw-underline"><?= $case_note?->getCreatedAt()->format("F j, Y") ?></span>
          </div>
        </div>
        <?= br(); ?>
        <?= br(); ?>
      </div>

      <footer class="tw-flex-grow tw-min-h-[1.0in-0.1in]">
        <div class="tw-flex">
          <div class="tw-w-[200px]">
            <img src="<?= pathname('images/formlabel2.png') ?>" alt="SMCC Logo">
          </div>
          <div class="tw-w-[600px]">
            <img src="<?= pathname('images/form-footer.png') ?>" alt="SMCC Logo">
          </div>
        </div>
      </footer>
    </div>
  </div>
<?php endif ?>