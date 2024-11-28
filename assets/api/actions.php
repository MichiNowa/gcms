<?php


// send email notification
if (is_current_path('/api/post/send/notification')) {
  try {
    $response = sendNotification($_POST);
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
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
  }
}

// broadcast email notification
if (is_current_path('/api/post/broadcast/notification')) {
  try {
    $response = broadcastNotification($_POST);
    if ($response['status']) {
      responseJSON([
        'success' => $response['msg'],
        'sent' => $response['sent']
      ], 201);
    } else {
      responseJSON([
        'error' => $response['msg']
      ], 200);
    }
  } catch (\Throwable $e) {
    responseJSON([
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
    debug_write("ERROR: ". $e->getMessage());
  }
}

// change profile
if (is_current_path('/api/post/change/profile')) {
  try {
    $response = changeProfile($_POST);
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
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
    debug_write("ERROR: ". $e->getMessage());
  }
}

// change password
if (is_current_path('/api/post/change/password')) {
  try {
    $response = changePassword($_POST);
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
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
    debug_write("ERROR: ". $e->getMessage());
  }
}

// change password
if (is_current_path('/api/post/change/password/forgot')) {
  try {
    $response = changePasswordForgot($_POST);
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
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
    debug_write("ERROR: ". $e->getMessage());
  }
}

// forgot password api
if (is_current_path('/api/post/forgot_password')) {
  try {
    $response = forgotPassword($_POST);
    if ($response['status']) {
      $thisSite = fullurlpath('/');
      $result = sendNotification([
        'student_id' => $response['student_id'],
        'syid' => null,
        "title" => null,
        "message" => null,
        "href" => null,
        "subject" => "Guidance Office - OTP Code",
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
                      <div style="margin-bottom: 1rem;">
                        <p>'.$response['otp'].'<br />This is your One Time Pin to reset your password for your SMCC Guidance Center account. Please do not share your pin with others. Valid only for 15 minutes.</p>
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
      responseJSON([
        'success' => $response['msg'],
        'otp_id' => $response['otp_id'],
        'otp_expiry' => $response['otp_expiry'],
        'email' => $response['email'],
      ], 201);
    } else {
      responseJSON([
        'error' => $response['msg']
      ], 200);
    }
  } catch (\Throwable $e) {
    responseJSON([
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
    debug_write("ERROR: ". $e->getMessage());
  }
}

// forgot password api
if (is_current_path('/api/post/verify/otp')) {
  try {
    $response = verifyOTP($_POST);
    if ($response['status']) {
      responseJSON([
        'success' => $response['msg'],
        'user_id' => $response['user_id'],
      ], 201);
    } else {
      responseJSON([
        'error' => $response['msg']
      ], 200);
    }
  } catch (\Throwable $e) {
    responseJSON([
      'error' => 'Internal Server Error: '. $e->getTraceAsString(),
    ], 500);
    debug_write("ERROR: ". $e->getMessage());
  }
}

//for managing signup
if (is_current_path('/api/post/signup')) {
  $response = validateSignupForm($_POST);
  if ($response['status']) {
    if (createUser($_POST)) {
      $_SESSION['newuser'] = true;
      back();
    } else {
      $_SESSION['error'] = "Failed to register account. Please try again.";
      $_SESSION['formdata'] = $_POST;
      back();
    }
  } else {
    $_SESSION['error'] = $response;
    $_SESSION['formdata'] = $_POST;
    back();
  }
}

//for managing login
if (is_current_path('/api/post/login')) {
  $response = validateLoginForm($_POST);
  if ($response['status']) {
    $_SESSION['Auth'] = true;
    $_SESSION['userdata'] = $response['user'];
    $role = getUser($_SESSION['userdata']['id'])->role;
    redirect(
      $role === 'superadmin'
      ? "/schoolyear"
      : ($role === 'admin'
      ? "/dashboard"
      : "/home")
    );
  } else {
    $_SESSION['error'] = $response;
    $_SESSION['formdata'] = $_POST;
    back();
  }
}

//for logout the user
if (is_current_path('/api/post/logout')) {
  session_destroy();
  redirect("/");
}


// default 404 response
$_SESSION['error'] = [
  "msg" => "404 Not found",
  "status" => false,
];
$_SESSION['formdata'] = $_POST;
back();
