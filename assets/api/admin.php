<?php

if (!isset($_SESSION['userdata']) || !getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole() !== 'admin') {
  responseJSON(['error'=>'Invalid Access'], 403);
}

// POST
if (is_current_path('/api/post/assessmentform')) {
  try {
    $response = addUpdateAssessmentForm($_POST);
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

//
if (is_current_path('/api/post/assessmentform/open')) {
  try {
    $response = openAssessmentForm($_POST);
    if ($response['status']) {
      try {
        $syear = $response['sy'] . " - " . (intval($response['sy']) + 1);
        $thisSite = fullurlpath('/');
        broadcastNotification([
          'syid' => $response['syid'],
          "title" => "Student Self-Assessment is now open for S.Y. $syear",
          "message" => "You can now fill up the Self-Assessment Form for S.Y. $syear",
          "href" => "/assess",
          "subject" => "Student Self-Assessment is now open for S.Y. $syear",
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
                        <p>You can now fill up the <a href="'. $thisSite .'assess">Student Self-Assessment Form</a>.</p>
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
      } catch (\Throwable $e) {
        debug_write("Failed to send notification: " . $e->getMessage());
      }
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

//
if (is_current_path('/api/post/profile/approve')) {
  try {
    $response = approveProfile($_POST);
    if ($response['status']) {
      try {
        $syear = $response['sy'] . " - " . (intval($response['sy']) + 1);
        $thisSite = fullurlpath('/');
        $result = sendNotification([
          'student_id' => $response['id'],
          'syid' => $response['syid'],
          "title" => "Your submitted Student Profile has been approved and completed for S.Y. $syear",
          "message" => "You can now fill up your Student Self-Assessment Form when it is open.",
          "href" => "/assess",
          "subject" => "Student Profile Completed for S.Y. $syear",
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
                        <p>Your submitted Student Profile has been approved and completed for S.Y. '.$syear.'.
                        <br />
                        You may now fill out the <a href="'.$thisSite.'assess">Student Self-Assessment Form</a> when it is open.</p>
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

//
if (is_current_path('/api/post/profile/reject')) {
  try {
    $response = rejectProfile($_POST);
    if ($response['status']) {
      try {
        $syear = $response['sy'] . " - " . (intval($response['sy']) + 1);
        $thisSite = fullurlpath('/');
        $result = sendNotification([
          'student_id' => $response['id'],
          'syid' => $response['syid'],
          "title" => "Your submitted Student Profile has not been accepted by the Guidance Office for S.Y. $syear",
          "message" => "Fill out again your Student Profile.",
          "href" => "/profile",
          "subject" => "Student Profile has not been accepted for S.Y. $syear",
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
                        <p>Your submitted Student Profile has not been accepted by the Guidance Office for S.Y. '.$syear.'.
                        <br />
                        You may now fill out again the <a href="'.$thisSite.'profile">Student Profile Form</a> and follow instructions.</p>
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

//
if (is_current_path('/api/post/calledslip/schedule')) {
  try {
    $response = scheduleCalledSlip($_POST);
    if ($response['status']) {
      try {
        $syear = $response['sy'] . " - " . (intval($response['sy']) + 1);
        $thisSite = fullurlpath('/');
        $scheduled = $response['schedule'];
        $guidanceName = $response['guidance'];
        $result = sendNotification([
          'student_id' => $response['id'],
          'syid' => $response['syid'],
          "title" => "New Appointment for Guidance Counseling at Guidance Office (SMCC)",
          "message" => "You have a new appointment for Guidance Office on $scheduled",
          "href" => "/appointments",
          "subject" => "New Appointment for Guidance Counseling at Guidance Office (SMCC)",
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
                        <div style="margin-top: 0.5rem; margin-bottom: 0.5rem;">Good Day!</div>
                        <div style="margin-bottom: 1rem;">
                          <p>
                            The Guidance In-charge/Counselor would like to request your generous time for us to talk about some important matters. Your presence is highly needed to facilitate the said purpose. You are scheduled to see the Guidance. In-charge/Counselor on
                            &nbsp;<span style="text-decoration: underline;">'.$scheduled.'</span> in the Guidance Center.
                          </p>
                          <br />
                          <p>Rest assured all the information that transpired during the session will be treated with respect and circumscribed by the confidentiality statement.</p>
                          <br />
                          <p>Thank you and More Power!</p>
                        </div>
                        <div style="margin-bottom: 2rem;">Respectfully Yours,</div>
                        <div style="display: flex; flex-direction: column; max-width: 300px; text-align: center; margin-bottom: 1rem;">
                          <div style="border-bottom: 1px solid black; text-transform: uppercase;">
                            '.$guidanceName.'
                          </div>
                          <div style="font-size: 0.875rem; font-style: italic;">
                            Guidance In-charge/Counselor
                          </div>
                        </div>
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

//
if (is_current_path('/api/post/casenote/create')) {
  try {
    $response = createCaseNote($_POST);
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

//
if (is_current_path('/api/post/agreementform/create')) {
  try {
    $response = createAgreementForm($_POST);
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

//
if (is_current_path('/api/post/documentation/upload')) {
  try {
    $response = createDocumentation($_POST);
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
if (is_current_path('/api/get/sendmail/test')) {
  if (!isset($_SESSION['userdata']) || !getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole() !== 'admin') {
    responseJSON(['error'=>'Invalid Access'], 403);
  }
  $response = sendTestEmail();
  responseJSON(['data' => $response]);
}

if (is_current_path('/api/get/dashboard')) {
  if (!isset($_SESSION['userdata']) ||!getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole()!== 'admin') {
    responseJSON(['error'=>'Invalid Access'], 403);
  }
  $response = getDashboardData();
  responseJSON(['data' => $response]);
}
