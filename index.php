<?php
use Smcc\Gcms\orm\Database;
use Smcc\Gcms\orm\models\Schoolyear;

error_reporting(1);
// ini_set('display_errors', 0);

define('WORKSPACE_DIR', __DIR__);

// this page serves as the initial page
require WORKSPACE_DIR . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Smcc\Gcms\orm\models\Users;

try {
// Initialize and load the .env file
$dotenv = Dotenv::createImmutable(__DIR__, [".env", ".env.local"]);
$dotenv->load();
} catch (Throwable $e) {}

require_once WORKSPACE_DIR . '/assets/php/functions.php';

try {

  if (isset($_SESSION['Auth'])) {
    define('AUTHUSER', getUser($_SESSION['userdata']['id']));
  } else {
    define('AUTHUSER', null);
  }
  // define sidebar links based on user role
  define('SIDEBAR_LINKS', getSidebarLinks(!is_null(AUTHUSER) ? AUTHUSER->role : null));
  Database::getInstance();
  Database::createSeed();
  //display pages from function
  match (CLEARED_PAGE_URI) {
    '/test' => throw new Exception('ERROR!! Page not found!!'),
    '/' => redirect('/login'),
    // Superadmin routes
    '/schoolyear' => showPage('superadmin/schoolyear', 'Manage School Year', [
      'user' => AUTHUSER,
      'data' => Schoolyear::all(),
      'scripts' => [
        pathname('js/schoolyear.js')
      ]
    ], 'auth', ['auth']),
    '/accounts/admin' => showPage('superadmin/admin', 'Manage Admin Accounts', [
      'user' => AUTHUSER,
      'data' => [
        "admins" => array_map(fn($mapped) => [...$mapped->toArray(), "password" => ''], array: Users::findMany("role", "admin")),
      ],
      'scripts' => [
        pathname('js/react/alladmin.mjs')
      ]
    ], 'auth', ['auth']),
    '/accounts/student' => showPage('superadmin/student', 'Manage Student Accounts', [
      'user' => AUTHUSER,
      'data' => [
        "students" => array_map(fn($mapped) => [...$mapped->toArray(), "password" => ''], array: Users::findMany("role", "student")),
      ],
      'scripts' => [
        pathname('js/react/allstudent.mjs')
      ]
    ], 'auth', ['auth']),
    // Admin rotues
    '/dashboard' => showPage('admin/dashboard', 'Admin Dashboard', ['user' => AUTHUSER, 'scripts' => [pathname('js/dashboard.js')]], 'auth', ['auth']),
    '/profile/grade7' => showPage('admin/profiles_submitted', 'Grade 7 Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(7), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/grade8' => showPage('admin/profiles_submitted', 'Grade 8 Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(8), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/grade9' => showPage('admin/profiles_submitted', 'Grade 9 Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(9), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/grade10' => showPage('admin/profiles_submitted', 'Grade 10 Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(10), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/grade11' => showPage('admin/profiles_submitted', 'Grade 11 Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(11), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/grade12' => showPage('admin/profiles_submitted', 'Grade 12 Profiles', ['user' => AUTHUSER, "title" => "Grade 12 Profiles", "data" => getStudentProfilesData(12), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/college1' => showPage('admin/profiles_submitted', '1st Year College Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(1), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/college2' => showPage('admin/profiles_submitted', '2nd Year College Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(2), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/college3' => showPage('admin/profiles_submitted', '3rd Year College Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(3), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/college4' => showPage('admin/profiles_submitted', '4th Year College Profiles', ['user' => AUTHUSER, "data" => getStudentProfilesData(4), 'scripts' => [pathname('js/react/profiles_submitted.mjs')]], 'auth', ['auth']),
    '/profile/no-profiles' => showPage('admin/profiles_pending', 'No Profiles Submitted', ['user' => AUTHUSER, "data" => getNoProfilesSubmittedData(), 'scripts' => [pathname('js/react/profiles_pending.mjs')]], 'auth', ['auth']),
    '/counseling' => showPage('admin/counseling', 'Counseling Records', ['user' => AUTHUSER, "data" => getCounselingRecordsData(), 'scripts' => [pathname( 'js/react/counseling.mjs')]], 'auth', ['auth']),
    '/assessment/manage' => showPage('admin/assessment_manage', 'Manage Assessment Form', ['user' => AUTHUSER, "data" => getAssessmentFormManagementData(), 'scripts' => [pathname('js/react/assessment_manage.mjs')]], 'auth', ['auth']),
    '/assessment/make/calledslip' => showPage('admin/assessment_make_calledslip', 'Schedule Called Slip', ['user' => AUTHUSER, "data" => getGuidanceAndStudentData(), 'scripts' => [pathname('js/react/assessment_make_calledslip.mjs')]], 'auth', ['auth']),
    '/feedbacks' => showPage('admin/feedbacks', 'Counseling Feedbacks', ['user' => AUTHUSER, "data" => getFeedbacks(), 'scripts' => [pathname( 'js/react/feedbacks.mjs')]], 'auth', ['auth']),
    '/print' => showPage('admin/print', 'Print', ['user' => AUTHUSER], 'print', ['auth']),
    // Student routes
    '/home' => showPage('student/home', 'Home', ['user' => AUTHUSER, 'scripts' => [pathname('js/print.js')]], 'auth', ['auth']),
    '/profile' => showPage('student/profile', 'Profile', ['user' => AUTHUSER, 'submittedProfile' => getStudentProfileData(AUTHUSER), 'scripts' => [pathname('js/inputProfile.js')]], 'auth', ['auth']),
    '/assess' => showPage('student/assess', 'Self-Assessment Form', ['user' => AUTHUSER, 'data' => getAssessmentData(AUTHUSER)], 'auth', ['auth']),
    '/appointments' => showPage('student/appointments', 'Student Counseling Appointments', ['user' => AUTHUSER, "data" => ["user" => [...AUTHUSER?->toArray(), "password" => null], "sy" => getCurrentRegisteredSchoolYear()], 'scripts' => [pathname('js/react/appointments.mjs')]], 'auth', ['auth']),
    '/notifications' => showPage('student/notifications', 'Notifications', ['user' => AUTHUSER, 'scripts' => [pathname( 'js/react/notifications.mjs')]], 'auth', middlewares: ['auth']),
    // Authentication routes
    '/signup' => showPage('auth/signup', 'Sign Up', ["scripts" => [pathname("js/react/signup.mjs")]], 'guest', ['guest']),
    '/login' => showPage('auth/login', 'Login', ["scripts" => [pathname("js/inputForm.js")]], 'guest', ['guest']),
    // General routes
    '/settings' => showPage('settings', 'Settings', ["user" => AUTHUSER, "data" => ["user" => AUTHUSER?->toArray()], "scripts" => [pathname("js/react/settings.mjs")]], 'auth', ['auth']),
    '/forgot_password' => showPage('forgot_password', 'Forgot Password', ["scripts" => [pathname('js/react/forgot_password.mjs')]], 'guest', ['guest']),
    /* API Routes */
    // POST
    '/api/post/login' => showAPI('actions', 'POST'),
    '/api/post/signup' => showAPI('actions', 'POST'),
    '/api/post/logout' => showAPI('actions', 'POST'),
    '/api/post/updateprofile' => showAPI('actions', 'POST'),
    '/api/post/send/notification' => showAPI('actions', 'POST'),
    '/api/post/broadcast/notification' => showAPI('actions', 'POST'),
    "/api/post/change/profile" => showAPI('actions', method: 'POST'),
    "/api/post/change/password" => showAPI('actions', method: 'POST'),
    "/api/post/change/password/forgot" => showAPI('actions', method: 'POST'),
    "/api/post/forgot_password" => showAPI('actions', method: 'POST'),
    "/api/post/verify/otp" => showAPI('actions', method: 'POST'),
    '/api/post/openschoolyear' => showAPI('superadmin', 'POST'),
    '/api/post/add/admin' => showAPI('superadmin', 'POST'),
    '/api/post/edit/admin' => showAPI('superadmin', 'POST'),
    "/api/set/admin/active" => showAPI('superadmin', 'POST'),
    "/api/set/admin/inactive" => showAPI('superadmin', 'POST'),
    '/api/post/edit/student' => showAPI('superadmin', 'POST'),
    "/api/set/student/active" => showAPI('superadmin', 'POST'),
    "/api/set/student/inactive" => showAPI('superadmin', 'POST'),
    "/api/post/studentprofile" => showAPI('student', 'POST'),
    "/api/post/assessment/submit" => showAPI('student', method: 'POST'),
    "/api/post/feedback/submit" => showAPI('student', method: 'POST'),
    "/api/post/notification/read" => showAPI('student', method: 'POST'),
    "/api/post/assessmentform" => showAPI('admin', 'POST'),
    "/api/post/assessmentform/open" => showAPI('admin', 'POST'),
    "/api/post/profile/approve" => showAPI('admin', 'POST'),
    "/api/post/profile/reject" => showAPI('admin', 'POST'),
    "/api/post/calledslip/schedule" => showAPI('admin', 'POST'),
    "/api/post/casenote/create" => showAPI('admin', 'POST'),
    "/api/post/agreementform/create" => showAPI('admin', 'POST'),
    "/api/post/documentation/upload" => showAPI('admin', method: 'POST'),
    // GET
    '/api/get/pagedata' => showAPI( 'get'),
    '/api/get/student/check' => showAPI('get'),
    '/api/get/myappointments' => showAPI('student'),
    '/api/get/notifications' => showAPI('student'),
    '/api/get/sendmail/test' => showAPI('admin'),
    '/api/get/dashboard' => showAPI('admin'),
    default => showPublicFolder('assets'),
  };
} catch (\Throwable $e) {
  showPage('error', 'Internal Server Error', ['error' => $e->getMessage() ." in ". $e->getFile() ." line ". $e->getLine(), 'trace' => $e->getTraceAsString()]);
}

unset($_SESSION['error']);
unset($_SESSION['formdata']);
