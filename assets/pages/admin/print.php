<?php
function displayNotFound()
{
?>
  <div class="tw-p-4 tw-text-2xl tw-font-bold tw-bg-white tw-text-red-500">
    NOT FOUND!
  </div>
<?php
}

if (isset($_GET['form'])) {
  $formType = $_GET['form'];
  $printForms = getPrintForms();
  if (in_array($formType, $printForms)) {
    $data = getPrintDataFromFormData($formType, $_GET);
    extract($data);
    require_once import("assets/components/printables/{$formType}.php");
  } else {
    displayNotFound();
  }
} else {
  displayNotFound();
}