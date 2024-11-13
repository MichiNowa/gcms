<?php

if (!isset($_SESSION['userdata']) || !getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole() !== 'student') {
  responseJSON(['error'=>'Invalid Access'], 403);
}

// POST
if (is_current_path('/api/post/studentprofile')) {
  $response = createStudentProfile($_POST);
  if ($response['status']) {
    $_SESSION['newprofile'] = true;
    try {
      $syear = $response['sy'] . " - " . (intval($response['sy']) + 1);
      $thisSite = fullurlpath('/');
      $result = sendNotification([
        'student_id' => $response['id'],
        'syid' => $response['syid'],
        "title" => "Student Profile for S.Y. $syear submitted",
        "message" => "You have submitted student profile for S.Y. $syear. Status: PENDING",
        "href" => "/profile",
        "subject" => "Submitted Student Profile for S.Y. $syear",
        "body" => '<div style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #cccccc;">
                  <tr>
                    <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: white; font-size: 24px;">
                      Guidance Office (SMCC)
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; text-align: left; font-size: 16px; line-height: 1.6;">
                      <p>You have submitted student profile to Guidance Office (SMCC).
                      <br />
                      Status: PENDING</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="https://www.smccnasipit.edu.ph">Saint Michael College of Caraga</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="'. $thisSite .'">Guidance Office (SMCC)</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>'
      ]);
      debug_write("SEND NOTIFICATION RESULT: " . json_encode($result));
    } catch (\Throwable $e) {
      debug_write("Failed to send notification: " . $e->getMessage());
    }
    back();
  } else {
    $_SESSION['error'] = $response;
    $_SESSION['formdata'] = $_POST;
    back();
  }
}

//
if (is_current_path('/api/post/assessment/submit')) {
  $response = submitAssessment($_POST);
  if ($response['status']) {
    $_SESSION['success'] = $response;
    try {
      $syear = $response['sy'] . " - " . (intval($response['sy']) + 1);
      $thisSite = fullurlpath('/');
      $result = sendNotification([
        'student_id', $response['id'],
        'syid' => $response['syid'],
        "title" => "Student Self-Assessment for S.Y. $syear submitted",
        "message" => "You have submitted your Student Self-Assessment for S.Y. $syear",
        "href" => "/assess",
        "subject" => "Submitted Student Profile for S.Y. $syear",
        "body" => '<div style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #cccccc;">
                  <tr>
                    <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: white; font-size: 24px;">
                      Guidance Office (SMCC)
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; text-align: left; font-size: 16px; line-height: 1.6;">
                      <p>You have submitted student self-assessment form to the Guidance Office (SMCC).</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="https://www.smccnasipit.edu.ph">Saint Michael College of Caraga</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="'. $thisSite .'">Guidance Office (SMCC)</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>'
      ]);
      debug_write("SEND NOTIFICATION RESULT: " . json_encode($result));
    } catch (\Throwable $e) {
      debug_write("Failed to send notification: " . $e->getMessage());
    }
    back();
  } else {
    $_SESSION['error'] = $response;
    $_SESSION['formdata'] = $_POST;
    back();
  }
}

//
if (is_current_path('/api/post/feedback/submit')) {
  try {
    $response = submitFeedback($_POST);
    if ($response['status']) {
      responseJSON([
        'success' => $response['msg'],
        'sy' => $response['sy'],
      ], 201);
    } else {
      responseJSON([
        'error' => $response['msg']
      ], 200);
    }
  } catch (\Throwable $e) {
    responseJSON([
      'error' => 'Internal Server Error: ' . $e->getTraceAsString(),
    ], 500);
  }
}

if (is_current_path("/api/post/notification/read")) {
  try {
    $response = readNotification($_POST);
    if ($response['status']) {
      responseJSON([
        'success' => $response['msg'],
      ], 201);
    } else {
      responseJSON([
        'error' => $response['msg']
      ], 200);
    }
  } catch (\Throwable $e) {
    responseJSON([
      'error' => 'Internal Server Error: ' . $e->getTraceAsString(),
    ], 500);
  }
}

// GET
if (is_current_path('/api/get/myappointments')) {
  if (!isset($_SESSION['userdata']) || !getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole() !== 'student') {
    responseJSON(['error'=>'Invalid Access'], 403);
  }
  $studentid = getSearchParam('id');
  $schoolYear = getSearchParam('sy');
  responseJSON(getMyAppointmentSchedules($studentid, $schoolYear));
}

if (is_current_path('/api/get/notifications')) {
  if (!isset($_SESSION['userdata']) || !getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole() !== 'student') {
    responseJSON(['error'=>'Invalid Access'], 403);
  }
  $response = getNotifications();
  responseJSON($response);
}
