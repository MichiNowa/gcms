<?php

if (is_current_path('/api/get/pagedata')) {
  if (isset($_SESSION['page_data'])) {
    $pdata = $_SESSION['page_data'];
    unset($_SESSION['page_data']);
    responseJSON(['data' => $pdata]);
  } else {
    responseJSON(['data' => "{}"]);
  }
}

if (is_current_path('/api/get/student/check')) {
  $studentid = getSearchParam('student_id');
  responseJSON(['data' => isUsernameRegistered($studentid)]);
}