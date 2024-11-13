<?php
$state = $banner_state->value;
$CONTAINER_COLORS = [
  "tw-bg-teal-100 tw-border-teal-500 tw-text-teal-900",
  "tw-bg-orange-100 tw-border-orange-500 tw-text-orange-900",
  "tw-bg-red-100 tw-border-red-500 tw-text-red-900",
];
$ICON_COLORS = [
  "tw-text-teal-500",
  "tw-text-orange-500",
  "tw-text-red-500",
];
?>
<div class="tw-border-t-4 tw-rounded-b  tw-px-4 tw-py-3 tw-shadow-md <?= $CONTAINER_COLORS[ $state] ?>" role="alert">
  <div class="tw-flex">
    <div class="tw-py-1"><svg class="tw-fill-current tw-h-6 tw-w-6 tw-mr-4 <?= $ICON_COLORS[$state] ?>" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="tw-font-bold"><?= $banner_title ?></p>
      <p class="tw-text-sm"><?= $banner_message ?></p>
    </div>
  </div>
</div>