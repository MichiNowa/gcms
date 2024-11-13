<?php
if ($user->role !== 'admin') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/home");
}
?>
<?php if (is_null($data) || empty($data)): ?>
  <div class="tw-min-h-[calc(100vh-200px)] tw-flex tw-justify-center tw-items-center">
    <h2 class="tw-uppercase tw-italic tw-gray-200 tw-px-8 tw-py-4 tw-rounded-2xl tw-border tw-shadow tw-bg-gray-100">still closed</h2>
  </div>
<?php else: ?>
  <div id="page-root"></div>
<?php endif ?>