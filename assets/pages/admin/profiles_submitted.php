<?php
if ($user->role !== 'admin') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/home");
}
?>
<div id="page-root"></div>

<?= getModalDisplay(
  'view-student-summary-modal',
  "View Summary",
  function () {
    ?>
  <div class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4">
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border"
            id="view-photo" />
          <div class="">
            <div class="tw-font-bold" id="view-full-name"></div>
            <div class="tw-text-sm" id="view-department-gradelevel"></div>
            <div class="tw-text-sm" id="view-year-course"></div>
          </div>
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-4 tw-border-collapse">
        <div class="tw-bg-[plum] tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2">
          Counseling Forms</div>
        <div class="tw-bg-[plum] tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2">
          Count/Status</div>
        <div class="tw-bg-white tw-border-y tw-border-black tw-text-left tw-px-4 tw-py-2 tw-col-span-2">Student Profile
        </div>
        <div
          class="tw-bg-white tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2 tw-capitalize"
          id="view-student-profile"></div>
        <div class="tw-bg-white tw-border-y tw-border-black tw-text-left tw-px-4 tw-py-2 tw-col-span-2">Case Notes</div>
        <div class="tw-bg-white tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2"
          id="view-case-notes"></div>
        <div class="tw-bg-[#f9f6fd] tw-border-y tw-border-black tw-text-left tw-px-4 tw-py-2 tw-col-span-2">Called Slip
        </div>
        <div class="tw-bg-[#f9f6fd] tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2"
          id="view-called-slip"></div>
        <div class="tw-bg-white tw-border-y tw-border-black tw-text-left tw-px-4 tw-py-2 tw-col-span-2">Self - Assessment
        </div>
        <div
          class="tw-bg-white tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2 tw-capitalize"
          id="view-self-assessment"></div>
        <div class="tw-bg-white tw-border-y tw-border-black tw-text-left tw-px-4 tw-py-2 tw-col-span-2">Agreement Forms
        </div>
        <div class="tw-bg-white tw-border-y tw-border-black tw-text-center tw-font-bold tw-px-4 tw-py-2 tw-col-span-2"
          id="view-agreement-forms"></div>
      </div>
    </div>
    <div class="container tw-container">
      <div class="tw-mt-4 tw-float-start">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="view-close-btn">Close</button>
      </div>
      <div class="tw-mt-4 tw-float-end">
        <button type="button" class="btn btn-primary" id="view-records">Print Records</button>
      </div>
    </div>
  </div>
  <?php
  }
) ?>

<?= getModalDisplay(
  'view-student-profile-submission',
  "View Profile Submitted",
  function () {
    ?>
  <div class="tw-p-3">
    <div class="tw-relative tw-border">
      <div class="tw-absolute tw-left-2 tw-top-2 tw-shadow tw-bg-white">
        <img src="" alt="" class="tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="profile_pic" />
      </div>
      <div class="tw-mx-auto" id="iframe-container">
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-between">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="view-profile-close-btn">Close</button>
      <div id="view-profile-status" class="tw-px-2 tw-py-1 tw-italic"></div>
      <div id="view-profile-button-container" class="tw-flex tw-gap-x-2"></div>
    </div>
  </div>
  <?php
  }
) ?>



<?= getModalDisplay(
  'view-assessment-submission',
  "View Submitted Self-Assessment",
  function () {
    ?>
  <div class="tw-p-3 tw-w-full tw-block">
    <div id="assessment-submission-root" class="tw-block tw-w-full tw-relative"></div>
  </div>
  <?php
  }
) ?>