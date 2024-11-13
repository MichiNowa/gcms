<?php

use Smcc\Gcms\orm\models\Assessment;
use Smcc\Gcms\orm\models\AssessmentForm;

if (empty($data)): ?>
  <div>Not Found</div>
<?php else:
$forms = array_map(fn($ma) => $ma['form'], $myAssessments);
$rpsA = array_map(fn($ma) => $ma['response'], $myAssessments);
$categories = array_map(fn(AssessmentForm $f) => $f->getCategoryName(), $forms);
$rps = array_map(function(AssessmentForm $f) use ($rpsA) {
  $end = array_filter(
    $rpsA,
    function(Assessment|false $ra) use ($f): bool {
      return !$ra ? false : strval($ra->getAssessmentFormId()) === strval($f->getid());
    }
  );
  return end($end);
}, $forms);

?>

<div class="tw-font-calibri tw-text-[12pt] tw-h-[13in] tw-w-[8.5in] tw-p-[0.4in] print:tw-p-0 print:tw-h-[calc(13in-0.8in)] print:tw-max-h-[calc(13in-0.8in)] print:tw-w-[calc(8.5in-0.8in)] print:tw-max-w-[calc(8.5in-0.8in)] tw-mx-auto print:tw-mx-0 tw-my-4 print:tw-my-0 tw-shadow-lg print:tw-shadow-none tw-bg-white tw-border print:tw-border-none">
  <div class="tw-min-h-[calc(13in-0.8in-1.0in)] tw-leading-[1.0]">
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
    <div class="tw-font-bold tw-w-full tw-text-center tw-text-[14pt]">
      STUDENT ASSESSMENT
    </div>

    <div class="tw-mt-[15px] tw-text-justify">
      The purpose of this questionnaire is to get information about you for counseling. There is no right or wrong answer. Answer openly and honestly by indicating what you feel so that we can get accurate facts in order to help you.
    </div>
    <div class="tw-font-bold tw-mt-[15px] tw-text-justify tw-mb-2">
      INSTRUCTION
    </div>
    <div>
      Mark your choices by checking the square which correspond to the statement/s you have chosen. you can check as many as you can:
    </div>
    <?= br() ?>
    <div class="tw-grid tw-grid-cols-2 tw-gap-2">
    <?php
    for ($i = 0; $i < count($categories); $i++):
    ?>
      <div>
        <div class="tw-font-bold">
          <?= $categories[$i] ?>
        </div>
        <?php
        foreach ($rps[$i]?->getAssessmentResponse() as $item):
          $items = $forms[$i]->getItems();
          $itemCategory = array_filter($items, fn($it) => strval($it['id']) === strval($item['id']));
          $itemCategory = end($itemCategory);
        ?>
          <div class="tw-flex tw-justify-start tw-items-start tw-gap-x-2">
            <div class="tw-text-[14pt] tw-flex-shrink">
              <?= displayCheckbox($item['response']) ?>
            </div>
            <div><?= $itemCategory['item'] ?></div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endfor; ?>
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

<?php endif; ?>