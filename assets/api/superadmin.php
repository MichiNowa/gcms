<?php

if (!isset($_SESSION['userdata']) || !getUser($_SESSION['userdata']['id']) || AUTHUSER->getRole() !== 'superadmin') {
  responseJSON(['error'=>'Invalid Access'], 403);
}

// for opening a new school year by superadmin
if (is_current_path('/api/post/openschoolyear')) {
  header('Content-Type: application/json');
  try {
    $response = openSchoolYear($_POST);
    if ($response['status']) {
      responseJSON([
        'success' => $response['msg'],
        'sy' => $response['sy'],
        'syid' => $response['syid']
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


// for opening a new admin account by superadmin
if (is_current_path('/api/post/add/admin')) {
  header('Content-Type: application/json');
  try {
    $response = addAdminAccount($_POST);
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


if (is_current_path('/api/post/edit/admin')) {
  header('Content-Type: application/json');
  try {
    $response = editAdminAccount($_POST);
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

if (is_current_path("/api/set/admin/inactive")) {
  header('Content-Type: application/json');
  try {
    $response = setAccountActive($_POST, false);
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


if (is_current_path("/api/set/admin/active")) {
  header('Content-Type: application/json');
  try {
    $response = setAccountActive($_POST, true);
    if ($response['status']) {
      responseJSON([
        'success' => $response['msg'],
      ], 201);
    } else {
      responseJSON([
        'error' => $response['msg']
      ], 200);
      http_response_code(200);
    }
  } catch (\Throwable $e) {
    responseJSON([
      'error' => 'Internal Server Error: ' . $e->getTraceAsString(),
    ], 500);
  }
}


// students
if (is_current_path('/api/post/edit/student')) {
  header('Content-Type: application/json');
  try {
    $response = editStudentAccount($_POST);
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

if (is_current_path("/api/set/student/inactive")) {
  header('Content-Type: application/json');
  try {
    $response = setAccountActive($_POST, false);
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


if (is_current_path("/api/set/student/active")) {
  header('Content-Type: application/json');
  try {
    $response = setAccountActive($_POST, true);
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
