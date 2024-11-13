<?php
if ($user->role !== 'admin') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/home");
}
?>
<div id="page-root"></div>

<?= getModalDisplay(
  'create-case-note-modal',
  "Create Case Note",
  function() {
?>
  <form id="form-create-case-note" method="post" class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4">
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="create-photo" />
          <div>
            <div class="tw-font-bold">Student ID:&nbsp;<span id="create-student-id"></span></div>
            <div class="tw-font-bold" id="create-full-name"></div>
            <div class="tw-text-sm" id="create-department-level"></div>
            <div class="tw-text-sm" id="create-year-grade-level"></div>
            <div class="tw-text-sm" id="create-course-section"></div>
          </div>
        </div>
      </div>
      <div class="tw-p-4">
        <div class="tw-my-4 tw-flex tw-justify-between">
          <div class="tw-flex-shrink"><span class="tw-font-bold">Date:</span>&nbsp;<?= date("M d, Y") ?></div>
          <div><span class="tw-font-bold">Guidance Counselor/In-charge:</span>&nbsp;<span id="create-guidance-name"></span></div>
        </div>
        <div class="tw-my-4 tw-bg-gray-50 tw-p-2 tw-rounded tw-flex tw-flex-wrap tw-gap-y-4 tw-gap-x-8 tw-justify-center">
          <?php foreach(getInteractionTypes() as $n => $it): ?>
            <div class="form-check">
              <input class="form-check-input tw-cursor-pointer" type="radio" group="interaction_type" name="interaction_type" id="it-<?= $n ?>" value="<?= $it ?>">
              <label class="form-check-label tw-cursor-pointer" for="it-<?= $n?>"><?= $it ?></label>
            </div>
          <?php endforeach ?>
        </div>
        <div>
          <div class="tw-font-bold tw-ml-4">Details Of the Problem:</div>
          <div>
            <textarea name="details" rows="4" class="form-control" required></textarea>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Information given by the Guidance Counselor:</div>
          <div>
            <textarea name="information_by_counselor" rows="4" class="form-control" required></textarea>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Client's decision/future plans:</div>
          <div>
            <textarea name="client_decision" rows="4" class="form-control" required></textarea>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Behavorial Observation (if there's any):</div>
          <div>
            <textarea name="behavioral_observation" rows="4" class="form-control"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-end tw-gap-x-4">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="create-close-btn">Cancel</button>
    <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
<?php
  }
) ?>


<?= getModalDisplay(
  'create-agreement-form-modal',
  "Counseling Agreement Form",
  function() {
?>
  <form id="form-create-agreement-form" method="post" class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4">
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="create-photo" />
          <div>
            <div class="tw-font-bold">Student ID:&nbsp;<span id="create-student-id"></span></div>
            <div class="tw-font-bold" id="create-full-name"></div>
            <div class="tw-text-sm" id="create-department-level"></div>
            <div class="tw-text-sm" id="create-year-grade-level"></div>
            <div class="tw-text-sm" id="create-course-section"></div>
          </div>
        </div>
      </div>
      <div class="tw-p-4">
        <div class="tw-my-4 tw-flex tw-justify-between">
          <div class="tw-flex-shrink"><span class="tw-font-bold">Date:</span>&nbsp;<?= date("M d, Y") ?></div>
          <div><span class="tw-font-bold">Guidance Counselor/In-charge:</span>&nbsp;<span class="create-guidance-name"></span></div>
        </div>
        <p class="tw-p-2 tw-text-justify">
          This is mutual agreement negotiated between the Counselor and the Student pior to the commencement of counseling with SMCC Guidance Center. It outlines the responsibilities of the counselor towards the Student, and also the Student's responsibilities in the counseling relationship.
        </p>
        <p class="tw-p-2">
          The agreement is made between <span class="create-guidance-name tw-underline"></span>, Counselor and <span id="create-full-name-2" class="tw-underline tw-capitalize"></span>, Student/s.
        </p>
        <div class="tw-p-2">
          Dated: <?= date("M d, Y") ?>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Upload one (1) photo of the agreement form:</div>
          <div id="agreement-upload-photo-root"></div>
        </div>
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-end tw-gap-x-4">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="create-close-btn">Cancel</button>
      <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
<?php
  }
) ?>



<?= getModalDisplay(
  'create-referral-form-modal',
  "Documentation",
  function() {
?>
  <form id="form-create-referral-form" method="post" class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4">
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="create-photo" />
          <div>
            <div class="tw-font-bold">Student ID:&nbsp;<span id="create-student-id"></span></div>
            <div class="tw-font-bold" id="create-full-name"></div>
            <div class="tw-text-sm" id="create-department-level"></div>
            <div class="tw-text-sm" id="create-year-grade-level"></div>
            <div class="tw-text-sm" id="create-course-section"></div>
          </div>
        </div>
      </div>
      <div class="tw-p-4">
        <div class="tw-my-4 tw-flex tw-justify-between">
          <div class="tw-flex-shrink"><span class="tw-font-bold">Date:</span>&nbsp;<?= date("M d, Y") ?></div>
          <div><span class="tw-font-bold">Guidance Counselor/In-charge:</span>&nbsp;<span id="create-guidance-name"></span></div>
        </div>
        <p class="tw-p-2 tw-text-justify">
          This serve as a documentation of the counseling session.
        </p>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Upload two (2) photos:</div>
          <div id="referral-upload-photo-root"></div>
        </div>
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-end tw-gap-x-4">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="create-close-btn">Cancel</button>
      <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
<?php
  }
) ?>



<?= getModalDisplay(
  'view-agreement-form-modal',
  "Counseling Agreement Form",
  function() {
?>
  <div class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4">
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="view-photo" />
          <div>
            <div class="tw-font-bold">Student ID:&nbsp;<span id="view-student-id"></span></div>
            <div class="tw-font-bold" id="view-full-name"></div>
            <div class="tw-text-sm" id="view-department-level"></div>
            <div class="tw-text-sm" id="view-year-grade-level"></div>
            <div class="tw-text-sm" id="view-course-section"></div>
          </div>
        </div>
      </div>
      <div class="tw-p-4">
        <div class="tw-my-4 tw-flex tw-justify-between">
          <div class="tw-flex-shrink"><span class="tw-font-bold">Date:</span>&nbsp;<span class="view-date"></span></div>
          <div><span class="tw-font-bold">Guidance Counselor/In-charge:</span>&nbsp;<span class="view-guidance-name"></span></div>
        </div>
        <p class="tw-p-2 tw-text-justify">
          This is mutual agreement negotiated between the Counselor and the Student pior to the commencement of counseling with SMCC Guidance Center. It outlines the responsibilities of the counselor towards the Student, and also the Student's responsibilities in the counseling relationship.
        </p>
        <p class="tw-p-2">
          The agreement is made between <span class="view-guidance-name tw-underline"></span>, Counselor and <span id="view-full-name-2" class="tw-underline tw-capitalize"></span>, Student/s.
        </p>
        <div class="tw-p-2">
          Dated:&nbsp;<span class="view-date"></span>
        </div>
        <div class="tw-my-4 tw-w-full">
          <div class="tw-mx-auto">
            <img src="" alt="Agreement Form" id="agreement-photo" width="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-end tw-gap-x-4">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="create-close-btn">Close</button>
    </div>
  </div>
<?php
  }
) ?>


<?= getModalDisplay(
  'view-case-note-modal',
  "Case Note",
  function() {
?>
  <div class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4 tw-relative">
          <div class="tw-absolute tw-right-1 tw-top-1">
            <button type="button" class="btn btn-light" id="view-case-note-print"><i class="bx bxs-printer"></i>&nbsp;Print</button>
          </div>
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="view-photo" />
          <div>
            <div class="tw-font-bold">Student ID:&nbsp;<span id="view-student-id"></span></div>
            <div class="tw-font-bold" id="view-full-name"></div>
            <div class="tw-text-sm" id="view-department-level"></div>
            <div class="tw-text-sm" id="view-year-grade-level"></div>
            <div class="tw-text-sm" id="view-course-section"></div>
          </div>
        </div>
      </div>
      <div class="tw-p-4">
        <div class="tw-my-4 tw-flex tw-justify-between">
          <div class="tw-flex-shrink"><span class="tw-font-bold">Date:</span>&nbsp;<span id="view-date"></span></div>
          <div><span class="tw-font-bold">Guidance Counselor/In-charge:</span>&nbsp;<span id="view-guidance-name"></span></div>
        </div>
        <div class="tw-flex tw-justify-start tw-gap-x-2 tw-my-2">
          <div class="tw-font-bold">Interaction/Service Type:</div>
          <div id="view-interaction-type" class="tw-border-b tw-border-black tw-max-w-[100px]"></div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Details Of the Problem:</div>
          <div class="tw-border tw-border-black tw-rounded-xl tw-p-3 tw-min-h-[100px] tw-bg-white">
            <p class="tw-text-justify" id="view-details"></p>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Information given by the Guidance Counselor:</div>
          <div class="tw-border tw-border-black tw-rounded-xl tw-p-3 tw-min-h-[100px] tw-bg-white">
            <p class="tw-text-justify" id="view-information"></p>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Client's decision/future plans:</div>
          <div class="tw-border tw-border-black tw-rounded-xl tw-p-3 tw-min-h-[100px] tw-bg-white">
            <p class="tw-text-justify" id="view-decision"></p>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Behavorial Observation (if there's any):</div>
          <div class="tw-border tw-border-black tw-rounded-xl tw-p-3 tw-min-h-[100px] tw-bg-white">
            <p class="tw-text-justify" id="view-observation"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-end tw-gap-x-4">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="view-close-btn">Close</button>
    </div>
  </div>
<?php
  }
) ?>

<?= getModalDisplay(
  'create-case-note-walkin-modal',
  "Create Walked-in Case Note",
  function() {
?>
  <form id="form-create-case-note" method="post" class="tw-p-3">
    <div class="tw-shadow tw-rounded tw-border">
      <div class="tw-min-h-[150px] tw-p-2">
        <div class="tw-flex tw-flex-start tw-items-center tw-gap-4">
          <img src="" alt="" class="tw-rounded-2xl tw-w-[120px] tw-h-[120px] tw-object-contain tw-border" id="create-photo" />
          <div>
            <div class="tw-font-bold">Student ID:&nbsp;<span id="create-student-id"></span></div>
            <div class="tw-font-bold" id="create-full-name"></div>
            <div class="tw-text-sm" id="create-department-level"></div>
            <div class="tw-text-sm" id="create-year-grade-level"></div>
            <div class="tw-text-sm" id="create-course-section"></div>
          </div>
        </div>
      </div>
      <div class="tw-p-4">
        <div class="tw-my-4 tw-flex tw-justify-between">
          <div class="tw-flex-shrink"><span class="tw-font-bold">Date:</span>&nbsp;<?= date("M d, Y") ?></div>
          <div><span class="tw-font-bold">Guidance Counselor/In-charge:</span>&nbsp;<span id="create-guidance-name"></span></div>
        </div>
        <div class="tw-my-4 tw-bg-gray-50 tw-p-2 tw-rounded tw-flex tw-flex-wrap tw-gap-y-4 tw-gap-x-8 tw-justify-center">
          <?php foreach(getInteractionTypes() as $n => $it): ?>
            <div class="form-check">
              <input class="form-check-input tw-cursor-pointer" type="radio" group="interaction_type" name="interaction_type" id="it-<?= $n ?>" value="<?= $it ?>" <?= $it !== "Walked-in" ? "disabled" : "checked" ?>>
              <label class="form-check-label tw-cursor-pointer" for="it-<?= $n?>"><?= $it ?></label>
            </div>
          <?php endforeach ?>
        </div>
        <div>
          <div class="tw-font-bold tw-ml-4">Details Of the Problem:</div>
          <div>
            <textarea name="details" rows="4" class="form-control" required></textarea>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Information given by the Guidance Counselor:</div>
          <div>
            <textarea name="information_by_counselor" rows="4" class="form-control" required></textarea>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Client's decision/future plans:</div>
          <div>
            <textarea name="client_decision" rows="4" class="form-control" required></textarea>
          </div>
        </div>
        <div class="tw-my-4">
          <div class="tw-font-bold tw-ml-4">Behavorial Observation (if there's any):</div>
          <div>
            <textarea name="behavioral_observation" rows="4" class="form-control"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-mt-4 tw-flex tw-justify-end tw-gap-x-4">
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="create-close-btn">Cancel</button>
    <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
<?php
  }
) ?>

<?= getModalDisplay(
  'view-assessment-submission',
  "View Submitted Self-Assessment",
  function() {
?>
  <div class="tw-p-3 tw-w-full tw-block">
    <div id="assessment-submission-root" class="tw-block tw-w-full tw-relative"></div>
  </div>
<?php
  }
) ?>