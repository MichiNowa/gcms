<?php
if (empty($data)): ?>
  <div>Not Found</div>
<?php else:
  $ratings = $feedback?->getRatings();
  $comments = $feedback?->getComments();

  function intToLetter($num)
  {
    if ($num < 0) {
      return '';
    }
    return chr(65 + ($num % 26));
  }

  $satisfactories = [
    "Very Satisfied",
    "Somewhat Satisfied",
    "Somewhat Dissatisfied",
    "Strongly Dissatisfied",
  ];

  $totalRatings = count($ratings ?? []);
  $currentCount = 0;

?>
  <div class="tw-font-calibri tw-text-[15px] tw-min-h-[13in] tw-w-[8.5in] tw-p-[0.4in] print:tw-p-0 print:tw-h-[calc(13in-0.8in)] print:tw-max-h-[calc(13in-0.8in)] print:tw-w-[calc(8.5in-0.8in)] print:tw-max-w-[calc(8.5in-0.8in)] tw-mx-auto print:tw-mx-0 tw-my-4 print:tw-my-0 tw-shadow-lg print:tw-shadow-none tw-bg-white tw-border print:tw-border-none">
    <div class="tw-min-h-[calc(13in-0.8in-1.0in)] tw-leading-[1.3]">
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
      <hr>
      <?= br() ?>

      <div class="tw-font-bold tw-w-full tw-text-center tw-text-[15px]">
        CLIENT'S COUNSELING FEEDBACK
      </div>
      <?= br() ?>


      <div class="tw-text-justify tw-mb-2">
        This form allows you an oppurnity to provide feedback to your counselor after your session/s
        have finished. This will help your counselor's professional development as well as helping to
        improve the service offered to others. <strong>YOU DO NOT need to identify yourself</strong>. Please place a mark
        in the box which mostly closely corresponds how you feel about each statement
      </div>

      <div class="tw-my-2">
        <div class="tw-font-bold">Rating Scale:</div>
        <div>1 - Strong Disagree</div>
        <div>2 - Somewhat Disagree</div>
        <div>3 - Somewhat Agree</div>
        <div>4 - Strongly Agree</div>
      </div>

      <table class="tw-mt-2 tw-border-2 tw-border-black tw-p-1 p-[7px] tw-font-[4px]">
        <?php foreach ($ratings as $ci => $category): ?>
          <tr>
            <th class="tw-border-black tw-p-1"><?= intToLetter($ci) ?>. <?= $category['category_name'] ?></th>
            <th class="tw-border-2 tw-border-black tw-p-1">Rating</th>
          </tr>
          <?php foreach ($category['items'] as $i => $rating): ?>
            <tr>
              <?php if ($rating['type'] === "number"): ?>
                <td class="tw-border-2 tw-border-black tw-p-1">
                  <?= (++$currentCount) + intval($ci) ?>. <?= $rating['item'] ?>
                </td>
                <td class="tw-text-center tw-border-2 tw-border-black tw-p-1">
                  <?= $rating['rating'] ?>
                </td>
              <?php elseif ($rating['type'] === "string"): ?>
                <td colspan="2" class="tw-border-2 tw-border-black tw-p-1">
                  <?= (++$currentCount) + intval($ci) ?>. <?= $rating['item'] ?>
                  <div>
                    <div class="tw-flex tw-justify-start">
                      <?php foreach ($satisfactories as $si => $sat): ?>
                        <div class=" tw-flex tw-justify-start tw-items-center tw-gap-x-2">
                          <div class="tw-text-[14pt] tw-flex-shrink">
                            <?= displayCheckbox(intval($rating['rating']) === (count($satisfactories) - $si)) ?>
                          </div>
                          <div class="tw-mr-3"><?= $sat ?></div>
                        </div>
                      <?php endforeach ?>
                    </div>
                  </div>
                </td>
              <?php else: ?>
                <td colspan="2" class="tw-border-2 tw-border-black tw-p-1">
                  <div class="tw-flex tw-justify-start tw-items-center tw-gap-x-2">
                    <div>
                      <?= (++$currentCount) + intval($ci) ?>. <?= $rating['item'] ?>
                    </div>
                    <div class="tw-text-[14pt] tw-flex-shrink">
                      <?= displayCheckbox(boolval($rating['rating']) === true) ?>
                    </div>
                    <div>
                      Yes
                    </div>
                    <div class="tw-text-[14pt] tw-flex-shrink">
                      <?= displayCheckbox(boolval($rating['rating']) === false) ?>
                    </div>
                    <div>
                      No
                    </div>
                  </div>
                </td>
              <?php endif ?>
            </tr>
          <?php endforeach ?>
        <?php endforeach ?>
        <tr>
          <th colspan="2" class="tw-border-2 tw-border-black tw-p-1">
            <?= intToLetter($totalRatings) ?>. Other Comments
          </th>
        </tr>
        <tr>
          <td colspan="2">
            <div class="tw-p-8">
              <p class="tw-text-justify tw-mb-4">
                Please use the space below for any other s you would like to bring to your counselor's attention.&nbsp;
                (If there are any matter which you specifically would not have wanted to discuss with your counselor in person your counselor would be especially glad to know of these).&nbsp;
                If you include your name in this section, it will be treated as <strong>CONFIDENTIAL</strong>.
                If you need more space, please continue on the back or add another paper.
              </p>
              <p class="tw-text-justify tw-text-wrap first-letter:tw-uppercase tw-indent-8">
                <?= str_replace("\n", "<br />", $comments); ?>
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <footer class="tw-flex-grow tw-min-h-[1.0in-0.1in]">
      <div class="tw-flex ">
        <div class="tw-w-[200px]">
          <img src="<?= pathname('images/formlabel2.png') ?>" alt="SMCC Logo">
          </p>
          <div class="tw-w-[600px]">
            <img src="<?= pathname('images/form-footer.png') ?>" alt="SMCC Logo">
          </div>
        </div>
    </footer>
  </div>

<?php endif ?>