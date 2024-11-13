<?php
require_once 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use Smcc\Gcms\orm\Database;
use Smcc\Gcms\orm\models\AgreementForm;
use Smcc\Gcms\orm\models\Assessment;
use Smcc\Gcms\orm\models\AssessmentForm;
use Smcc\Gcms\orm\models\BasicStatus;
use Smcc\Gcms\orm\models\CalledInSlip;
use Smcc\Gcms\orm\models\CaseNote;
use Smcc\Gcms\orm\models\CollegeStatus;
use Smcc\Gcms\orm\models\FeedbackForm;
use Smcc\Gcms\orm\models\Notification;
use Smcc\Gcms\orm\models\OTPToken;
use Smcc\Gcms\orm\models\ReferralForm;
use Smcc\Gcms\orm\models\Schoolyear;
use Smcc\Gcms\orm\models\StudentBasic;
use Smcc\Gcms\orm\models\StudentCollege;
use Smcc\Gcms\orm\models\StudentProfile;
use Smcc\Gcms\orm\models\Users;

// initialize the database connection
Database::getInstance();

// function to return the absolute path of the workspace including $path argument (to avoid import errors)
function import($path): string
{
  $path = explode("/", $path);
  $path = array_filter($path, fn($p) => !empty ($p));
  $path = implode(DIRECTORY_SEPARATOR, [WORKSPACE_DIR, ...$path]);
  return $path;
}

function getSearchParam(string $key)
{
  return $_GET[$key] ?? null;
}

// write debug to file debug.txt
function debug_write(string $message)
{
  $logMessage = sprintf("[%s] - %s", date('Y-m-d H:i:s'), $message . PHP_EOL);
  $logFile = import("debug.log");

  if (file_put_contents($logFile, $logMessage, FILE_APPEND) === false) {
    // Handle error if needed
    error_log("Failed to write to log file: $logFile");
  }
}

//function for showing pages
function showPage($view, $page_title, $data = [], $layout = 'guest', $middlewares = [])
{
  foreach ($middlewares as $middleware) {
    // Check if middleware is valid
    $middlewareFile = import("/assets/middleware/{$middleware}.php");
    if (file_exists($middlewareFile) && is_file($middlewareFile)) {
      require $middlewareFile;
    }
  }
  if (!isset($data["scripts"])) {
    $data["scripts"] = [];
  }
  // Extract the data array into variables
  extract($data);
  // put the $data into SESSION['page_data']
  $_SESSION['page_data'] = json_encode($data);

  ob_start();
  require import("assets/pages/{$view}.php");
  $content = ob_get_clean();
  $page_title = APP_TITLE . " - " . $page_title;
  // Include the layout file
  require import("assets/layouts/{$layout}.php");
  if ($view === "error") {
    http_response_code(500);
  } else if ($view === "notFound404") {
    http_response_code(404);
  }
  debug_write($_SERVER['REQUEST_METHOD'] . " " . http_response_code() . " - " . CLEARED_PAGE_URI);
}

function showAPI($endpoint, $method = 'GET', $data = [])
{
  if ($_SERVER['REQUEST_METHOD'] == $method) {
    extract($data);
    require import("assets/api/{$endpoint}.php");
  }
  debug_write($_SERVER['REQUEST_METHOD'] . " " . http_response_code() . " - " . CLEARED_PAGE_URI);
}

function showFile($filepath)
{
  if (!empty($filepath) && file_exists($filepath)) {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $filepath);
    finfo_close($finfo);

    // Fallback for JavaScript files
    if (preg_match('/\.(js)$/', $filepath) || preg_match('/\.(mjs)$/', $filepath)) {
      $mime_type = 'application/javascript;charset=UTF-8';
    } else if (preg_match('/\.(css)$/', $filepath)) {
      $mime_type = 'text/css;charset=UTF-8';
    } else if (preg_match('/\.(json)$/', $filepath)) {
      $mime_type = 'application/json;charset=UTF-8';
    }
    header("Content-Type: $mime_type");
    readfile($filepath);
  } else {
    showPage('notFound404', 'Page Not Found');
  }
}

function showPublicFolder($basepath)
{
  if (file_exists($basepath) && is_dir($basepath)) {
    $pageuri = CLEARED_PAGE_URI;
    $file = implode(DIRECTORY_SEPARATOR, [$basepath, "public", $pageuri]);
  }
  showFile($file);
}


// function for back to previous page
function back($status = 302)
{
  $prefix = URI_PREFIX;
  if (isset($_SESSION['prev_url'])) {
    $previousUrl = $_SESSION['prev_url'];
    unset($_SESSION['prev_url']);
    $_SESSION['backed'] = true;
    header("Location: $previousUrl", true, $status);
    exit;
  } else {
    // Fallback URL if no previous URL is found
    header("Location: {$prefix}/", true, $status);
    exit;
  }
}

function br()
{
  return "<div class=\"tw-w-full tw-h-[12pt]\"></div>";
}

function is_current_path($pathname): bool
{
  return PAGE_URI === pathname($pathname);
}

// function for redirect to specific page
function redirect($pathname, $status = 302)
{
  $p = pathname($pathname);
  header("Location: $p", true, $status);
  exit;
}


//function for getting desired pathname
function pathname(...$path): string
{
  $paths = array_map(fn($p) => $p[0] === "/" ? substr($p, 1) : $p, $path);
  return implode("/", [URI_PREFIX, ...$paths]);
}

function fullurlpath(...$path): string
{
  // Get the current protocol (http or https)
  $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';

  // Get the current host (domain + port if specified)
  $host = $_SERVER['HTTP_HOST'];
  return $protocol . '://' . $host . pathname(...$path);
}

//function for show errors
function showError($field)
{
  if (isset($_SESSION['error'])) {
    $error = $_SESSION['error'];
    if (isset($error['field']) && $field == $error['field']) {
      ?>
      <div class="alert alert-danger my-2" role="alert">
        <?= $error['msg'] ?>
      </div>
      <?php
    }
  }
}

//function show response json
function responseJSON($data, $statusCode = 200)
{
  header("Content-Type: application/json; charset=UTF-8");
  http_response_code($statusCode);
  echo json_encode($data);
  exit;
}

//function for show prevformdata
function showFormData($field): string
{
  if (isset($_SESSION['formdata'])) {
    $formdata = $_SESSION['formdata'];
    return $formdata[$field] ?? "";
  }
  return '';
}

//function for showing loading component
function showLoading()
{
  ob_start();
  require import("assets/components/loading.php");
  return ob_get_clean();
}

enum BannerStatus: int
{
  case INFO = 0;
  case WARNING = 1;
  case ERROR = 2;
}

//function for showing banner alert
function showBanner(string $banner_title, string $banner_message, BannerStatus $banner_state = BannerStatus::INFO)
{
  ob_start();
  require import("assets/components/banner.php");
  return ob_get_clean();
}

//
function getCurrentRegisteredSchoolYear(int $add = 0): int
{
  $allSy = Schoolyear::all();
  $p = array_reduce($allSy, function ($init, $sy) {
    if (isset($sy['year']) && intval($sy['year']) > $init) {
      return intval($sy['year']);
    }
    return $init;
  }, date('Y'));
  return (int) ($p + $add);
}

function getStudentProfileData($user): array|null
{
  if ($user) {
    $sy = getCurrentRegisteredSchoolYear();
    // check if school year is open
    $syRow = Schoolyear::findOne('year', $sy);
    if ($syRow) {
      foreach ([StudentBasic::class, StudentCollege::class] as $table) {
        $profileTableRows = match ($table) {
          StudentBasic::class => StudentBasic::findMany("user_id", $user->id),
          StudentCollege::class => StudentCollege::findMany("user_id", $user->id),
          default => [],
        };
        // continue if empty
        if (empty($profileTableRows))
          continue;
        //
        $profileTables = array_filter($profileTableRows, fn($ptr) => strval($ptr->getSchoolyearId()) == strval($syRow->getId()));
        if (empty($profileTables))
          continue;
        $profileTable = array_pop($profileTables);
        $studentProfile = StudentProfile::findOne("id", $profileTable->getId())?->toArray() ?? [];
        return [
          "education" => match ($table) {
            StudentBasic::class => "basic",
            StudentCollege::class => "college",
            default => null,
          },
          "student_education" => [...$profileTable->toArray()],
          "student_profile" => [...$studentProfile],
          "profile_statuses" => match ($table) {
            StudentBasic::class => [...array_map(fn($bs) => $bs->toArray(), BasicStatus::findMany("basic_id", $profileTable->getId()))],
            StudentCollege::class => [...array_map(fn($cs) => $cs->toArray(), CollegeStatus::findMany("college_id", $profileTable->getId()))],
            default => null,
          },
        ];
      }
      return [];
    }
  }
  return null;
}

function getAssessmentData(Users $user): array
{
  $sy = getCurrentRegisteredSchoolYear();
  // check if school year is open
  $syRow = Schoolyear::findOne('year', $sy);
  // check if assessment form is closed or opened
  if ($syRow && !$syRow->isEditable()) {
    $stpStatus = false;
    // check if student has student profile submitted and completed
    $cstp = StudentCollege::findMany('user_id', $user->getId());
    $cstp = array_reduce($cstp, function ($a, StudentCollege $b) use ($syRow) {
      if (strval($b->getSchoolyearId()) === strval($syRow->getId())) {
        return $b;
      }
      return $a;
    }, null);
    if ($cstp) {
      // college
      $cstatus = CollegeStatus::findMany('college_id', $cstp->getId());
      $stpStatus = array_reduce($cstatus, fn($a, $b) => $a || $b->getStatus() === "completed", false);
    } else {
      $bstp = StudentBasic::findMany('user_id', $user->getId());
      $bstp = array_reduce($bstp, function ($a, StudentBasic $b) use ($syRow) {
        if (strval($b->getSchoolyearId()) === strval($syRow->getId())) {
          return $b;
        }
        return $a;
      }, null);
      if ($bstp) {
        $bstatus = BasicStatus::findMany('basic_id', $bstp->getId());
        $stpStatus = array_reduce($bstatus, fn($a, $b) => $a || $b->getStatus() === "completed", false);
      }
    }
    if (!$stpStatus) {
      return [
        "sy" => $syRow,
        "assessmentforms" => null,
        "assessments" => null,
        "user" => $user,
        "is_open" => false,
      ];
    }
    $assessmentforms = AssessmentForm::findMany("schoolyear_id", $syRow->getId());
    $afids = array_map(fn($af) => strval($af->getId()), $assessmentforms);
    $assessments = Assessment::findMany("user_id", $user->id);
    $assessments = array_filter($assessments, fn($as) => in_array(strval($as->getAssessmentFormId()), $afids));
    $result = [
      "sy" => $syRow,
      "assessmentforms" => $assessmentforms,
      "assessments" => $assessments,
      "user" => $user,
      "is_open" => true,
    ];
    return $result;
  }
  return [
    "sy" => null,
    "assessment" => null,
    "user" => null,
    "is_open" => false,
  ];
}

//
function getGenders()
{
  return [
    'Male',
    'Female',
  ];
}

//
function getDepartmentsAndCourses()
{
  return [
    'College of Arts and Sciences' => [
      'Bachelor of Arts Major in English Language',
    ],
    'College of Business Management' => [
      'Bachelor of Science in Business Administration Major in Financial Management',
      'Bachelor of Science in Business Administration Major in Human Resource Management',
      'Bachelor of Science in Business Administration Major in Marketing Management',
      'Bachelor of Public Administration',
      'Bachelor of Science in Enterpreneurship',
    ],
    'College of Computing and Information Sciences' => [
      'Bachelor of Science in Information Technology',
      'Bachelor of Science in Computer Science',
      'Bachelor of Library and Information Science',
      'Diploma in Information Technology',
    ],
    'College of Criminal Justice Education' => [
      'Bachelor of Science in Criminology',
    ],
    'College of Teacher Education' => [
      'Bachelor of Elementary Education',
      'Bachelor of Secondary Education Major in English',
      'Bachelor of Secondary Education Major in Science',
      'Bachelor of Secondary Education Major in Social Studies',
      'Bachelor of Physical Education',
      'Bachelor of Technical Vocational',
      'Bachelor of Technical Vocational Teacher Education',
      'Bachelor of Early Childhood Education',
    ],
    'College of Tourism and Hospitality Management' => [
      'Bachelor of Science in Hospitality Management',
      'Bachelor of Science in Tourism Management',
      'Diploma in Hospitality Management Technology',
      'Food and Beverage Services NC II',
      'Housekeeping NC II',
      "Ship's Catering Services NC II",
    ],
  ];
}

//
function getCivilStatuses()
{
  return [
    'Single',
    'Married',
    'Legally Separated',
    'Widowed',
  ];
}

function getTypesOfEmployee()
{
  return [
    'Government',
    'Entreprenuer',
    'Private',
    'NGO',
    'Self-Employed',
    'OFW',
    'Others, pls specify'
  ];
}

function getEducationAttaiments()
{
  return [
    "Primary School",
    "Secondary School",
    "Junior High School",
    "Senior High School",
    "Vocational or TESDA (Diploma)",
    "Undergraduate (Bachelor’s Degree)",
    "Postgraduate (Master’s Degree)",
    "Doctoral (PhD)",
  ];
}

function getMaritalStatuses()
{
  return [
    "Married in Church",
    "Mother Remarried",
    "Father Remarried",
    "Single Parents",
    "Married Civilly",
    "Father Remarried",
    "If Separated, with whom do you stay:",
  ];
}

function getEducationSupports()
{
  return [
    "Mother",
    "Father",
    "Both Parents",
    "Self-supporting",
    "Working Student",
    "Lola/Lolo",
    "Aunt/Uncle",
    "Brother/Sister",
    "Educational Plan",
    "NGO",
    "Private",
    "Foreign",
  ];
}

enum PrintForms: string
{
  case CALLED_SLIP = "called_slip";
  case CASE_NOTES = "case_notes";
  case STUDENT_ASSESSMENT = "student_assessment";
  case STUDENT_FEEDBACK = "student_feedback";
  case STUDENT_PROFILE = "student_profile";
}

function getPrintForms()
{
  return array_map(fn($pf) => $pf->value, PrintForms::cases());
}

function getPrintButton(array $data = [], PrintForms $printForm = PrintForms::CALLED_SLIP)
{
  ?>
  <button class="btn btn-primary tw-cursor-pointer print-btn"
    data-query="form=<?= $printForm->value ?>&<?= implode("&", array_map(fn($k) => $k . "=" . $data[$k], array_keys($data))) ?>"><i
      class="bx bx-printer"></i><span class="tw-ml-1"></span class="">Print</span></button>
  <?php
}

function getModalDisplay(string $id, callable|string $title, callable|string $displayContent)
{
  ob_start();
  require import("assets/components/modal.php");
  return ob_get_clean();
}

//for checking authentication
function isAuthenticated()
{
  return isset($_SESSION['Auth']) && !is_null(AUTHUSER);
}

//for checking duplicate email
function isEmailRegistered($email)
{
  return Users::getRowCount(["email" => $email]) > 0;
}

//for checking duplicate studentid
function isUsernameRegistered($username)
{
  return Users::getRowCount(["username" => $username]) > 0;
}

//for checking duplicate studentid by other
function isUsernameRegisteredByOther($username)
{
  return Users::getRowCount(["username" => $username]) > 0;
}

//
function getMyAppointmentSchedules(int|string $userId, int|string $sy)
{
  $response = [
    "data" => [],
    "error" => null
  ];
  try {
    $user = Users::findOne('id', $userId);
    if (!$user || $user->getRole() !== "student") {
      throw new Exception("User is invalid");
    }
    $schoolYear = Schoolyear::findOne('year', $sy);
    if (!$schoolYear) {
      throw new Exception("Invalid school year");
    }
    $results = [];
    $results["user"] = $user->toArray();
    $stud = StudentBasic::findMany('user_id', $user->getId());
    $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($schoolYear->getId()));
    if (count($stud) > 0) {
      $stud = end($stud);
      $results['student'] = $stud->toArray();
      $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
      $results['student_profile'] = $student_profile;
      $status = BasicStatus::findMany('basic_id', $stud->getId());
      $status = count($status) > 0 ? end($status) : null;
      $results['profile_status'] = $status?->toArray();
    } else {
      $stud = StudentCollege::findMany('user_id', $user->getId());
      $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($schoolYear->getId()));
      if (count($stud) > 0) {
        $stud = end($stud);
        $results['student'] = $stud->toArray();
        $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
        $results['student_profile'] = $student_profile;
        $status = CollegeStatus::findMany('college_id', $stud->getId());
        $status = count($status) > 0 ? end($status) : null;
        $results['profile_status'] = $status?->toArray();
      }
    }
    $calledInSlips = CalledInSlip::findMany('user_id', $user->getId());
    $calledInSlips = array_filter($calledInSlips, fn(CalledInSlip $cis) => strval($cis->getSchoolyearId()) === strval($schoolYear->getId()));
    $walkIns = CaseNote::findMany('user_id', $user->getId());
    $walkIns = array_filter($walkIns, fn(CaseNote $cn) => strval($cn->getSchoolyearId()) === strval($schoolYear->getId()) && $cn->getInteractionType() === "Walked-in");
    $walkInIds = array_map(fn(CaseNote $wid) => $wid->getCalledSlipId(), $walkIns);
    $calledInSlips = array_filter($calledInSlips, fn(CalledInSlip $cis) => !in_array($cis->getId(), $walkInIds));
    $total = count($calledInSlips) + count($walkIns);
    $calledInResults = [];
    $walkedInResults = [];
    for ($i = 0; $i < $total; $i++) {
      $result = [];
      if ($i < count(value: $calledInSlips)) {
        // called in slips
        $cn = $calledInSlips[$i];
        $result['id'] = $cn->getId();
        $result['schedule'] = $cn->getSchedule()?->format("c");
        $gd = Users::findOne('id', $cn->getGuidanceId());
        $result['guidance'] = $gd->toArray();
        $csn = CaseNote::findOne('called_slip_id', $cn->getId());
        $result['case_note'] = $csn?->toArray();
        if ($csn) {
          $agf = AgreementForm::findOne('case_note_id', $csn->getId());
          $result['agreement_form'] = $agf?->toArray();
          $referral = ReferralForm::findOne('case_note_id', $csn->getId());
          $result['referral_form'] = $referral?->toArray();
          $feedbackForm = FeedbackForm::findOne('case_note_id', $csn->getId());
          $result['feedback'] = $feedbackForm?->toArray();
        } else {
          $agf = AgreementForm::findOne('called_slip_id', $cn->getId());
          $result['agreement_form'] = $agf?->toArray();
          $referral = ReferralForm::findOne('called_slip_id', $cn->getId());
          $result['referral_form'] = $referral?->toArray();
        }
        $calledInResults[] = $result;
      } else {
        // walked in case notes
        $index = count($calledInSlips) - $i;
        $cn = $walkIns[$index];
        $gd = Users::findOne('id', $cn->getGuidanceId());
        $result['guidance'] = $gd->toArray();
        $result['case_note'] = $cn?->toArray();
        $agf = AgreementForm::findOne('case_note_id', $cn->getId());
        $result['agreement_form'] = $agf?->toArray();
        $referral = ReferralForm::findOne('case_note_id', $cn->getId());
        $result['referral_form'] = $referral?->toArray();
        $feedbackForm = FeedbackForm::findOne('case_note_id', $cn->getId());
        $result['feedback'] = $feedbackForm?->toArray();
        $walkedInResults[] = $result;
      }
    }
    $results["called_in"] = $calledInResults;
    $results["walked_in"] = $walkedInResults;
    $response["data"] = $results;
  } catch (Exception $e) {
    http_response_code(400);
    $response["error"] = $e->getMessage();
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

// get student notifications
function getNotifications()
{
  $response = [];
  try {
    $user = AUTHUSER ?? null;
    if (!$user) {
      throw new Exception("Invalid User");
    }
    $notifications = Notification::findMany('user_id', $user->getId());
    $notifications = array_map(fn(Notification $n) => $n->toArray(), $notifications);
    $response['data'] = $notifications;
  } catch (Exception $e) {
    $response['error'] = $e->getMessage();
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

// testing sending email
function sendTestEmail()
{
  $response = [];
  $response['status'] = true;
  $to = EMAIL_TO_TEST ?? "";
  $subject = "Test Email from GCMS";
  $message = "<a href='https://www.youtube.com'>YOUTUBE</a><br /><h1 style='font-size:20pt;color:blue;'>This is a test email sent using PHP's mail() function.</h1>";
  $response['status'] = sendEmail($to, $subject, $message);
  $response['to'] = $to;
  $response['subject'] = $subject;
  $response['message'] = $message;
  return $response;
}

//
function getDashboardData()
{
  $response = [];
  // current school year
  $currentSchoolYear = getCurrentRegisteredSchoolYear();
  $sy = Schoolyear::findOne('year', $currentSchoolYear);
  if (!$sy) {
    $response['error'] = "Invalid School Year";
    return $response;
  }
  $students = Users::findMany('role', 'student');
  $guidances = Users::findMany('role', 'admin');
  $assessmentForms = !$sy->isEditable() ? AssessmentForm::findMany('schoolyear_id', $sy->getId()) : [];
  $assessmentFormsItems = array_map(fn(AssessmentForm $af) => $af->getItems(), $assessmentForms);
  $submittedAssessmentForms = [];
  $assessments = [
    // college
    '1' => [],
    '2' => [],
    '3' => [],
    '4' => [],
    // high school
    '7' => [],
    '8' => [],
    '9' => [],
    '10' => [],
    '11' => [],
    '12' => [],
  ];
  foreach ($assessmentForms as $af) {
    $assesses = Assessment::findMany('assessment_form_id', $af->getId());
    $submittedAssessmentForms[] = count($assesses);
    foreach ($assesses as $a) {
      $u = Users::findOne('id', $a->getUserId());
      $stud = StudentBasic::findMany('user_id', $u->getId());
      $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($sy->getId()));
      if (count($stud) > 0) {
        $stud = end($stud);
        // high school
        $aresponses = $a->getAssessmentResponse();
        foreach ($aresponses as $item) {
          if ($item['response'] === true) {
            if (!isset($assessments[strval($stud->getGradeLevel())][strval($item['id'])]) || !is_int($assessments[strval($stud->getGradeLevel())][strval($item['id'])])) {
              $assessments[strval($stud->getGradeLevel())][strval($item['id'])] = 0;
            }
            $assessments[strval($stud->getGradeLevel())][strval($item['id'])] += 1;
          }
        }
      } else {
        $stud = StudentCollege::findMany('user_id', $u->getId());
        $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($sy->getId()));
        if (count($stud) > 0) {
          $stud = end($stud);
          // college
          $responses = $a->getAssessmentResponse();
          foreach ($responses as $item) {
            if ($item['response'] === true) {
              if (!isset($assessments[strval($stud->getYearLevel())][strval($item['id'])]) || !is_int($assessments[strval($stud->getYearLevel())][strval($item['id'])])) {
                $assessments[strval($stud->getYearLevel())][strval($item['id'])] = 0;
              }
              $assessments[strval($stud->getYearLevel())][strval($item['id'])] += 1;
            }
          }
        }
      }
    }
  }
  $submittedAssessmentForms = max($submittedAssessmentForms);
  $frequencies = [
    // college
    '1' => [],
    '2' => [],
    '3' => [],
    '4' => [],
    // high school
    '7' => [],
    '8' => [],
    '9' => [],
    '10' => [],
    '11' => [],
    '12' => [],
  ];
  foreach ($assessments as $key => $val) {
    $ids = array_keys($val);
    $maxFrequencies = array_reduce($ids, function ($init, $id) use ($val, $assessmentFormsItems) {
      if (count($init) === 0 || $val[$id] > $init[1]) {
        $afItem = array_reduce($assessmentFormsItems, function ($ini, $afarray) use ($id) {
          foreach ($afarray as $afi) {
            if (strval($afi['id']) === strval($id)) {
              return $afi['item'];
            }
          }
          return $ini;
        }, null);
        if (!$afItem)
          return $init;
        return [$afItem, $val[$id]];
      }
      return $init;
    }, []);
    $frequencies[$key] = $maxFrequencies;
  }
  $calledin = CalledInSlip::findAll();
  $calledin = array_map(function (CalledInSlip $ci) {
    $ust = Users::findOne('id', $ci->getUserId());
    return [
      'name' => $ust?->getFirstName() . " " . ($ust?->getMiddleInitial() ? $ust->getMiddleInitial() . ". " : "") . $ust?->getLastName(),
      'schedule' => $ci->getSchedule()->format("c"),
      'url' => '/print?form=called_slip&id=' . $ci->getId(),
    ];
  }, $calledin);
  $response['called_in'] = $calledin;
  $response['sy'] = $sy->toArray();
  $response['total_students'] = count($students);
  $response['total_admin'] = count($guidances);
  $response['assessment_open'] = !$sy->isEditable();
  $response['assessment_form_items'] = count($assessmentFormsItems);
  $response['assessment_form_alarming'] = count(array_filter($assessmentFormsItems, fn($af) => $af['alarming'] === true));
  $response['submitted_assessment_forms'] = $submittedAssessmentForms;
  $response['assessment_frequencies'] = $frequencies;
  return $response;
}

//for validating the signup form
function validateSignupForm($form_data)
{
  $response = [];
  $response['status'] = true;

  if (!$form_data['password']) {
    $response['msg'] = "Please enter your password";
    $response['status'] = false;
    $response['field'] = 'password';
  }

  if (!$form_data['studentid']) {
    $response['msg'] = "Please enter your studentid";
    $response['status'] = false;
    $response['field'] = 'studentid';
  }

  if (!$form_data['email']) {
    $response['msg'] = "Please enter your email";
    $response['status'] = false;
    $response['field'] = 'email';
  }

  if (!$form_data['last_name']) {
    $response['msg'] = "Please enter your lastname";
    $response['status'] = false;
    $response['field'] = 'last_name';
  }
  if (!$form_data['first_name']) {
    $response['msg'] = "Please enter your first name";
    $response['status'] = false;
    $response['field'] = 'first_name';
  }
  if (!$form_data['gender']) {
    $response['msg'] = "Please enter your gender";
    $response['status'] = false;
    $response['field'] = 'gender';
  }
  if (isEmailRegistered($form_data['email'])) {
    $response['msg'] = "Oops! Email is already in-use";
    $response['status'] = false;
    $response['field'] = 'email';
  }
  if (isUsernameRegistered($form_data['studentid'])) {
    $response['msg'] = "Oopsies! studentid is already in-use";
    $response['status'] = false;
    $response['field'] = 'studentid';
  }

  return $response;
}

function openSchoolYear($form_data)
{
  $response = ['status' => true];
  if (!$form_data['year']) {
    $response['msg'] = "Please select a school year";
    $response['status'] = false;
  } else {
    Database::getInstance()->getPDO()->beginTransaction();
    try {
      $sy = Schoolyear::findOne('year', $form_data['year']);
      if (!$sy) {
        // create a new school year
        $sy = new Schoolyear();
        $sy->year = $form_data['year'];
        $sy->editable = true;
        $syid = $sy->save();
        if (!$syid) {
          throw new Exception('Could not create new school year');
        }
        $response['msg'] = "School year has been created successfully";
        $response['sy'] = $sy->getYear();
        $response['syid'] = $syid;
        Database::getInstance()->getPDO()->commit();
      } else {
        throw new Exception("School year already exists");
      }
    } catch (Exception $e) {
      $response['msg'] = "Internal Server Error: " . $e->getMessage();
      $response['status'] = false;
      Database::getInstance()->getPDO()->rollBack();
      debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
    }
  }
  return $response;
}

function addAdminAccount($form_data)
{
  $response = ['status' => true];
  if (
    !$form_data['username'] || !$form_data['first_name'] ||
    !$form_data['last_name'] || !$form_data['email'] || $form_data['role'] !== 'admin' || !$form_data['gender']
  ) {
    $response['msg'] = "Please fill all required fields";
    $response['status'] = false;
  } else {
    if (!Users::findOne('username', $form_data['username'])) {
      $account = new Users();
      $account->username = $form_data['username'];
      $account->first_name = $form_data['first_name'];
      $account->middle_initial = $form_data['middle_initial'] ?? '';
      $account->last_name = $form_data['last_name'];
      $account->email = $form_data['email'];
      $account->role = $form_data['role'];
      $account->gender = $form_data['gender'];
      $account->status = true;
      $account->profile_pic = "images/default-user.png";
      $account->setPassword(strtolower(substr($form_data['last_name'], 0, 1) . substr($form_data['first_name'], 0, 1)) . $form_data['username']);
      $created = $account->save();
      if (!$created) {
        $response['msg'] = "Failed to create account";
        $response['status'] = false;
      } else {
        $response['msg'] = "Admin Account created successfully";
      }
    } else {
      $response['msg'] = "Employee ID exists";
      $response['status'] = false;
    }
  }
  return $response;
}

function editAdminAccount($form_data)
{
  $response = ['status' => true];
  if (
    !$form_data['username'] || !$form_data['first_name'] ||
    !$form_data['last_name'] || !$form_data['email'] || $form_data['role'] !== 'admin' || !$form_data['gender']
  ) {
    $response['msg'] = "Please fill all required fields";
    $response['status'] = false;
  } else {
    $account = Users::findOne('username', $form_data['username']);
    if (!$account) {
      $response['msg'] = "User not found";
      $response['status'] = false;
    } else {
      $account->first_name = $form_data['first_name'];
      $account->middle_initial = $form_data['middle_initial'] ?? '';
      $account->last_name = $form_data['last_name'];
      $account->email = $form_data['email'];
      $account->gender = $form_data['gender'];
      if ($form_data['password']) {
        $account->setPassword($form_data['password']);
      }
      $updated = $account->save();
      if (!$updated) {
        $response['msg'] = "Failed to update account";
        $response['status'] = false;
      } else {
        $response['msg'] = "Admin Account updated successfully";
      }
    }
  }
  return $response;
}

function setAccountActive($form_data, bool $active)
{
  $response = ['status' => true];
  if (
    !$form_data['id']
  ) {
    $response['msg'] = "Invalid Request";
    $response['status'] = false;
  } else {
    $u = Users::findOne('id', $form_data['id']);
    if (!$u) {
      $response['msg'] = "User not found";
      $response['status'] = false;
    } else if ((!$u->status && !$active) && ($u->status && $active)) {
      $response['msg'] = "Already " . $active ? "active" : "inactive";
      $response['status'] = false;
    } else {
      $u->status = $active;
      try {
        $saved = $u->save();
        if (!$saved) {
          $response['msg'] = "Failed to set status " . $active;
          $response['status'] = false;
        } else {
          $response['msg'] = "Successfully set status " . $active;
        }
      } catch (\Throwable $e) {
        $response['msg'] = "An error occurred while saving the status: " . $e->getMessage();
        $response['status'] = false;
        debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
      }
    }
  }
  return $response;
}

function editStudentAccount($form_data)
{
  $response = ['status' => true];
  if (
    !$form_data['username'] || !$form_data['first_name'] ||
    !$form_data['last_name'] || !$form_data['email'] || $form_data['role'] !== 'student' || !$form_data['gender']
  ) {
    $response['msg'] = "Please fill all required fields";
    $response['status'] = false;
  } else {
    $account = Users::findOne('username', $form_data['username']);
    if (!$account) {
      $response['msg'] = "User not found";
      $response['status'] = false;
    } else {
      $account->email = $form_data['email'];
      $account->gender = $form_data['gender'];
      if ($form_data['password']) {
        $account->setPassword($form_data['password']);
      }
      $updated = $account->save();
      if (!$updated) {
        $response['msg'] = "Failed to update account";
        $response['status'] = false;
      } else {
        $response['msg'] = "Student Account updated successfully";
      }
    }
  }
  return $response;
}


//for validate the login form
function validateLoginForm($form_data)
{
  $response = [];
  $response['status'] = true;
  $blank = false;

  if (!$form_data['password']) {
    $response['msg'] = "Please enter your password";
    $response['status'] = false;
    $response['field'] = 'password';
    $blank = true;
  }

  if (!$form_data['studentid']) {
    $response['msg'] = "Please enter your Student ID";
    $response['status'] = false;
    $response['field'] = 'studentid';
    $blank = true;
  }
  $isactive = checkUserActive($form_data);
  if (!$blank && !$isactive['status']) {
    $response['msg'] = "Login Failed. Account is deactivated";
    $response['status'] = false;
    $response['field'] = 'checkuser';
  } else {
    $checked = checkUser($form_data);
    if (!$blank && !$checked['status']) {
      $response['msg'] = "Login Failed. Please try again :(";
      $response['status'] = false;
      $response['field'] = 'checkuser';
    } else {
      $response['user'] = $checked;
    }
  }

  return $response;
}

//for checking the user
function checkUser($login_data)
{
  $user = Users::findOne("username", $login_data['studentid']);
  $data = ['status' => false];
  if ($user && $user->checkPassword($login_data['password'])) {
    $data = $user->toArray();
    $data['status'] = true;
    unset($data['password']);
  }

  return $data;
}

function checkUserActive($login_data)
{
  $user = Users::findOne("username", $login_data['studentid']);
  $data = ['status' => false];
  if ($user && $user->status) {
    $data = $user->toArray();
    $data['status'] = true;
  }

  return $data;
}

function generateUniqueFileName(string $fileFieldName, ?string $prevFileName = null)
{
  $imageFileType = !$prevFileName ? "" : "." . strtolower(pathinfo($_FILES[$fileFieldName]['name'], PATHINFO_EXTENSION));
  $uniqueId = bin2hex(random_bytes(16)); // 32 characters long
  return "{$uniqueId}{$imageFileType}"; // Append original file extension
}

/**
 * Uploads a photo file and returns the result.
 *
 * @param string $photoFileFieldName The name of the file input field for the photo.
 * @return array An array containing the uploaded file path and a message.
 *               If the upload fails, the file path will be null and the message will explain the error.
 *               Otherwise the uploaded file path will be returned and the message will be displayed.
 */
function uploadPhoto(string $photoFileFieldName): array
{
  // Define the directory to store uploaded files
  $targetDir = import("assets/public/images/profile");
  // Create the directory if it doesn't exist
  if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
  }

  // Handle file upload
  // create a objectid urlsafe random name for the targetFileName
  $targetFileName = generateUniqueFileName($photoFileFieldName, $_FILES[$photoFileFieldName]['name']);
  $targetFile = implode(DIRECTORY_SEPARATOR, [$targetDir, $targetFileName]);
  $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  // Check if the file is a real image
  $check = getimagesize($_FILES[$photoFileFieldName]['tmp_name']);
  if (!$check) {
    return [null, "File is not an image."];
  }

  // Check if file already exists
  if (file_exists($targetFile)) {
    return [null, "File already exists."];
  }

  // Check file size (5MB limit)
  if ($_FILES[$photoFileFieldName]['size'] > 5000000) {
    return [null, "Your file is too large."];
  }

  // Allow certain file formats
  if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
    return [null, "Only JPG, JPEG, PNG & GIF files are allowed."];
  }

  // Attempt to upload the file
  if (move_uploaded_file($_FILES[$photoFileFieldName]['tmp_name'], $targetFile)) {
    return ["/images/profile/{$targetFileName}", "Uploaded file successfully."];
  }
  return [null, "There was an error uploading your file."];
}


/**
 * Uploads a photo file and returns the result.
 *
 * @param string $photoFileFieldName The name of the file input field for the photo.
 * @return array An array containing the uploaded file path and a message.
 *               If the upload fails, the file path will be null and the message will explain the error.
 *               Otherwise the uploaded file path will be returned and the message will be displayed.
 */
function uploadDocumentPhoto(string $photoFileFieldName): array
{
  // Define the directory to store uploaded files
  $targetDir = import("assets/public/images/documents");
  // Create the directory if it doesn't exist
  if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
  }

  // Handle file upload
  // create a objectid urlsafe random name for the targetFileName
  $targetFileName = generateUniqueFileName($photoFileFieldName, $_FILES[$photoFileFieldName]['name']);
  $targetFile = implode(DIRECTORY_SEPARATOR, [$targetDir, $targetFileName]);
  $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  // Check if the file is a real image
  $check = getimagesize($_FILES[$photoFileFieldName]['tmp_name']);
  if (!$check) {
    return [null, "File is not an image."];
  }

  // Check if file already exists
  if (file_exists($targetFile)) {
    return [null, "File already exists."];
  }

  // Check file size (5MB limit)
  if ($_FILES[$photoFileFieldName]['size'] > 5000000) {
    return [null, "Your file is too large."];
  }

  // Allow certain file formats
  if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
    return [null, "Only JPG, JPEG, PNG & GIF files are allowed."];
  }

  // Attempt to upload the file
  if (move_uploaded_file($_FILES[$photoFileFieldName]['tmp_name'], $targetFile)) {
    return ["/images/documents/{$targetFileName}", "Uploaded file successfully."];
  }
  return [null, "There was an error uploading your file."];
}


// remove uploaded file from path
function removeUploadedFile($filePath)
{
  if (file_exists(import("assets/public{$filePath}"))) {
    unlink($filePath);
  }
}

//
function createStudentProfile($form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    if (!$form_data['school_year']) {
      throw new Exception("No school year specified");
    } else if (!$form_data['education']) {
      throw new Exception("Please fill in all fields");
    }

    $sYear = Schoolyear::findOne('year', $form_data['school_year']);
    if (!$sYear) {
      throw new Exception("Invalid school year");
    } else {
      $response['syid'] = $sYear->getId();
      $response['sy'] = $sYear->getYear();
      $statusId = $form_data['profile_status_id'] ?? null;
      $educType = $form_data['educ_type'] ?? null;
      if ($statusId && $educType) {
        $st = match ($educType) {
          "basic" => BasicStatus::findOne('id', $statusId),
          "college" => CollegeStatus::findOne('id', $statusId),
          default => null
        };
        $studentEducProfileTable = $st ? match ($educType) {
          "basic" => StudentBasic::findOne('id', $st->getBasicId()),
          "college" => StudentCollege::findOne('id', $st->getCollegeId()),
          default => null
        } : null;
        $sp = $studentEducProfileTable ? StudentProfile::findOne(
          'id',
          $studentEducProfileTable->getStudentProfileId()
        ) : new StudentProfile();
      } else {
        $sp = new StudentProfile();
      }
      [$uploaded_profile_photo_pathname, $msg] = ($statusId && $educType) && !isset($_FILES['profile_pic']) ? [$sp->getProfilePic(), null] : uploadPhoto('profile_pic');
      if (!$uploaded_profile_photo_pathname) {
        throw new Exception($msg);
      } else {
        $sp->profile_pic = $uploaded_profile_photo_pathname;
        $sp->middle_name = $form_data['middle_name'];
        $sp->suffix_name = $form_data['suffix_name'];
        $sp->age = intval($form_data['age']);
        $sp->bloodtype = $form_data['bloodtype'];
        $sp->height = floatval($form_data['height']);
        $sp->weight = floatval($form_data['weight']);
        $sp->civil_status = $form_data['civil_status'];
        $sp->citizenship = $form_data['citizenship'];
        $sp->address = $form_data['address'];
        $sp->birthdate = $form_data['birthdate'];
        $sp->contact = $form_data['contact'];
        $sp->religion = $form_data['religion'];
        $sp->emergency_name = $form_data['emergency_name'];
        $sp->emergency_relationship = $form_data['emergency_relationship'];
        $sp->emergency_contact = $form_data['emergency_contact'];
        $sp->father_last_name = $form_data['father_last_name'];
        $sp->father_first_name = $form_data['father_first_name'];
        $sp->father_middle_name = $form_data['father_middle_name'];
        $sp->father_contact = $form_data['father_contact'];
        $sp->father_occupation = $form_data['father_occupation'];
        $sp->father_employee_type = $form_data['father_employee_type'];
        $sp->father_education_attainment = $form_data['father_education_attainment'];
        $sp->mother_last_name = $form_data['mother_last_name'];
        $sp->mother_first_name = $form_data['mother_first_name'];
        $sp->mother_middle_name = $form_data['mother_middle_name'];
        $sp->mother_contact = $form_data['mother_contact'];
        $sp->mother_occupation = $form_data['mother_occupation'];
        $sp->mother_employee_type = $form_data['mother_employee_type'];
        $sp->mother_education_attainment = $form_data['mother_education_attainment'];
        $sp->parent_address = $form_data['parent_address'];
        $sp->parent_marital_status = $form_data['parent_marital_status'];
        $sp->doctoral = $form_data['doctoral'];
        $sp->doctoral_graduated = $form_data['doctoral_graduated'];
        $sp->doctoral_honors = $form_data['doctoral_honors'];
        $sp->doctoral_program = $form_data['doctoral_program'];
        $sp->masteral = $form_data['masteral'];
        $sp->masteral_graduated = $form_data['masteral_graduated'];
        $sp->masteral_honors = $form_data['masteral_honors'];
        $sp->masteral_program = $form_data['masteral_program'];
        $sp->college = $form_data['college'];
        $sp->college_graduated = $form_data['college_graduated'];
        $sp->college_honors = $form_data['college_honors'];
        $sp->college_program = $form_data['college_program'];
        $sp->techvoc = $form_data['techvoc'];
        $sp->techvoc_graduated = $form_data['techvoc_graduated'];
        $sp->techvoc_honors = $form_data['techvoc_honors'];
        $sp->highschool = $form_data['highschool'];
        $sp->highschool_graduated = $form_data['highschool_graduated'];
        $sp->highschool_honors = $form_data['highschool_honors'];
        $sp->als = $form_data['als'];
        $sp->als_graduated = $form_data['als_graduated'];
        $sp->als_honors = $form_data['als_honors'];
        $sp->elementary = $form_data['elementary'];
        $sp->elementary_graduated = $form_data['elementary_graduated'];
        $sp->elementary_honors = $form_data['elementary_honors'];
        $sp->support = $form_data['support'];
        $sp->number_of_siblings = intval($form_data['number_of_siblings']);
        $sp->setSiblings(intval($form_data['number_of_siblings']) > 0 ? [...$form_data['siblings']] : []);
        $sp->home_persons_living = intval($form_data['home_persons_living']);
        $sp->home_children = intval($form_data['home_children']);
        $sp->homelife = $form_data['homelife'];
        $sp->workathome = $form_data['workathome'];
        $sp->work = $form_data['work'];
        $sp->discipline_type = $form_data['discipline_type'];
        $sp->discipline_handle = $form_data['discipline_handle'];
        $sp->sleep_time = $form_data['sleep_time'];
        $sp->have_friends = $form_data['have_friends'];
        $sp->why_friend = $form_data['why_friend'];
        $sp->hobbies = $form_data['hobbies'];
        $sp->enjoy = $form_data['enjoy'];
        $sp->organization_out_of_school = $form_data['organization_out_of_school'];
        $sp->setHealthHistory((!$form_data['health_history'] || count($form_data['health_history']) === 0) ? [] : [...$form_data['health_history']]);
        $sp->health_exhibit_mannerisms = $form_data['health_exhibit_mannerisms'];
        $sp->health_past_operations = $form_data['health_past_operations'];
        $sp->health_allergies = $form_data['health_allergies'];
        $sp->indigenous_group = $form_data['indigenous_group'];
        $sp->indigenous_group_specify = $form_data['indigenous_group_specify'];
        $sp->differently_abled = $form_data['differently_abled'];
        $sp->differently_abled_specify = $form_data['differently_abled_specify'];
        $sp->solo_parent = $form_data['solo_parent'];
        $sp->solo_parent_specify = $form_data['solo_parent_specify'];
        $student_profile_id = $sp->save();
        if (!$student_profile_id) {
          throw new Error("Failed to save student profile. Please try again. Student Profile not saved.");
        } else {
          $studentProfile = match ($form_data['education']) {
            "basic" => is_bool($student_profile_id) ? $studentEducProfileTable : new StudentBasic(),
            "college" => is_bool($student_profile_id) ? $studentEducProfileTable : new StudentCollege(),
            default => null,
          };
          if (!$studentProfile) {
            throw new Error("Invalid education level");
          } else {
            $profileFields = match ($form_data['education']) {
              "basic" => [
                "user_id" => AUTHUSER->getId(),
                "schoolyear_id" => $sYear->getId(),
                "student_profile_id" => is_bool($student_profile_id) ? $sp->getId() : $student_profile_id,
                "gradelevel" => intval($form_data['grade_level']),
                "section" => $form_data['section'],
                "adviser" => $form_data['adviser'],
              ],
              "college" => [
                "user_id" => AUTHUSER->getId(),
                "schoolyear_id" => $sYear->getId(),
                "student_profile_id" => is_bool($student_profile_id) ? $sp->getId() : $student_profile_id,
                "department" => $form_data['department'],
                "yearlevel" => intval($form_data['year_level']),
                "course" => $form_data['course'],
                "semester" => $form_data['semester'],
                "dean" => $form_data['dean'],
              ],
              default => [],
            };
            foreach ($profileFields as $key => $value) {
              $studentProfile->{$key} = $value;
            }
            $studentProfileId = $studentProfile->save();
            if (!$studentProfileId) {
              throw new Error("Failed to save student profile [2]. Please try again. Student Profile [2] not saved.");
            } else {
              $statusFields = match ($form_data['education']) {
                "basic" => [
                  "basic_id" => is_bool($studentProfileId) ? $studentProfile->getId() : $studentProfileId,
                ],
                "college" => [
                  "college_id" => is_bool($studentProfileId) ? $studentProfile->getId() : $studentProfileId,
                ],
                default => []
              };
              $statusTable = match ($form_data['education']) {
                "basic" => new BasicStatus(),
                "college" => new CollegeStatus(),
                default => null
              };
              foreach ($statusFields as $key => $value) {
                $statusTable->{$key} = $value;
              }
              $statusCreatedId = $statusTable->save();
              if (!$statusCreatedId) {
                throw new Error("Failed to save student profile status. Please try again.");
              }
              $u = Users::findOne('id', AUTHUSER->getId());
              if ($u) {
                $u->profile_pic = $uploaded_profile_photo_pathname;
                $u->save();
                $response['id'] = $u->getId();
              }
            }
          }
        }
      }
    }
    Database::getInstance()->getPDO()->commit();
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    $response['field'] = "alert";
    if (isset($uploaded_profile_photo_pathname) && $uploaded_profile_photo_pathname) {
      removeUploadedFile($uploaded_profile_photo_pathname);
    }
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }

  return $response;
}

//
function addUpdateAssessmentForm(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $data = $form_data["data"];
    $sy = $form_data["sy"];
    if (!is_array($data)) {
      throw new Exception("Invalid data");
    }
    $saved = [];
    foreach ($data as $assessmentform) {
      $assessment = AssessmentForm::findOne('id', $assessmentform["id"]);
      if ($assessment) {
        $assessment->category_name = $assessmentform["category_name"];
        $assessment->items = $assessmentform["items"];
        if ($assessment->save()) {
          $saved[] = $assessment->getId();
        } else {
          throw new Exception("Could not save assessment");
        }
      } else {
        $assessment = new AssessmentForm();
        $assessment->schoolyear_id = $sy;
        $assessment->category_name = $assessmentform["category_name"];
        $assessment->items = $assessmentform["items"];
        $savedId = $assessment->save();
        if ($savedId) {
          $saved[] = $savedId;
        } else {
          throw new Exception("Could not create assessment. RETURNED: " . $savedId);
        }
      }
    }
    Database::getInstance()->getPDO()->commit();
    $allAssessmentFormInSY = AssessmentForm::findMany('schoolyear_id', $sy);
    foreach ($allAssessmentFormInSY as $af) {
      if (!in_array($af->getId(), $saved)) {
        $af->delete();
      }
    }
    $response['msg'] = "Assessment Forms updated successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function openAssessmentForm(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $sy = $form_data["sy"];
    if (!$sy) {
      throw new Exception("Invalid data");
    }
    $syTable = Schoolyear::findOne('id', $sy);
    if (!$syTable) {
      throw new Exception("School year is not open");
    }
    $syTable->editable = false;
    if (!$syTable->save()) {
      throw new Exception("Failed to open assessment form");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Successfuly Opened Assessment form to all students.";
    $response['syid'] = $syTable->getId();
    $response['sy'] = $syTable->getYear();
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function approveProfile(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $id = $form_data["id"];
    $educ = $form_data["education"];
    if (!$id || !$educ) {
      throw new Exception("Invalid data");
    }
    $profileStatus = match ($educ) {
      "basic" => BasicStatus::findOne('id', $id),
      "college" => CollegeStatus::findOne('id', $id),
      default => null
    };
    if (!$profileStatus) {
      throw new Exception("Invalid profile");
    }
    $profileStatus->status = "completed";
    if (!$profileStatus->save()) {
      throw new Exception("Failed to update profile status");
    }
    $student = match ($educ) {
      "basic" => StudentBasic::findOne('id', $profileStatus->getBasicId()),
      "college" => StudentCollege::findOne('id', $profileStatus->getCollegeId()),
      default => null
    };
    if ($student) {
      $sYear = Schoolyear::findOne('id', $student->getSchoolyearId());
      $response['syid'] = $sYear?->getId();
      $response['sy'] = $sYear?->getYear();
      $response['id'] = $student->getUserId();
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Student Profile Completed.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function rejectProfile(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $id = $form_data["id"];
    $educ = $form_data["education"];
    $reason = $form_data["reason"];
    if (!$id || !$educ) {
      throw new Exception("Invalid data");
    }
    $profileStatus = match ($educ) {
      "basic" => BasicStatus::findOne('id', $id),
      "college" => CollegeStatus::findOne('id', $id),
      default => null
    };
    if (!$profileStatus) {
      throw new Exception("Invalid profile");
    }
    $profileStatus->status = "rejected";
    $profileStatus->reason = $reason;
    if (!$profileStatus->save()) {
      throw new Exception("Failed to update profile status");
    }
    $student = match ($educ) {
      "basic" => StudentBasic::findOne('id', $profileStatus->getBasicId()),
      "college" => StudentCollege::findOne('id', $profileStatus->getCollegeId()),
      default => null
    };
    if ($student) {
      $sYear = Schoolyear::findOne('id', $student->getSchoolyearId());
      $response['syid'] = $sYear?->getId();
      $response['sy'] = $sYear?->getYear();
      $response['id'] = $student->getUserId();
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Student Profile Rejected.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function scheduleCalledSlip(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $stid = $form_data["student_id"];
    $gid = AUTHUSER->getRole() === "admin" ? AUTHUSER->getId() : null;
    $syid = $form_data["sy"];
    $sdate = $form_data["scheduled_date"];
    $stime = $form_data["scheduled_time"];
    if (!$gid || !$stid || !$syid || !$sdate || !$stime) {
      throw new Exception("Invalid data");
    }
    $student = Users::findOne('id', $stid);
    if (!$student) {
      throw new Exception("Invalid student");
    }
    $sy = Schoolyear::findOne('id', $syid);
    if (!$sy) {
      throw new Exception("Invalid school year");
    }
    $calledslip = new CalledInSlip();
    $calledslip->user_id = $student->getId();
    $calledslip->guidance_id = $gid;
    $calledslip->schoolyear_id = $sy->getId();
    $calledslip->scheduled_date = $sdate;
    $calledslip->scheduled_time = $stime;
    $csid = $calledslip->save();
    if (!$csid) {
      throw new Exception("Failed to schedule called slip");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Called slip scheduled successfully.";
    $response['id'] = $student->getId();
    debug_write("ID: " . $student->getId());
    $response['syid'] = $sy->getId();
    $response['sy'] = $sy->getYear();
    $cs = CalledInSlip::findOne('id', $csid);
    $sched = $cs->getSchedule()?->format("F j, Y \@ h:i a");
    $response['schedule'] = $sched;
    $response['guidance'] = AUTHUSER->getFirstName() . " " . (AUTHUSER->getMiddleInitial() ? AUTHUSER->getMiddleInitial() . ". " : "") . AUTHUSER->getLastName();
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function createCaseNote(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $stid = $form_data["student_id"];
    $gid = $form_data['guidance_id'];
    $syid = $form_data["sy"];
    $cisid = $form_data["called_in_slip"] ?? null;
    $itype = $form_data["interaction_type"];
    $details = $form_data["details"] ?? "";
    $infoby = $form_data["information_by_counselor"] ?? "";
    $clidec = $form_data["client_decision"] ?? "";
    $behavob = $form_data["behavioral_observation"] ?? "";
    $aggrementFormId = $form_data["agreement_form_id"] ?? null;
    $referralFormId = $form_data["referral_form_id"] ?? null;
    if (
      !$gid || !$stid || !$syid || !$itype || !$details ||
      !$infoby || !$clidec
    ) {
      throw new Exception("Invalid data");
    }
    $sy = Schoolyear::findOne('year', $syid);
    if (!$sy) {
      throw new Exception("Invalid school year");
    }
    $student = Users::findOne('id', $stid);
    if (!$student) {
      throw new Exception("Invalid student");
    }
    $guidance = Users::findOne('id', $gid);
    if (!$guidance) {
      throw new Exception("Invalid counselor");
    }
    $casenote = new CaseNote();
    $casenote->user_id = $student->getId();
    $casenote->guidance_id = $gid;
    $casenote->schoolyear_id = $sy->getId();
    $casenote->called_slip_id = is_null($cisid) ? null : (empty($cisid) ? null : intval($cisid));
    $casenote->interaction_type = $itype;
    $casenote->details = $details;
    $casenote->information_by_counselor = $infoby;
    $casenote->client_decision = $clidec;
    $casenote->behavioral_observation = $behavob;
    $cnid = $casenote->save();
    if (!$cnid) {
      throw new Exception("Failed to create case note");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Case note created successfully.";
    if ($aggrementFormId) {
      $agreementForm = AgreementForm::findOne('id', $aggrementFormId);
      if ($agreementForm) {
        $agreementForm->case_note_id = $cnid;
        $agreementForm->save();
      }
    }
    if ($referralFormId) {
      $referralForm = ReferralForm::findOne('id', $referralFormId);
      if ($referralForm) {
        $referralForm->case_note_id = $cnid;
        $referralForm->save();
      }
    }
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function createAgreementForm(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $stid = $form_data["student_id"];
    $gid = $form_data['guidance_id'];
    $syid = $form_data["sy"];
    $caseNoteId = $form_data["case_note_id"] ?? null;
    $calledSlipId = $form_data["called_slip_id"] ?? null;
    if (!$gid || !$stid || !$syid) {
      throw new Exception("Invalid data");
    }
    $sy = Schoolyear::findOne('year', $syid);
    if (!$sy) {
      throw new Exception("Invalid school year");
    }
    $student = Users::findOne('id', $stid);
    if (!$student) {
      throw new Exception("Invalid student");
    }
    $guidance = Users::findOne('id', $gid);
    if (!$guidance) {
      throw new Exception("Invalid counselor");
    }
    [$imgUploaded, $msg] = uploadDocumentPhoto("agreement_pic");
    if (!$imgUploaded) {
      throw new Exception($msg);
    }
    $agreementForm = new AgreementForm();
    $agreementForm->user_id = $student->getId();
    $agreementForm->guidance_id = $gid;
    $agreementForm->schoolyear_id = $sy->getId();
    $agreementForm->case_note_id = is_null($caseNoteId) ? null : (empty($caseNoteId) ? null : intval($caseNoteId));
    $agreementForm->called_slip_id = is_null($calledSlipId) ? null : (empty($calledSlipId) ? null : intval($calledSlipId));
    $agreementForm->agreement_pic = $imgUploaded;
    $agf = $agreementForm->save();
    if (!$agf) {
      throw new Exception("Failed to create agreement form");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Agreement form created successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    if (isset($imgUploaded) && $imgUploaded) {
      removeUploadedFile($imgUploaded);
    }
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}


//
function createDocumentation(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $stid = $form_data["student_id"];
    $gid = $form_data['guidance_id'];
    $syid = $form_data["sy"];
    $caseNoteId = $form_data["case_note_id"] ?? null;
    $calledSlipId = $form_data["called_slip_id"] ?? null;
    if (!$gid || !$stid || !$syid) {
      throw new Exception("Invalid data");
    }
    $sy = Schoolyear::findOne('year', $syid);
    if (!$sy) {
      throw new Exception("Invalid school year");
    }
    $student = Users::findOne('id', $stid);
    if (!$student) {
      throw new Exception("Invalid student");
    }
    $guidance = Users::findOne('id', $gid);
    if (!$guidance) {
      throw new Exception("Invalid counselor");
    }
    [$imgUploadedA, $msgA] = uploadDocumentPhoto("referral_a");
    [$imgUploadedB, $msgB] = uploadDocumentPhoto("referral_b");
    if (!$imgUploadedA || !$imgUploadedB) {
      throw new Exception($msgA ?? $msgB);
    }
    $referralForm = new ReferralForm();
    $referralForm->user_id = $student->getId();
    $referralForm->guidance_id = $gid;
    $referralForm->schoolyear_id = $sy->getId();
    $referralForm->case_note_id = is_null($caseNoteId) ? null : (empty($caseNoteId) ? null : intval($caseNoteId));
    $referralForm->called_slip_id = is_null($calledSlipId) ? null : (empty($calledSlipId) ? null : intval($calledSlipId));
    $referralForm->referral_a = $imgUploadedA;
    $referralForm->referral_b = $imgUploadedB;
    $agf = $referralForm->save();
    if (!$agf) {
      throw new Exception("Failed to upload documentation");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Documentation uploaded successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    if (isset($imgUploadedA) && $imgUploadedA) {
      removeUploadedFile($imgUploadedA);
    }
    if (isset($imgUploadedB) && $imgUploadedB) {
      removeUploadedFile($imgUploadedB);
    }
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

// send email notification
function sendNotification(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $stid = $form_data["student_id"];
    $subject = $form_data['subject'];
    $body = $form_data['body'];
    $syid = $form_data["syid"];
    $title = $form_data['title'];
    $message = $form_data['message'];
    $href = $form_data['href'];
    if (!$stid || !$subject || !$body) {
      throw new Exception("Invalid data");
    }
    $student = Users::findOne('id', $stid);
    if (!$student) {
      throw new Exception("Invalid student");
    }
    if (!sendEmail($student->getEmail(), $subject, $body)) {
      throw new Exception("Failed to send notification");
    }
    if (!!$syid && !!$title && !!$message && !!$href) {
      $sy = Schoolyear::findOne('id', $syid);
      if (!$sy) {
        throw new Exception("Invalid school year");
      }
      $notification = new Notification();
      $notification->user_id = $student->getId();
      $notification->title = $title;
      $notification->message = $message;
      $notification->href = $href;
      $notification->is_read = false;
      $notification->save();
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Notification sent successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}


// broadcast email notification
function broadcastNotification(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $syid = $form_data["syid"];
    $subject = $form_data['subject'];
    $body = $form_data['body'];
    $title = $form_data['title'];
    $message = $form_data['message'];
    $href = $form_data['href'];
    if (!$syid || empty($subject) || empty($message)) {
      throw new Exception("Invalid data");
    }
    $sy = Schoolyear::findOne('id', $syid);
    if (!$sy) {
      throw new Exception("Invalid school year");
    }
    $studs = Users::findMany('role', 'student');
    $countSent = 0;
    foreach ($studs as $student) {
      $notification = new Notification();
      $notification->user_id = $student->getId();
      $notification->title = $title;
      $notification->message = $message;
      $notification->href = $href;
      $notification->is_read = false;
      if (!sendEmail($student->getEmail(), $subject, $body)) {
        throw new Exception("Failed to send notification");
      }
      if ($notification->save()) {
        $countSent++;
      }
    }
    $response['sent'] = $countSent;
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Notification sent successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function changeProfile(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $uid = $form_data['id'];
    $role = $form_data['role'];
    $gender = $form_data['gender'];
    $roles = ['student', 'admin', 'superadmin'];
    if (!$uid || !$gender || !in_array($role, $roles)) {
      throw new Exception("Invalid data");
    }
    $user = Users::findOne('id', $uid);
    if (!$user) {
      throw new Exception("Invalid user");
    }
    $user->gender = $gender;
    if ($role !== 'student') {
      $user->first_name = $form_data['first_name'];
      $user->middle_initial = $form_data['middle_initial'];
      $user->last_name = $form_data['last_name'];
      $user->email = $form_data['email'];
    }
    if (!$user->save()) {
      throw new Exception("Failed to update profile");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Profile updated successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function changePassword(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $uid = $form_data['id'];
    $oldPassword = $form_data['oldPassword'];
    $newPassword = $form_data['newPassword'];
    $confirmPassword = $form_data['confirmPassword'];
    if (!$uid || !$oldPassword || !$newPassword || !$confirmPassword) {
      throw new Exception("Invalid data");
    }
    $user = Users::findOne('id', $uid);
    if (!$user) {
      throw new Exception("Invalid user");
    }
    if (!password_verify($oldPassword, $user->getPassword())) {
      throw new Exception("Incorrect password");
    }
    if ($newPassword !== $confirmPassword) {
      throw new Exception("Passwords do not match");
    }
    if ($oldPassword === $newPassword) {
      throw new Exception("Old password cannot be the same as the new password");
    }
    $user->setPassword($newPassword);
    if (!$user->save()) {
      throw new Exception("Failed to change password");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Password changed successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function changePasswordForgot(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $uid = $form_data['id'];
    $otpId = $form_data['otp'];
    $newPassword = $form_data['new_password'];
    if (!$uid || !$otpId || !$newPassword) {
      throw new Exception("Invalid data");
    }
    $user = Users::findOne('id', $uid);
    if (!$user) {
      throw new Exception("Invalid Access");
    }
    $otp = OTPToken::findOne('id', $otpId);
    if (!$otp) {
      throw new Exception("Invalid Token");
    }
    if ($otp->getUserId() !== $user->getId()) {
      throw new Exception("Invalid Access Token");
    }
    if (!$otp->getOTPVerified()) {
      throw new Exception("Invalid Access Token");
    }
    $user->setPassword($newPassword);
    if (!$user->save()) {
      throw new Exception("Failed to change password");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Password changed successfully.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

function generateSecureOTP(int $length = 6)
{
  $otp = '';
  $characters = '0123456789';
  $charactersLength = strlen($characters);

  for ($i = 0; $i < $length; $i++) {
    $randomIndex = random_int(0, $charactersLength - 1);
    $otp .= $characters[$randomIndex];
  }

  return $otp;
}

function generateOTPWithExpiry(string|int $userId, int $length = 6, int $expiryTime = 5): int|bool|string
{
  $otp = generateSecureOTP($length);
  $expiry = new DateTime();
  $expiry->setTimezone(new DateTimeZone('+08:00'));
  $expiry->add(new DateInterval("PT{$expiryTime}M"));
  $otpToken = new OTPToken();
  $otpToken->user_id = $userId;
  $otpToken->otp = $otp;
  $otpToken->otp_verified = false;
  $otpToken->setOTPExpiry($expiry);
  $saved = $otpToken->save();
  return $saved;
}

function validateOTP($userInputOTP, $otpId): false|OTPToken
{
  $otpTable = OTPToken::findOne('id', $otpId);
  if ($otpTable) {
    if (time() > $otpTable->getOTPExpiry()->getTimestamp()) {
      // OTP has expired
      return false;
    }
    if ($otpTable->getOTP() == $userInputOTP) {
      // OTP is valid
      return $otpTable;
    }
  }
  return false;
}

// Forgot Password API (send to email)
function forgotPassword(array $form_data)
{
  $response = [
    "status" => true,
  ];
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $studentId = $form_data['student_id'];
    $lastName = $form_data['last_name'];
    debug_write("$studentId : " . strtoupper($lastName));
    if (!$studentId || !$lastName) {
      throw new Exception("Invalid data");
    }
    $student = Users::findOne('username', $studentId);
    if (!$student) {
      throw new Exception("Student ID not registered yet or Account Deactivated");
    }
    if (strtoupper($student->getLastName()) !== strtoupper($lastName)) {
      throw new Exception("Cannot verify student. If you have concerns, please contact the Guidance Office.");
    }
    $otpId = generateOTPWithExpiry($student->getId(), 6, 15);
    if (!$otpId) {
      throw new Exception("Failed to send OTP Code. Please Try Again Later");
    }
    Database::getInstance()->getPDO()->commit();
    $otp = OTPToken::findOne('id', $otpId);
    $response['msg'] = "OTP Code has been sent to your registered email address. Please check your inbox.";
    $response['student_id'] = $student->getId();
    $response['email'] = $student->getEmail();
    $response['otp_id'] = $otp->getId();
    $response['otp'] = $otp->getOTP();
    $response['otp_expiry'] = $otp->getOTPExpiry()->format("c");
  } catch (\Exception $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

function verifyOTP(array $form_data)
{
  $response = [
    "status" => true,
  ];
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $otpId = $form_data['id'];
    $otpInput = $form_data['otp'];
    if (!$otpId || !$otpInput) {
      throw new Exception("Invalid Access");
    }
    $otp = validateOTP($otpInput, $otpId);
    if (!$otp) {
      throw new Exception("Invalid OTP Code");
    }
    $otp->otp_verified = true;
    if (!$otp->save()) {
      throw new Exception("Failed to verify OTP Code. Please Try Again Later");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "OTP Code has been verified successfully.";
    $response['user_id'] = $otp->getUserId();
  } catch (\Exception $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function submitAssessment(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $sy = $form_data["sy"];
    $user = $form_data["user"];
    $assessmentforms = $form_data['assessmentform'];
    $responses = $form_data["response"];

    if (!$sy || !$user || !$assessmentforms || !$responses) {
      throw new Exception("Invalid data");
    }
    $schoolYear = Schoolyear::findOne('id', $sy);
    if (!$schoolYear || ($schoolYear instanceof Schoolyear && $schoolYear->isEditable()) || empty($assessmentforms)) {
      throw new Exception("Not allowed");
    }
    $response['syid'] = $schoolYear->getId();
    $response['sy'] = $schoolYear->getYear();
    $user = Users::findOne('id', $user);
    if (!$user) {
      throw new Exception("Not allowed");
    }
    foreach ($assessmentforms as $afid) {
      $af = AssessmentForm::findOne('id', $afid);
      if (!$af) {
        throw new Exception("Invalid assessment form");
      }
      $studentAssessment = Assessment::findMany('user_id', $user->getId());
      $studentAssessment = array_filter($studentAssessment, function (Assessment $sa) use ($afid) {
        return strval($sa->getAssessmentFormId()) == strval($afid);
      });
      if (count($studentAssessment) > 0) {
        throw new Exception("Student has already submitted assessment for this form");
      }
      $resp = $responses[$afid];
      $items = $af->getItems();
      $item = array_map(fn($a) => [
        "id" => $a['id'],
        "response" => $resp && in_array(strval($a['id']), array_map(fn($r) => strval($r), $resp)),
      ], $items);
      $studentAssessment = new Assessment();
      $studentAssessment->assessment_form_id = $af->getId();
      $studentAssessment->user_id = $user->getId();
      $studentAssessment->setAssessmentResponse($item);
      if (!$studentAssessment->save()) {
        throw new Exception("Failed to submit Assessment Form");
      }
      $response['id'] = $user->getId();
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Student Self-Assessment Submitted.";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function submitFeedback(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $sy = $form_data["sy"];
    $userId = $form_data["user_id"];
    $guidanceId = $form_data['guidance_id'];
    $caseNoteId = $form_data['case_note_id'];
    $ratings = $form_data['ratings'];
    $otherComments = $form_data['comments'];

    if (!$sy || !$userId || !$guidanceId || !$caseNoteId || !$ratings) {
      throw new Exception("Invalid data");
    }
    $schoolYearTable = Schoolyear::findOne('year', $sy);
    if (!$schoolYearTable) {
      throw new Exception("Invalid Data School Year");
    }
    $u = Users::findOne('id', $userId);
    $guidance = Users::findOne('id', $guidanceId);
    $caseNote = CaseNote::findOne('id', $caseNoteId);
    if (!$u || !$guidance || !$caseNote) {
      throw new Exception("Invalid Data");
    }
    $feedback = new FeedbackForm();
    $feedback->user_id = $u->getId();
    $feedback->guidance_id = $guidance->getId();
    $feedback->schoolyear_id = $schoolYearTable->getId();
    $feedback->case_note_id = $caseNote->getId();
    $feedback->setRatings($ratings);
    $feedback->comments = $otherComments;
    if (!$feedback->save()) {
      throw new Exception("Failed to submit Feedback Form");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Feedback submitted successfully";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

// read notification
function readNotification(array $form_data)
{
  $response = [];
  $response['status'] = true;
  Database::getInstance()->getPDO()->beginTransaction();
  try {
    $id = $form_data['id'];
    if (!$id) {
      throw new Exception("Invalid data");
    }
    $notification = Notification::findOne('id', $id);
    if (!$notification) {
      throw new Exception("Invalid notification");
    }
    $notification->is_read = true;
    if (!$notification->save()) {
      throw new Exception("Failed to update notification");
    }
    Database::getInstance()->getPDO()->commit();
    $response['msg'] = "Notification read successfully";
  } catch (\Throwable $e) {
    Database::getInstance()->getPDO()->rollBack();
    $response['msg'] = $e->getMessage();
    $response['status'] = false;
    debug_write("ERROR: " . $e->getMessage() . PHP_EOL . $e->getTraceAsString());
  }
  return $response;
}

//
function getPrintDataFromFormData(string $formType, array $form_data)
{
  switch ($formType) {
    case "student_profile": {
      $education = $form_data["education"];
      $id = $form_data["id"];
      $tblStatus = match ($education) {
        "basic" => BasicStatus::findOne('id', $id),
        "college" => CollegeStatus::findOne('id', $id),
        default => null
      };
      if ($tblStatus) {
        $educProfile = match ($education) {
          "basic" => StudentBasic::findOne('id', $tblStatus->getBasicId()),
          "college" => StudentCollege::findOne('id', $tblStatus->getCollegeId()),
          default => null
        };
        if ($educProfile) {
          $studentProfile = StudentProfile::findOne('id', $educProfile->getStudentProfileId());
          $userProfile = Users::findOne('id', $educProfile->getUserId());
          $schoolYear = Schoolyear::findOne('id', $educProfile->getSchoolyearId());
          return [
            "education" => $education,
            "user" => $userProfile,
            "student_profile" => $studentProfile,
            "student_education" => $educProfile,
            "school_year" => strval($schoolYear->getYear()) . " - " . ((int) ($schoolYear->getYear() + 1)),
          ];
        }
      }
      break;
    }
    case "case_notes": {
      $cnid = $form_data['id'];
      $cn = CaseNote::findOne('id', $cnid);
      $results = [];
      if ($cn) {
        $user = Users::findOne('id', $cn->getUserId());
        $results['user'] = $user;
        $guidance = Users::findOne('id', $cn->getGuidanceId());
        $schoolYear = Schoolyear::findOne('id', $cn->getSchoolyearId());
        $stud = StudentBasic::findMany('user_id', $user->getId());
        $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($schoolYear->getId()));
        if (count($stud) > 0) {
          $stud = end($stud);
          $results['student'] = $stud;
          $results['education'] = "basic";
          $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
          $results['student_profile'] = $student_profile;
          $status = BasicStatus::findMany('basic_id', $stud->getId());
          $status = count($status) > 0 ? end($status) : null;
          $results['profile_status'] = $status;
        } else {
          $stud = StudentCollege::findMany('user_id', $user->getId());
          $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($schoolYear->getId()));
          if (count($stud) > 0) {
            $stud = end($stud);
            $results['education'] = "college";
            $results['student'] = $stud;
            $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
            $results['student_profile'] = $student_profile;
            $status = CollegeStatus::findMany('college_id', $stud->getId());
            $status = count($status) > 0 ? end($status) : null;
            $results['profile_status'] = $status;
          }
        }
        $res = [
          "student" => $results,
          "guidance" => $guidance,
          "school_year" => strval($schoolYear->getYear()) . " - " . ((int) ($schoolYear->getYear() + 1)),
          "case_note" => $cn,
        ];
        return $res;
      }
      break;
    }
    case "student_feedback": {
      $fbid = $form_data['id'];
      $fb = FeedbackForm::findOne('id', $fbid);
      if ($fb) {
        return [
          "feedback" => $fb,
        ];
      }
      break;
    }
    case "student_assessment": {
      $stid = $form_data['id'];
      $st = Users::findOne('id', $stid);
      if ($st) {
        $results = [];
        $formIds = $form_data['assessments'];
        $formIds = is_string($formIds) ? [...explode("-", $formIds)] : [];
        if (count($formIds) > 0) {
          debug_write("student " . json_encode($st, JSON_PRETTY_PRINT));
          $am = Assessment::findMany('user_id', $st->getId());
          debug_write("ALL ASSESSMENTS: " . json_encode($am, JSON_PRETTY_PRINT));
          foreach ($formIds as $formId) {
            $assess = AssessmentForm::findOne('id', strval($formId));
            $fid = $assess->getId();
            $aresponses = array_filter($am, function ($a) use ($fid) {
              return $a->getAssessmentFormId() === $fid;
            });
            debug_write("ARESPONSE: " . json_encode($aresponses));
            $resp = end($aresponses);
            $results[] = [
              "form" => $assess,
              "response" => $resp,
            ];
          }
        }
        $resulting = [
          "student" => $st,
          "myAssessments" => $results,
        ];
        return $resulting;
      }
      break;
    }
    case "called_slip": {
      $csid = $form_data['id'];
      $cs = CalledInSlip::findOne('id', $csid);
      $results = [];
      if ($cs) {
        $results['called_slip'] = $cs;
        $guidance = Users::findOne('id', $cs->getGuidanceId());
        $results['guidance'] = $guidance;
        $sy = Schoolyear::findOne('id', $cs->getSchoolyearId());
        $results['sy'] = $sy;
        $st = Users::findOne('id', $cs->getUserId());
        if ($st) {
          $results['user'] = $st;
          $stud = StudentBasic::findMany('user_id', $st->getId());
          $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($sy->getId()));
          if (count($stud) > 0) {
            $stud = end($stud);
            $results['student'] = $stud;
            $results['education'] = 'basic';
            $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
            $results['student_profile'] = $student_profile;
            $status = BasicStatus::findMany('basic_id', $stud->getId());
            $status = count($status) > 0 ? end($status) : null;
            $results['profile_status'] = $status;
          } else {
            $stud = StudentCollege::findMany('user_id', $st->getId());
            $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($sy->getId()));
            if (count($stud) > 0) {
              $stud = end($stud);
              $results['student'] = $stud;
              $results['education'] = 'college';
              $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
              $results['student_profile'] = $student_profile;
              $status = CollegeStatus::findMany('college_id', $stud->getId());
              $status = count($status) > 0 ? end($status) : null;
              $results['profile_status'] = $status;
            }
          }
        }
      }
      return $results;
    }
    default:
  }
  return [];
}

//for getting userdata by id
function getUser($user_id)
{
  return Users::findOne('id', $user_id);
}

//for getting sidebar navbar links
function getSidebarLinks($role)
{
  return match ($role) {
    "student" => [
      [
        "title" => "Student",
        "children" => [
          ["label" => "Home", "href" => pathname("home"), "icon" => "bx bx-home"],
          ["label" => "Student's Profile", "href" => pathname("profile"), "icon" => "bx bx-user"],
          ["label" => "Assessment Form", "href" => pathname("assess"), "icon" => "bx bxs-check-square"],
          ["label" => "Appointments", "href" => pathname("appointments"), "icon" => "bx bx-file"],
        ],
      ],
      [
        "title" => "Profile",
        "children" => [
          ["label" => "Notification", "href" => pathname("notifications"), "icon" => "bx bxs-bell"],
          ["label" => "Settings", "href" => pathname("settings"), "icon" => "bx bx-slider"],
        ]
      ],
    ],
    "admin" => [
      [
        "title" => "Admin",
        "children" => [
          ["label" => "Dashboard", "href" => pathname("dashboard"), "icon" => "bx bxs-dashboard"],
          [
            "label" => "Junior High Profile",
            "icon" => "bx bxs-user-detail",
            "children" => [
              ["label" => "Grade 7", "href" => pathname("profile/grade7")],
              ["label" => "Grade 8", "href" => pathname("profile/grade8")],
              ["label" => "Grade 9", "href" => pathname("profile/grade9")],
              ["label" => "Grade 10", "href" => pathname("profile/grade10")],
            ]
          ],
          [
            "label" => "Senior High Profile",
            "icon" => "bx bxs-user-detail",
            "children" => [
              ["label" => "Grade 11", "href" => pathname("profile/grade11")],
              ["label" => "Grade 12", "href" => pathname("profile/grade12")],
            ]
          ],
          [
            "label" => "College Profile",
            "icon" => "bx bxs-user-detail",
            "children" => [
              ["label" => "1st Year", "href" => pathname("profile/college1")],
              ["label" => "2nd Year", "href" => pathname("profile/college2")],
              ["label" => "3rd Year", "href" => pathname("profile/college3")],
              ["label" => "4th Year", "href" => pathname("profile/college4")],
            ]
          ],
          ["label" => "No Profiles", "href" => pathname("profile/no-profiles"), "icon" => "bx bxs-user-detail"],
          ["label" => "Counseling Records", "href" => pathname("counseling"), "icon" => "bx bxs-file"],
          ["label" => "Assessment Form", "href" => pathname("assessment/manage"), "icon" => "bx bxs-file"],
          ["label" => "Counseling Feedbacks", "href" => pathname("feedbacks"), "icon" => "bx bxs-file"],
        ],
      ],
      [
        "title" => "Profile",
        "children" => [
          ["label" => "Settings", "href" => pathname("settings"), "icon" => "bx bx-slider"],
        ]
      ]
    ],
    "superadmin" => [
      [
        "title" => "Super Admin",
        "children" => [
          ["label" => "School Year", "href" => pathname("schoolyear"), "icon" => "bx bx-home"],
          ["label" => "Admin Accounts", "href" => pathname("accounts/admin"), "icon" => "bx bxs-user-detail"],
          // ["label" => "Student Accounts", "href" => pathname("accounts/student"), "icon" => "bx bxs-user-detail"],
        ],
      ],
      [
        "title" => "Profile",
        "children" => [
          ["label" => "Settings", "href" => pathname("settings"), "icon" => "bx bx-slider"],
        ]
      ]
    ],
    default => []
  };
}

function getAssessmentScore(string|int $sy_id, string|int $user_id): float|false
{
  $forms = AssessmentForm::findMany('schoolyear_id', $sy_id);
  $afs = Assessment::findMany('user_id', $user_id);
  if (count($forms) == 0 || count($afs) == 0) {
    return false;
  }
  $total = 0;
  $score = 0;
  foreach ($afs as $afr) {
    $total += count($afr->getAssessmentResponse());
    $score += $afr->getScore();
  }
  if ($total === 0) {
    return false;
  }
  return (float) (($score / $total) * 100);
}

function getStudentProfilesData(int $gradeyear): array
{
  $AllSY = Schoolyear::all();
  if (count($AllSY) == 0)
    return [];
  $results = [];
  if ($gradeyear > 0 && $gradeyear < 5) // college
  {
    $results = array_map(function ($sy) use ($gradeyear) {
      $profiles = StudentCollege::findMany('schoolyear_id', $sy['id']);
      $studentProfiles = array_map(function ($pfs) use ($sy) {
        return [
          'student_info' => [
            'profile' => $pfs->toArray(),
            'user' => [...(Users::findOne('id', $pfs->getUserId())?->toArray() ?? []), "password" => null],
          ],
          'student_profile' => StudentProfile::findOne('id', $pfs->getStudentProfileId())?->toArray(),
          'profile_status' => array_reduce(
            CollegeStatus::findMany('college_id', intval($pfs->getId())),
            function ($carry, $item) {
              if ($carry === null || $item->getId() > $carry->getId()) {
                return $item->toArray();
              }
              return $carry;
            },
            null
          ),
          'assessment' => [
            "assessment_forms" => AssessmentForm::findMany('schoolyear_id', $sy['id']),
            "assessment_responses" => array_filter(Assessment::findMany('user_id', $pfs->getUserId()), function (Assessment $assm) use ($sy) {
              $asstForms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
              foreach ($asstForms as $aform) {
                if (strval($aform->getId()) === strval($assm->getAssessmentFormId())) {
                  return true;
                }
              }
              return false;
            }),
            "assessment_score" => getAssessmentScore($sy['id'], $pfs->getUserId()),
          ],
          'case_notes' => 0,
          'called_slip' => 0,
          'referral_forms' => 0,
          'agreement_forms' => 0,
          'feedback_forms' => 0,
          'remarks' => '',
        ];
      }, $profiles);
      $stprofiles = array_filter($studentProfiles, fn($pfs) => intval($pfs["student_info"]["profile"]["yearlevel"] === $gradeyear));

      return [
        'sy' => $sy['year'],
        'profiles' => [...$stprofiles],
      ];
    }, $AllSY);
    // $profiles = StudentCollege::findMany('schoolyear_id', $sy['id']);
    // $studentProfiles = array_map(function($pfs) use ($sy) {
    //   return [
    //     'student_info' => [
    //       'profile' => $pfs->toArray(),
    //       'user' => [...(Users::findOne('id', $pfs->getUserId())?->toArray() ?? []), "password" => null],
    //     ],
    //     'student_profile' => StudentProfile::findOne('id', $pfs->getStudentProfileId())?->toArray(),
    //     'profile_status' => array_reduce(
    //       CollegeStatus::findMany('college_id', intval($pfs->getId())),
    //       function($carry, $item) {
    //         if ($carry === null || $item->getId() > $carry->getId()) {
    //           return $item->toArray();
    //         }
    //         return $carry;
    //       }, null),
    //     'assessment' => [
    //       "assessment_forms" => AssessmentForm::findMany('schoolyear_id', $sy['id']),
    //       "assessment_responses" => array_filter(Assessment::findMany('user_id', $pfs->getUserId()), function(Assessment $assm) use ($sy) {
    //         $asstForms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
    //         foreach ($asstForms as $aform) {
    //           if (strval($aform->getId()) === strval($assm->getAssessmentFormId())) {
    //             return true;
    //           }
    //         }
    //         return false;
    //       }),
    //       "assessment_score" => getAssessmentScore($sy['id'], $pfs->getUserId()),
    //     ],
    //     'case_notes' => 0,
    //     'called_slip' => 0,
    //     'referral_forms' => 0,
    //     'agreement_forms' => 0,
    //     'feedback_forms' => 0,
    //   'remarks' => '',
    //   ];
    // }, $profiles);
    // $results = array_filter($studentProfiles, fn($pfs) => intval($pfs["student_info"]["profile"]["yearlevel"] === $gradeyear));
  } else if ($gradeyear > 6 && $gradeyear < 13) // basic education
  {
    $results = array_map(function ($sy) use ($gradeyear) {
      $profiles = StudentBasic::findMany('schoolyear_id', $sy['id']);
      $studentProfiles = array_map(fn($pfs) => [
        'student_info' => [
          'profile' => $pfs->toArray(),
          'user' => [...(Users::findOne('id', $pfs->getUserId())?->toArray() ?? []), "password" => null],
        ],
        'student_profile' => StudentProfile::findOne('id', $pfs->getStudentProfileId())?->toArray(),
        'profile_status' => array_reduce(
          BasicStatus::findMany('basic_id', $pfs->getId()),
          function ($carry, BasicStatus $bs): mixed {
            if (!$carry || ($carry && ($bs->getId() > $carry["id"]))) {
              return $bs->toArray();
            }
            return $carry;
          },
          null
        ),
        'assessment' => [
          "assessment_forms" => AssessmentForm::findMany('schoolyear_id', $sy['id']),
          "assessment_responses" => array_filter(Assessment::findMany('user_id', $pfs->getUserId()), function (Assessment $assm) use ($sy) {
            $asstForms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
            foreach ($asstForms as $aform) {
              if (strval($aform->getId()) === strval($assm->getAssessmentFormId())) {
                return true;
              }
            }
            return false;
          }),
          "assessment_score" => getAssessmentScore($sy['id'], $pfs->getUserId()),
        ],
        'case_notes' => 0,
        'called_slip' => 0,
        'referral_forms' => 0,
        'agreement_forms' => 0,
        'feedback_forms' => 0,
        'remarks' => '',
      ], $profiles);
      $stprofiles = array_filter($studentProfiles, fn($pfs) => intval($pfs["student_info"]["profile"]["gradelevel"] === $gradeyear));
      return [
        'sy' => $sy['year'],
        'profiles' => [...$stprofiles],
      ];
    }, $AllSY);
    // $profiles = StudentBasic::findMany('schoolyear_id', $sy['id']);
    // $studentProfiles = array_map(fn($pfs) => [
    //   'student_info' => [
    //     'profile' => $pfs->toArray(),
    //     'user' => [...(Users::findOne('id', $pfs->getUserId())?->toArray() ?? []), "password" => null],
    //   ],
    //   'student_profile' => StudentProfile::findOne('id', $pfs->getStudentProfileId())?->toArray(),
    //   'profile_status' => array_reduce(
    //     BasicStatus::findMany('basic_id', $pfs->getId()),
    //     function($carry, BasicStatus $bs): mixed {
    //       if (!$carry || ($carry && ($bs->getId() > $carry["id"]))) {
    //         return $bs->toArray();
    //       }
    //       return $carry;
    //   }, null),
    //   'assessment' => [
    //     "assessment_forms" => AssessmentForm::findMany('schoolyear_id', $sy['id']),
    //     "assessment_responses" => array_filter(Assessment::findMany('user_id', $pfs->getUserId()), function(Assessment $assm) use ($sy) {
    //         $asstForms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
    //         foreach ($asstForms as $aform) {
    //           if (strval($aform->getId()) === strval($assm->getAssessmentFormId())) {
    //             return true;
    //           }
    //         }
    //         return false;
    //       }),
    //     "assessment_score" => getAssessmentScore($sy['id'], $pfs->getUserId()),
    //   ],
    //   'case_notes' => 0,
    //   'called_slip' => 0,
    //   'referral_forms' => 0,
    //   'agreement_forms' => 0,
    //   'feedback_forms' => 0,
    //   'remarks' => '',
    // ], $profiles);
    // $results = array_filter($studentProfiles, fn($pfs) => intval($pfs["student_info"]["profile"]["gradelevel"] === $gradeyear));
  }
  return ["all_profiles" => [...$results], "gradeyear" => $gradeyear, "school_years" => $AllSY];
  // return ["profiles" => [...$results], "gradeyear" => $gradeyear, "sy" => intval($sy["year"]), "syid" => $sy['id'], 'assessment_open' => !$sy['editable']];
}

function getNoProfilesSubmittedData(): array
{
  $AllSY = Schoolyear::all();
  if (count($AllSY) == 0)
    return [];
  $allData = array_map(function ($schoolYear) {
    $sy = Schoolyear::findOne('id', strval($schoolYear['id']));
    $allStudentUsers = Users::findMany('role', 'student');
    $usersNoProfilesSubmitted = array_filter($allStudentUsers, function ($user) use ($sy) {
      $studA = StudentBasic::findMany('user_id', $user->getId());
      $studB = StudentCollege::findMany('user_id', $user->getId());
      $sb = array_filter($studA, fn($sbv) => strval($sbv->getSchoolyearId()) == strval($sy->getId()));
      $sc = array_filter($studB, fn($sbv) => strval($sbv->getSchoolyearId()) == strval($sy->getId()));
      return empty($sb) && empty($sc);
    });
    $results = array_map(fn($npfs) => [...$npfs->toArray(), "password" => null], $usersNoProfilesSubmitted);
    return ["notsubmitted" => [...$results], "sy" => $sy->getYear()];
  }, $AllSY);
  return [
    "all_data" => [...$allData],
    "school_years" => $AllSY,
  ];
}

function getInteractionTypes(): array
{
  return [
    'Individual',
    'Group',
    'Called-in',
    'Walked-in',
    'Referred',
    'Follow-up',
  ];
}

function getCounselingRecordsData(): array
{
  $AllSY = Schoolyear::all();
  if (count($AllSY) == 0)
    return [];
  /*
  { school_years, all_data, guidance }
  */
  $allData = array_map(function ($sy) {
    $calledIn = CalledInSlip::findMany('schoolyear_id', $sy['id']);
    $caseNotes = CaseNote::findMany('schoolyear_id', $sy['id']);
    $walkedInOnlyCaseNotes = array_filter($caseNotes, fn(CaseNote $cn) => $cn->getInteractionType() === 'Walked-in');
    $walkedInIds = array_map(fn($wid) => $wid->getCalledSlipId(), $walkedInOnlyCaseNotes);
    $calledIn = array_filter($calledIn, callback: fn(CalledInSlip $cn) => !in_array($cn->getId(), $walkedInIds));
    $total = count($calledIn) + count($walkedInOnlyCaseNotes);
    $calledInResults = [];
    $walkedInResults = [];
    for ($i = 0; $i < $total; $i++) {
      $result = [];
      if ($i < count($calledIn)) {
        // called in slips
        $cn = $calledIn[$i];
        if ($cn instanceof CalledInSlip) {
          $result['id'] = $cn->getId();
          $result['schedule'] = $cn->getSchedule()?->format("c");
          $st = Users::findOne('id', $cn->getUserId());
          $result['user'] = $st->toArray();
          $gd = Users::findOne('id', $cn->getGuidanceId());
          $result['guidance'] = $gd->toArray();
          $stud = StudentBasic::findMany('user_id', $st->getId());
          $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($sy['id']));
          if (count($stud) > 0) {
            $stud = end($stud);
            $result['student'] = $stud->toArray();
            $result['education'] = 'basic';
            $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
            $result['student_profile'] = $student_profile;
            $status = BasicStatus::findMany('basic_id', $stud->getId());
            $status = count($status) > 0 ? end($status) : null;
            $result['profile_status'] = $status?->toArray();
            $aforms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
            $assessments = Assessment::findMany('user_id', $stud->getUserId());
            $assessments = array_map(fn($a) => $a->toArray(), $assessments);
            $result["assessment"] = [
              "assessment_forms" => array_map(fn($afm) => $afm->toArray(), $aforms),
              "assessment_responses" => array_filter($assessments, function ($assm) use ($sy, $aforms) {
                foreach ($aforms as $aform) {
                  if (strval($aform->getId()) === strval($assm['assessment_form_id'])) {
                    return true;
                  }
                }
                return false;
              }),
              "assessment_score" => getAssessmentScore($sy['id'], $stud->getUserId()),
            ];
          } else {
            $stud = StudentCollege::findMany('user_id', $st->getId());
            $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($sy['id']));
            if (count($stud) > 0) {
              $stud = end($stud);
              $result['student'] = $stud->toArray();
              $result['education'] = 'college';
              $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
              $result['student_profile'] = $student_profile;
              $status = CollegeStatus::findMany('college_id', $stud->getId());
              $status = count($status) > 0 ? end($status) : null;
              $result['profile_status'] = $status?->toArray();
              $aforms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
              $assessments = Assessment::findMany('user_id', $stud->getUserId());
              $assessments = array_map(fn($a) => $a->toArray(), $assessments);
              $result["assessment"] = [
                "assessment_forms" => array_map(fn($afm) => $afm->toArray(), $aforms),
                "assessment_responses" => array_filter($assessments, function ($assm) use ($sy, $aforms) {
                  foreach ($aforms as $aform) {
                    if (strval($aform->getId()) === strval($assm['assessment_form_id'])) {
                      return true;
                    }
                  }
                  return false;
                }),
                "assessment_score" => getAssessmentScore($sy['id'], $stud->getUserId()),
              ];
            }
          }
          $csn = CaseNote::findOne('called_slip_id', $cn->getId());
          $result['case_note'] = $csn?->toArray();
          if ($csn) {
            $agf = AgreementForm::findOne('case_note_id', $csn->getId());
            $result['agreement_form'] = $agf?->toArray();
            $referral = ReferralForm::findOne('case_note_id', $csn->getId());
            $result['referral_form'] = $referral?->toArray();
            $feedbackForm = FeedbackForm::findOne('case_note_id', $csn->getId());
            $result['feedback'] = $feedbackForm?->toArray();
          } else {
            $agf = AgreementForm::findOne('called_slip_id', $cn->getId());
            $result['agreement_form'] = $agf?->toArray();
            $referral = ReferralForm::findOne('called_slip_id', $cn->getId());
            $result['referral_form'] = $referral?->toArray();
          }
          $calledInResults[] = $result;
        }
      } else {
        // walked in case notes
        $index = count($calledIn) - $i;
        $cn = $walkedInOnlyCaseNotes[$index];
        $st = Users::findOne('id', $cn->getUserId());
        $result['user'] = $st->toArray();
        $gd = Users::findOne('id', $cn->getGuidanceId());
        $result['guidance'] = $gd->toArray();
        $stud = StudentBasic::findMany('user_id', $st->getId());
        $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($sy['id']));
        if (count($stud) > 0) {
          $stud = end($stud);
          $result['student'] = $stud->toArray();
          $result['education'] = 'basic';
          $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
          $result['student_profile'] = $student_profile;
          $status = BasicStatus::findMany('basic_id', $stud->getId());
          $status = count($status) > 0 ? end($status) : null;
          $result['profile_status'] = $status?->toArray();
          $aforms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
          $assessments = Assessment::findMany('user_id', $stud->getUserId());
          $assessments = array_map(fn($a) => $a->toArray(), $assessments);
          $result["assessment"] = [
            "assessment_forms" => array_map(fn($afm) => $afm->toArray(), $aforms),
            "assessment_responses" => array_filter($assessments, function ($assm) use ($sy, $aforms) {
              foreach ($aforms as $aform) {
                if (strval($aform->getId()) === strval($assm['assessment_form_id'])) {
                  return true;
                }
              }
              return false;
            }),
            "assessment_score" => getAssessmentScore($sy['id'], $stud->getUserId()),
          ];
        } else {
          $stud = StudentCollege::findMany('user_id', $st->getId());
          $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($sy['id']));
          if (count($stud) > 0) {
            $stud = end($stud);
            $result['student'] = $stud->toArray();
            $result['education'] = 'college';
            $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
            $result['student_profile'] = $student_profile;
            $status = CollegeStatus::findMany('college_id', $stud->getId());
            $status = count($status) > 0 ? end($status) : null;
            $result['profile_status'] = $status?->toArray();
            $aforms = AssessmentForm::findMany('schoolyear_id', $sy['id']);
            $assessments = Assessment::findMany('user_id', $stud->getUserId());
            $assessments = array_map(fn($a) => $a->toArray(), $assessments);
            $result["assessment"] = [
              "assessment_forms" => array_map(fn($afm) => $afm->toArray(), $aforms),
              "assessment_responses" => array_filter($assessments, function ($assm) use ($sy, $aforms) {
                foreach ($aforms as $aform) {
                  if (strval($aform->getId()) === strval($assm['assessment_form_id'])) {
                    return true;
                  }
                }
                return false;
              }),
              "assessment_score" => getAssessmentScore($sy['id'], $stud->getUserId()),
            ];
          }
        }
        $result['case_note'] = $cn?->toArray();
        $agf = AgreementForm::findOne('case_note_id', $cn->getId());
        $result['agreement_form'] = $agf?->toArray();
        $referral = ReferralForm::findOne('case_note_id', $cn->getId());
        $result['referral_form'] = $referral?->toArray();
        $feedbackForm = FeedbackForm::findOne('case_note_id', $cn->getId());
        $result['feedback'] = $feedbackForm?->toArray();
        $walkedInResults[] = $result;
      }
    }
    $allStudents = Users::findMany("role", "student");
    $allStudents = array_map(function (Users $st) use ($sy) {
      $stud = StudentBasic::findMany('user_id', $st->getId());
      $stud = array_filter($stud, fn(StudentBasic $s) => strval($s->getSchoolyearId()) === strval($sy['id']));
      $result = ["user" => $st->toArray()];
      if (count($stud) > 0) {
        $stud = end($stud);
        $result['student'] = $stud->toArray();
        $result['education'] = 'basic';
        $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
        $result['student_profile'] = $student_profile;
        $status = BasicStatus::findMany('basic_id', $stud->getId());
        $status = count($status) > 0 ? end($status) : null;
        $result['profile_status'] = $status?->toArray();
      } else {
        $stud = StudentCollege::findMany('user_id', $st->getId());
        $stud = array_filter($stud, fn(StudentCollege $s) => strval($s->getSchoolyearId()) === strval($sy['id']));
        if (count($stud) > 0) {
          $stud = end($stud);
          $result['student'] = $stud->toArray();
          $result['education'] = 'college';
          $student_profile = StudentProfile::findOne('id', $stud->getStudentProfileId());
          $result['student_profile'] = $student_profile;
          $status = CollegeStatus::findMany('college_id', $stud->getId());
          $status = count($status) > 0 ? end($status) : null;
          $result['profile_status'] = $status?->toArray();
        }
      }
      return $result;
    }, $allStudents);
    return [
      "called_in" => $calledInResults,
      "walked_in" => $walkedInResults,
      "sy" => $sy['year'],
      "students" => $allStudents,
    ];
  }, $AllSY);

  return [
    "guidance" => AUTHUSER->toArray(),
    "all_data" => $allData,
    "school_years" => $AllSY,
  ];
}

function getFeedbacks()
{
  $AllSY = Schoolyear::all();
  if (count($AllSY) == 0)
    return [];
  $allData = array_map(function ($sy) {
    $feedbacks = FeedbackForm::findMany('schoolyear_id', $sy['id']);
    $feedbacks = array_map(fn($fb) => $fb->toArray(), $feedbacks);
    return [
      "feedbacks" => $feedbacks,
      "sy" => intval($sy["year"]),
    ];
  }, $AllSY);
  return [
    'all_feedbacks' => $allData,
    'school_years' => $AllSY,
  ];
}

function getAssessmentFormManagementData()
{
  $AllSY = Schoolyear::all();
  if (count($AllSY) == 0)
    return [];
  $csy = getCurrentRegisteredSchoolYear();
  $asy = Schoolyear::all();
  $af = AssessmentForm::all();
  $results = [
    "current_sy" => $csy,
    "all_sy" => $asy,
    "assessment_forms" => $af
  ];
  return [...$results];
}

function getGuidanceAndStudentData()
{
  if (AUTHUSER->getRole() === 'admin') {
    $id = $_GET['id'];
    $education = $_GET['educ'];
    if (!$id || !$education)
      return [];
    $admin = AUTHUSER->toArray();
    unset($admin['password']);
    $gs = match ($education) {
      "basic" => BasicStatus::findOne('id', $id),
      "college" => CollegeStatus::findOne('id', $id),
      default => null
    };
    if (!$gs)
      return [];
    $stp = match ($education) {
      "basic" => StudentBasic::findOne('id', $gs->getBasicId()),
      "college" => StudentCollege::findOne('id', $gs->getCollegeId()),
      default => null
    };
    if (!$stp)
      return [];
    $studentProfile = StudentProfile::findOne('id', $stp->getStudentProfileId());
    $user = Users::findOne('id', $stp->getUserId());
    if (!$studentProfile)
      return [];
    $sy = Schoolyear::findOne('id', $stp->getSchoolyearId());
    return [
      'sy' => $sy->toArray(),
      'student' => [
        'user' => [...$user->toArray(), "password" => null],
        'profile' => $studentProfile->toArray(),
        'education' => $education,
        'educ_profile' => $stp->toArray(),
      ],
      'guidance' => $admin,
    ];
  }
  return [];
}

function displayCheckbox(bool $checked, ?string $fontSize = "")
{
  return $checked
    ? "<i class=\"bx bx-checkbox-checked tw-w-full tw-h-full\"" . (strlen($fontSize) > 0 ? " style=\"font-size: $fontSize;\"" : "") . "></i>"
    : "<i class=\"bx bx-checkbox tw-w-full tw-h-full\"" . (strlen($fontSize) > 0 ? " style=\"font-size: $fontSize;\"" : "") . "></i>";
}

//for creating new user
function createUser($data)
{
  $user = new Users();
  $user->username = $data['studentid'];
  $user->first_name = $data['first_name'];
  $user->middle_initial = $data['middle_initial'];
  $user->last_name = $data['last_name'];
  $user->email = $data['email'];
  $user->gender = $data['gender'];
  $user->profile_pic = "images/default-user.png";
  $user->status = true;
  $user->setPassword($data['password']);
  $created = $user->save();
  if ($created) {
    try {
      $thisSite = fullurlpath('/');
      $sy = getCurrentRegisteredSchoolYear();
      $sYear = Schoolyear::findOne('year', $sy);
      $result = sendNotification([
        'student_id' => $created,
        'syid' => $sYear?->getId(),
        "title" => "Welcome to the Guidance Office Management System (SMCC)",
        "message" => "You may fill out your <a href=\"{$thisSite}profile\">Student Profile Form</a> any time when the school year is open.",
        "href" => "/home",
        "subject" => "Welcome to the Guidance Office Management System (SMCC)",
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
                      <p>Dear Students,</p>
                      <p>Welcome to the Guidance Office Management System of Saint Michael College of Caraga (SMCC)!</p>
                      <p>We are excited to have you as part of our vibrant academic community. The Guidance Office is dedicated to supporting you in your academic, emotional, and personal development. Our team is here to assist you with a variety of services including:</p>
                      <ul>
                        <li>Counseling and emotional support</li>
                        <li>Academic advising and career planning</li>
                        <li>Personal growth and development programs</li>
                        <li>Conflict resolution and peer mediation</li>
                      </ul>
                      <p>We encourage you to take full advantage of the resources and services available to you. Whether you are facing challenges in your studies or personal life, we are here to listen and provide the guidance you need to succeed. You can schedule an appointment with us or walk into our office during operating hours.</p>
                      <p>We believe that every student deserves to feel supported and valued, and our office is committed to helping you achieve your fullest potential during your time at SMCC.</p>
                      <p>If you have any questions or need assistance, feel free to reach out to us. We are always ready to help!</p>
                      <p>Sincerely,</p>
                      <p><strong>The Guidance Office</strong></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="https://www.smccnasipit.edu.ph">Saint Michael College of Caraga</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="' . $thisSite . '">Guidance Office (SMCC)</a>
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
  }
  return boolval($created);
}


//for validating update form
function validateUpdateForm($form_data, $image_data)
{
  $response = array();
  $response['status'] = true;


  if (!$form_data['username']) {
    $response['msg'] = "Please enter your username";
    $response['status'] = false;
    $response['field'] = 'username';
  }

  if (!$form_data['last_name']) {
    $response['msg'] = "Please enter your lastname";
    $response['status'] = false;
    $response['field'] = 'last_name';
  }
  if (!$form_data['first_name']) {
    $response['msg'] = "Please enter your first name";
    $response['status'] = false;
    $response['field'] = 'first_name';
  }

  if (isUsernameRegisteredByOther($form_data['username'])) {
    $response['msg'] = $form_data['username'] . " is already registered";
    $response['status'] = false;
    $response['field'] = 'username';
  }

  if ($image_data['name']) {
    $image = basename($image_data['name']);
    $type = strtolower(pathinfo($image, PATHINFO_EXTENSION));
    $size = $image_data['size'] / 10000;

    if ($type != 'jpg' && $type != 'jpeg' && $type != 'png') {
      $response['msg'] = "Oops! Only .jpg, .jpeg, and .png extensions are accepted";
      $response['status'] = false;
      $response['field'] = 'profile_pic';
    }

    if ($size > 10000) {
      $response['msg'] = "Oopsies! Please upload an image less then 10 mb";
      $response['status'] = false;
      $response['field'] = 'profile_pic';
    }
  }

  return $response;
}


//function for updating profile
function updateProfile($data, $imagedata)
{
  global $db;
  $first_name = mysqli_real_escape_string($db, $data['first_name']);
  $last_name = mysqli_real_escape_string($db, $data['last_name']);
  $username = mysqli_real_escape_string($db, $data['username']);
  $password = mysqli_real_escape_string($db, $data['password']);

  if (!$data['password']) {
    $password = $_SESSION['userdata']['password'];
  } else {
    $password = md5($password);
    $_SESSION['userdata']['password'] = $password;
  }

  $profile_pic = "";
  if ($imagedata['name']) {
    $image_name = time() . basename($imagedata['name']);
    $image_dir = "../images/profile/$image_name";
    move_uploaded_file($imagedata['tmp_name'], $image_dir);
    $profile_pic = ", profile_pic='$image_name'";
  }



  $query = "UPDATE users SET first_name = '$first_name', last_name='$last_name',username='$username',password='$password' $profile_pic WHERE id=" . $_SESSION['userdata']['id'];
  return mysqli_query($db, $query);
}

function sendEmail($to, $subject, $body)
{
  $mail = new PHPMailer();

  // Set up SMTP
  $mail->isSMTP();
  // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = EMAIL_USERNAME ?? "";
  $mail->Password = EMAIL_PASSWORD ?? "";
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;

  $mail->CharSet = 'UTF-8';

  $mail->isHTML(true);

  $mail->setFrom(EMAIL_ADDRESS, EMAIL_NAME);
  $mail->addAddress($to);

  $mail->Subject = $subject;
  $mail->Body = $body;
  $mail->AltBody = strip_tags($body);

  if ($mail->send()) {
    return true;
  }
  debug_write("Mailer Error: {$mail->ErrorInfo}");
  return false;
}
?>