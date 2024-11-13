<?php
if (empty($data)): ?>
  <div>Not Found</div>
<?php else:
$createdAt = DateTime::createFromFormat('Y-m-d H:i:s', $called_slip->created_at);
?>
<div class="tw-font-calibri tw-h-[13in] tw-w-[8.5in] tw-p-[0.4in] print:tw-p-0 print:tw-h-[calc(13in-0.8in)] print:tw-max-h-[calc(13in-0.8in)] print:tw-w-[calc(8.5in-0.8in)] print:tw-max-w-[calc(8.5in-0.8in)] tw-mx-auto print:tw-mx-0 tw-my-4 print:tw-my-0 tw-shadow-lg print:tw-shadow-none tw-bg-white tw-border print:tw-border-none">
  <div class="tw-min-h-[calc(13in-0.8in-1.0in)] tw-px-[0.5in] ">
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
    <div class="tw-font-bold tw-w-full tw-text-center tw-text-lg">
      CALLED SLIP
    </div>
    <?= br() ?>
    <div class="tw-flex tw-justify-between">
      <div class="tw-font-bold">
        TO: <span class="tw-uppercase tw-font-normal tw-underline"><?= $user->getFirstName() . " " . ($user?->getMiddleInitial() ? $user->getMiddleInitial() . ". " : "") . ($user->getLastName()) . ($student_profile?->getSuffixName() ? " " . $student_profile?->getSuffixName() : "") ?></span>
      </div>
      <div class="tw-text-right tw-font-bold">
        DATE: <span class="tw-font-normal tw-underline"><?= $createdAt->format("F j, Y") ?></span>
      </div>
    </div>

    <div>
      Student ID: <span class="tw-font-normal tw-underline"><?= $user->getUsername() ?></span>
    </div>

    <div>
      Adviser/Dean: <span class="tw-font-normal tw-underline"><?= $education === "basic" ? $student->getAdviser() : $student?->getDean() ?></span>
    </div>

    <div>
      Grade Level & Section: <span class="tw-font-normal tw-underline"><?= $education === "basic" ? "Grade " . $student->getGradeLevel() . " - " . $student->getSection() : "" ?></span>
    </div>

    <div>
      Course & Year: <span class="tw-font-normal tw-underline"><?= $education === "college" ? $student->getCourse() . " - " . $student->getYearLevel() : "" ?></span>
    </div>

    <div>
      Department: <span class="tw-font-normal tw-underline"><?= $education === "college" ? $student->getDepartment() : "" ?></span>
    </div>

    <?= br() ?>
    <div><strong>FROM: </strong>GUIDANCE COUNSELOR/IN-CHARGE</div>
    <?= br() ?>
    <div class="tw-text-justify">

      <p>Good Day!</p>
      <?= br() ?>
      <p>The Guidance In-charge/Counselor would like to request your generous time for us to talk&nbsp;
        about some important matters. Your presence is highly needed to facilitate the said&nbsp;
        purpose. You are scheduled to see the Guidance. In-charge/Counselor on&nbsp;
        <em><?= $called_slip->getSchedule()->format("F j, Y") ?> (Date)</em> at <em><?= $called_slip->getSchedule()->format("h:i a") ?> (Time)</em>&nbsp;
        in the Guidance Center.</p>
    </div>
    <?= br() ?>
    <div>
      Rest assured all the information that transpired during the session will be treated with&nbsp;
      respect and circumscribed by the confidentiality statement.
    </div>
    <?= br() ?>
    <div>
      Thank you and More Power!
    </div>
    <?= br() ?>
    <div>
      Respectfully Yours,
    </div>
    <?= br() ?>
    <?= br() ?>
    <div class="tw-text-center tw-flex tw-justify-center tw-items-start tw-flex-col tw-max-w-[250px]">
      <div class="tw-border-b tw-border-black tw-w-full tw-uppercase">
        <?= $guidance->getFirstName() . " " . ($guidance?->getMiddleInitial() ? $guidance->getMiddleInitial() . ". " : "") . ($guidance->getLastName()) ?>
      </div>
      <div class="tw-w-full">
        Guidance In-charge/Counselor
      </div>
    </div>
  </div>

  <footer class="tw-flex-grow tw-min-h-[1.0in-0.1in]">
    <div class="tw-flex ">
      <div class="tw-w-[200px]">
        <img src="<?= pathname('images/formlabel2.png') ?>" alt="SMCC Logo">
      </div>
      <div class="tw-w-[600px]">
        <img src="<?= pathname('images/form-footer.png') ?>" alt="SMCC Logo">
      </div>
    </div>
  </footer>
</div>

<?php endif ?>