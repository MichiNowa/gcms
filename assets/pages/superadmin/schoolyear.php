<?php
if ($user->role !== 'superadmin') {
  redirect($user->role === 'admin'
    ? "/dashboard"
    : "/home");
}
?>
<div>
  <h1 class="tw-text-2xl tw-font-bold tw-py-4 tw-border-b-2 tw-border-gray-600">Manage School Year</h1>
  <div class="tw-min-h-[400px]">
    <div class="tw-flex tw-justify-end tw-p-4">
      <button type="button" id="open-school-year-btn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#school-year-modal">
        <i class="bx bx-plus"></i> Open New School Year
      </button>
    </div>
    <div class="table-responsive tw-px-4">
      <table class="table tw-table-auto">
        <thead>
          <tr>
            <th>School Year</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($data as $row): ?>
          <tr>
            <td>S.Y. <?= $row['year'] . " - " . ($row['year'] + 1);?></td>
            <td><?= date('M j, Y', strtotime($row['created_at'])); ?></td>
          </tr>
          <?php endforeach ?>
        </tbody>
      </table>
      <div class="tw-flex tw-justify-center tw-w-full tw-py-2">
        <?= count($data) === 0 ? "NO RECORDS" : "" ?>
      </div>
    </div>
  </div>
</div>

<?php
$maxSY = count($data) > 0 ? max(array_map(fn($d) => intval($d['year']), $data)) : date('Y') - 1;
echo getModalDisplay('school-year-modal', "Open School Year", function() use ($maxSY) {
?>
  <div class="tw-px-4 tw-pt-4 tw-pb-2">
    <span class="tw-text-black text-2xl">Are you sure to open new school year <br />
    <b>S.Y. <?= $maxSY + 1 ?> - <?= intval($maxSY) + 2 ?></b>?</span>
    <div class="tw-mt-2 tw-flex tw-justify-end tw-gap-x-2">
      <button type="button" class="tw-px-3 tw-py-2 tw-rounded tw-bg-green-600 tw-text-white hover:tw-bg-green-500 tw-min-w-16 disabled:tw-bg-gray-300" id="school-year-submit" data-sy="<?= $maxSY + 1 ?>" <?= $maxSY == date('Y') ? "disabled" : "" ?>>Yes</button>
      <button type="button" class="tw-px-3 tw-py-2 tw-rounded tw-bg-red-600 tw-text-white  hover:tw-bg-red-500 tw-min-w-16" data-bs-dismiss="modal">No</button>
    </div>
  </div>
<?php
});