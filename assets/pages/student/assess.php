<?php

use Smcc\Gcms\orm\models\AssessmentForm;
use Smcc\Gcms\orm\models\Schoolyear;
if ($user->role !== 'student') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/dashboard");
}
?>

<style>
  * {
    font-size: 16px;
  }
</style>
<?php
  $sy = $data['sy'];
  $assessmentforms = $data['assessmentforms'];
  $assessments = $data['assessments'];
  $u = $data['user'];
  $opened = $data['is_open'];
?>
<?php if (!$opened && (is_null($sy) || ($sy instanceof Schoolyear && $sy->isEditable()))): ?>
  <div class="tw-min-h-[calc(100vh-200px)] tw-flex tw-justify-center tw-items-center">
    <h2 class="tw-uppercase tw-italic tw-gray-200 tw-px-8 tw-py-4 tw-rounded-2xl tw-border tw-shadow tw-bg-gray-100">still closed</h2>
  </div>
<?php elseif (!$opened): ?>
  <div class="tw-min-h-[calc(100vh-200px)] tw-flex tw-justify-center tw-items-center">
    <div class="tw-italic tw-gray-200 tw-px-8 tw-py-4 tw-border tw-shadow tw-bg-gray-100 tw-text-xl">Submit and complete your <a href="<?= pathname("profile") ?>" class="tw-text-xl">Student Profile</a> to proceed to Self-Assessment Form</div>
  </div>
<?php elseif (!empty($assessments)): ?>
  <?= br() ?>
  <?= showBanner("Form Submitted", "", BannerStatus::INFO) ?>
  <?= br() ?>
  <div class="container justify-content-center box tw-bg-white">
    <div class="row text-center">
      <div class="col">
        <h4 class="mt-3 mb-3" style="font-weight:bolder;">SELF-ASSESSMENT QUESTIONNAIRE</h4>
      </div>
    </div>
    <div class="tw-text-justify">
      <p class="tw-text-sm">The purpose of this questionnaire is to get information about you for counseling. There is no
        right or wrong answer. Answer openly and honestly by indicating what you feel so that we can get
        accurate facts in order to help you.</p>
      <p><b>INSTRUCTION: </b>Mark your choices by checking the square which correspond to the statement/s you
        have chosen. you can check as many as you can.</p>
    </div>
    <div class="tw-mt-2 tw-flex tw-flex-wrap tw-justify-start tw-items-start tw-gap-2">
    <?php foreach($assessmentforms as $af): ?>
      <div class="tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600">
        <div class="tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200">
          <div class="tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase">
            <?= $af instanceof AssessmentForm ? $af->getCategoryName() : "" ?>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right">
          <?php foreach($af->getItems() as $item): ?>
            <div class="tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm tw-text-gray-600">
              <div class="tw-flex tw-flex-shrink tw-items-center tw-text-right tw-text-[40pt]">
                <?=
                  displayCheckbox(
                    array_reduce(
                      $assessments,
                      function($init, $val) use ($item) {
                        $r = array_reduce(
                          $val->getAssessmentResponse(),
                          function($res, $ar) use ($item) {
                            return $res || strval($ar['id']) === strval($item['id']) && $ar['response'] === true;
                          },
                          false
                        );
                        return $init || $r;
                      },
                      false
                    ),
                    "20pt"
                  )
                  ?>
              </div>
              <div class="tw-flex tw-flex-grow tw-items-start">
                <div class="tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px] tw-text-left">
                  <?= $item['item'] ?>
                </div>
              </div>
            </div>
          <?php endforeach ?>
        </div>
      </div>
    <?php endforeach ?>
    </div>
  </div>
<?php else: ?>
  <?= isset($_SESSION['error']) ? br() . showBanner("Error", $_SESSION['error']['msg'], BannerStatus::ERROR) . br() : "" ?>
  <?= isset($_SESSION['success']) ? br() .showBanner("Success", $_SESSION['error']['msg'], BannerStatus::INFO) . br() : "" ?>
  <div class="box tw-bg-white tw-w-full tw-p-8">
    <div class="tw-text-center">
      <h4 class="tw-my-3 tw-font-bold">SELF-ASSESSMENT QUESTIONNAIRE</h4>
    </div>
    <div class="tw-text-justify">
      <p class="tw-text-sm">The purpose of this questionnaire is to get information about you for counseling. There is no
        right or wrong answer. Answer openly and honestly by indicating what you feel so that we can get
        accurate facts in order to help you.</p>
      <p><b>INSTRUCTION: </b>Mark your choices by checking the square which correspond to the statement/s you
        have chosen. you can check as many as you can.</p>
    </div>
    <form method="post" action="<?= pathname("api/post/assessment/submit") ?>" enctype="multipart/form-data">
      <div class="tw-mt-2 tw-flex tw-flex-wrap tw-justify-start tw-items-start tw-gap-2">
        <input type="hidden" name="sy" value="<?= $sy->getId() ?>" />
        <input type="hidden" name="user" value="<?= $u->getId() ?>" />
        <?php foreach($assessmentforms as $af): ?>
        <input type="hidden" name="assessmentform[]" value="<?= strval($af->getId()) ?>" />
        <div class="tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600">
          <div class="tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200">
            <div class="tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase">
              <?= $af instanceof AssessmentForm ? $af->getCategoryName() : "" ?>
            </div>
          </div>
          <div class="tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right">
            <?php foreach($af->getItems() as $item): ?>
              <div class="tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm tw-text-gray-600">
                <div class="tw-flex tw-flex-shrink tw-items-center tw-text-right">
                  <input
                    type="checkbox"
                    id="<?= "category_" . strval($af->getId()) . "_" . strval($item['id']) ?>"
                    class="tw-border-0 tw-focus:tw-outline-none tw-cursor-pointer"
                    name="response[<?= strval($af->getId()) ?>][]"
                    value="<?= $item['id'] ?>"
                  />
                </div>
                <div class="tw-flex tw-flex-grow tw-items-center">
                  <label for="<?= "category_" . strval($af->getId()) . "_" . strval($item['id']) ?>" class="tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px] tw-cursor-pointer tw-text-left">
                    <?= $item['item'] ?>
                  </label>
                </div>
              </div>
            <?php endforeach ?>
          </div>
        </div>
        <?php endforeach ?>
      </div>
      <div class="tw-w-full tw-p-8 tw-flex tw-justify-end tw-gap-x-3">
        <button type="reset" class="btn btn-secondary">Clear All</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
<?php endif;

unset($_SESSION['success']);
?>
