<?php
if ($user->role !== 'student') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/dashboard");
}
?>
<style>
  * {
    font-size: 16px;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .table td {
    white-space: nowrap;
  }

  @media (max-width: 768px) {

    .table td,
    .table th {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .select-wrapper select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: none;
    padding-right: 30px;
    width: 100%;
  }

  .select-wrapper::after {
    content: '\25BC';
    position: absolute;
    top: 50%;
    right: 10px;
    pointer-events: none;
    transform: translateY(-50%);
    font-size: 16px;
    color: #555;
  }
</style>

<?php
if (is_null($submittedProfile)):
?>
<div class="tw-min-h-[calc(100vh-200px)] tw-flex tw-justify-center tw-items-center">
  <h2 class="tw-uppercase tw-italic tw-gray-200 tw-px-8 tw-py-4 tw-rounded-2xl tw-border tw-shadow tw-bg-gray-100">still closed</h2>
</div>
<?php
elseif (!empty($submittedProfile) && end($submittedProfile["profile_statuses"])['status'] !== 'rejected'):
?>
<div class="tw-min-h-[calc(100vh-200px)] tw-flex tw-justify-center tw-items-center">
  <div class="tw-uppercase tw-gray-200 tw-flex tw-justify-center tw-flex-col tw-px-8 tw-py-4 tw-rounded-2xl tw-border tw-shadow tw-bg-gray-100">
    <div><h2>Profile Submitted</h2></div>
    <div class="tw-italic tw-mx-auto">(Status: <?= end($submittedProfile["profile_statuses"])["status"] ?>)</div>
    <?php
      $spid = end($submittedProfile["profile_statuses"])['id'];
      $educ = $submittedProfile["education"];
    ?>
    <div class="tw-w-full tw-text-center tw-mt-2">
      <a class="tw-mx-auto" href="<?= pathname( "print?form=student_profile&id=$spid&education=$educ") ?>" target="_blank" rel="noreferrer">View Profile Submitted</a>
    </div>
  </div>
</div>
<?php
else:
?>
<!-- CONTENT -->
<div class="container mb-4">
  <?= !empty($submittedProfile) ? showBanner('Your previous profile submission was rejected:', end($submittedProfile["profile_statuses"])["reason"], BannerStatus::WARNING) : ""; ?>
</div>
<div class="container justify-content-center box">
  <div class="row text-center">
    <div class="col">
      <h4 class="mt-3 mb-3" style="text-decoration:underline;">STUDENT PERSONAL INFORMATION SHEET</h4>
    </div>
  </div>
  <?= showError("alert") ?>
  <form action="<?= pathname("/api/post/studentprofile") ?>" method="post" enctype="multipart/form-data" id="profile-form">
    <?php if (!empty($submittedProfile)): ?>
      <input type="hidden" name="profile_status_id" value="<?= end($submittedProfile['profile_statuses'])['id'] ?>">
      <input type="hidden" name="educ_type" value="<?= $submittedProfile['education'] ?>">
    <?php endif ?>
    <div class="row">
      <div class="col">
        <table>
          <tr>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>
              <label for="formFile" class="form-label"><small>2x2 Picture Wearing SMCC
                  Uniform (JPG/PNG)</small></label>
              <div id="form-photo-display" class="tw-w-full mb-2"></div>
              <button type="button" id="change-photo-button" class="btn btn-primary tw-w-full" style="display: none">Change 2x2 Picture</button>
              <input class="form-control" type="file" id="formFile" name="profile_pic" multiple="false" accept=".png, .jpeg, .jpg" <?= (empty($submittedProfile)) ? "required" : "" ?>>
              <button type="button" id="cancel-change-photo-button" class="btn btn-secondary tw-w-full tw-mt-2" style="display: none">Undo Change Photo</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="col">
        <table>
          <th>
            <label for="formEducationBasic"><u>For Basic Education</u></label>
            <div class="tw-inline"><input type="radio" name="education" id="formEducationBasic" value="basic" checked></div>
          </th>
          <th>
            <br /><br />
          </th>
          <tr>
            <td>
              Grade/Year Level:
            </td>
          </tr>
          <tr>
            <td>
              <div class="select-wrapper">
                <select name="grade_level" id="formGradeLevel" class="form-control" required>
                  <option value="" selected disabled>Select Level</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formSection">Section:</label>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <input type="text" id="formSection" name="section" class="form-control" required />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formAcademicYear">School Year:</label>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <div id="school_year_label" class="tw-text-black tw-rounded-lg tw-border tw-px-3 tw-py-2 tw-w-full tw-mt-1">S.Y. <?= getCurrentRegisteredSchoolYear() ?> - <?= getCurrentRegisteredSchoolYear(1) ?></div>
                <input type="hidden" id="formAcademicYear" name="school_year" value="<?= getCurrentRegisteredSchoolYear() ?>">
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formAdviser">Adviser:</label>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <input type="text" id="formAdviser" name="adviser" class="form-control" required />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="col">
        <table>
          <th>
            <label for="formEducationCollege"><u>For College Department</u></label>
            <div class="tw-inline"><input type="radio" name="education" id="formEducationCollege" value="college"></div>
          </th>
          <th>
            <br /><br />
          </th>
          <tr>
            <td>
              <label for="formSemester">Semester: </label>
              <div class="select-wrapper">
                <select name="semester" id="formSemester" class="form-control" disabled>
                  <option value="" selected disabled>Select Semester</option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formAcademicYear">Academic Year: </label>
              <div>
                <div id="academic_year_label" class="tw-text-black tw-rounded-lg tw-border tw-px-3 tw-py-2 tw-w-full tw-mt-1 tw-bg-[var(--bs-secondary-bg)]">A.Y. <?= getCurrentRegisteredSchoolYear() ?> - <?= getCurrentRegisteredSchoolYear(1) ?></div>
              </div>
            </td>
          </tr><tr>
            <td>
              <label for="formYearLevel">Year Level: </label>
              <div class="select-wrapper">
                <select name="year_level" id="formYearLevel" class="form-control" disabled>
                  <option value="" selected disabled>Select Level</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formDepartment">Department: </label>
              <div class="select-wrapper">
                <select name="department" id="formDepartment" class="form-control" disabled>
                  <option value="" selected disabled>Select Department</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formCourse">Program: </label>
              <div class="select-wrapper">
                <select name="course" id="formCourse" class="form-control" disabled>
                  <option value="" selected disabled>Select Program</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label for="formDean">Dean:</label>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <input type="text" id="formDean" name="dean" class="form-control" disabled />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col"><br /></div>
    </div>


    <div class="row text-center">
      <div class="col">
        <input type="text" name="last_name" id="formSurname" value="<?= $user->getLastName() ?>" required readonly class="form-control tw-uppercase">
        <label for=""><i>Surname</i></label>
      </div>
      <div class="col">
        <input type="text" name="first_name" id="formGivenName" value="<?= $user->getFirstName() ?>" required readonly class="form-control tw-uppercase">
        <label for=""><i>Given Name</i></label>
      </div>
      <div class="col">
        <input type="text" name="middle_name" id="formMiddleName" value="<?= !showFormData("middle_name") ? $user->getMiddleInitial() : showFormData("middle_name") ?>" required class="form-control tw-uppercase">
        <label for=""><i>Middle Name (complete)</i></label>
      </div>
      <div class="col">
        <input type="text" name="suffix_name" id="formAuxilliaryName" class="form-control tw-uppercase">
        <label for=""><i>Auxilliary Name (Sr,Jr,I,II,III,etc.)</i></label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <br />
      </div>
    </div>

    <div class="row">
      <div class="col table-responsive">
        <table class="table table-light">
          <tr>
            <td><label for="formGender">Gender</label></td>
            <td>
              <div class="select-wrapper">
                <input type="text" name="gender" id="formGender" class="form-control" value="<?= $user->getGender() ?>" readonly>
              </div>
            </td>
            <td><label for="age">Age</label></td>
            <td><input type="number" min="10" max="50" name="age" id="age" class="form-control" required></td>
            <td><label for="formBloodType">Blood Type</label></td>
            <td>
              <div class="select-wrapper">
                <select name="bloodtype" id="formBloodType" class="form-control" required>
                  <option value="" selected disabled>Select Blood Type</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td><label for="height">Height (cm.)</label></td>
            <td><input type="number" min="120" name="height" id="height" class="form-control" required></td>
            <td><label for="weight">Weight (kg.)</label></td>
            <td><input type="number" min="20" name="weight" id="weight" class="form-control" required></td>
            <td><label for="formCivilStatus">Civil Status</label></td>
            <td>
              <div class="select-wrapper">
                <select name="civil_status" id="formCivilStatus" class="form-control" required>
                  <option value="" selected disabled>Select Status</option>
                  <?php
                  foreach (getCivilStatuses() as $civilStatus) {
                  ?>
                    <option value="<?= $civilStatus ?>"><?= $civilStatus ?></option>
                  <?php
                  }
                  ?>
                </select>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col"><br /></div>
    </div>

    <div class="row">
      <div class="col table-responsive">
        <table class="table table-light">
          <tr>
            <td><label for="formAddress">Home Address</label></td>
            <td><input type="text" name="address" id="formAddress" class="form-control" required></td>
            <td><label for="formCitizenship">Citizenship</label></td>
            <td><input type="text" name="citizenship" id="formCitizenship" class="form-control" required></td>
          </tr>
          <tr>
            <td><label for="formBirthDate">Date of Birth</label></td>
            <td><input type="date" name="birthdate" id="formBirthDate" class="form-control" required></td>
            <td><label for="formContactNo">Contact No.</label></td>
            <td><input type="tel" name="contact" id="formContactNo" class="form-control" required></td>
          </tr>
          <tr>
            <td><label for="formReligion">Religion</label></td>
            <td><input type="text" name="religion" id="formReligion" class="form-control" required></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <tr>
            <th rowspan="3" class="text-center">In Case of Emergency, Please Notify: </th>
            <td>
              <Name: for="formEmergencyName">Name: </label>
            </td>
            <td><input type="text" name="emergency_name" id="formEmergencyName" class="form-control" required></td>
          </tr>
          <tr>
            <td><label for="formEmergencyRelationship">Relationship: </label></td>
            <td><input type="text" name="emergency_relationship" id="formEmergencyRelationship" class="form-control" required></td>
          </tr>
          <tr>
            <td><label for="formEmergencyContactNo">Contact No.: </label></td>
            <td><input type="tel" name="emergency_contact" id="formEmergencyContactNo" class="form-control" required></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col table-responsive border p-4">
        <h4>PARENTAL BACKGROUND</h4>
        <table class="table table-light align-middle">
          <thead>
            <tr>
              <th colspan="2">
                Father's Information
              </th>
              <th colspan="2">
                Mother's Information
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label for="formFatherLastName">Surname</label>
              </td>
              <td>
                <input type="text" name="father_last_name" id="formFatherLastName" class="form-control" required>
              </td>
              <td>
                <label for="formMotherLastName">Surname</label>
              </td>
              <td>
                <input type="text" name="mother_last_name" id="formMotherLastName" class="form-control" required>
              </td>
            </tr>
            <tr>
              <td>
                <label for="formFatherFirstName">First Name</label>
              </td>
              <td>
                <input type="text" name="father_first_name" id="formFatherFirstName" class="form-control" required>
              </td>
              <td>
                <label for="formMotherFirstName">First Name</label>
              </td>
              <td>
                <input type="text" name="mother_first_name" id="formMotherFirstName" class="form-control" required>
              </td>
            </tr>
            <tr>
              <td>
                <label for="formMotherMiddleName">Middle Name</label>
              </td>
              <td>
                <input type="text" name="father_middle_name" id="formFatherMiddleName" class="form-control">
              </td>
              <td>
                <label for="formMotherMiddleName">Middle Name</label>
              </td>
              <td>
                <input type="text" name="mother_middle_name" id="formMotherMiddleName" class="form-control">
              </td>
            </tr>
            <tr>
              <td>
                <label for="formFatherContactNo">Contact No.</label>
              </td>
              <td>
                <input type="tel" name="father_contact" id="formFatherContactNo" class="form-control" required>
              </td>
              <td>
                <label for="formMotherContactNo">Contact No.</label>
              </td>
              <td>
                <input type="tel" name="mother_contact" id="formMotherContactNo" class="form-control" required>
              </td>
            </tr>
            <tr>
              <td>
                <label for="formFatherOccupation">Occupation</label>
              </td>
              <td>
                <input type="text" name="father_occupation" id="formFatherOccupation" class="form-control" required>
              </td>
              <td>
                <label for="formMotherOccupation">Occupation</label>
              </td>
              <td>
                <input type="text" name="mother_occupation" id="formMotherOccupation" class="form-control" required>
              </td>
            </tr>

            <tr>
              <td>
                Type of Employee <br />
                <i>(Please mark (✓) any of the following, which is applicable)</i>
              </td>
              <td>
                <div class="tw-max-w-72 tw-flex tw-flex-wrap tw-gap-3">
                  <?php
                  foreach (getTypesOfEmployee() as $n => $emptype) {
                  ?>
                    <div>
                      <input type="radio" id="formFatherEmpType<?= $n ?>" value="<?= $emptype ?>" name="father_employee_type">
                      <label for="formFatherEmpType<?= $n ?>" class="tw-inline"><?= $emptype ?></label>
                    </div>
                  <?php
                  }
                  ?>
                </div>
                <input type="text" id="formFatherEmpTypeSpecify" class="form-control" disabled>
              </td>
              <td>
                Type of Employee <br />
                <i>(Please mark (✓) any of the following, which is applicable)</i>
              </td>
              <td>
                <div class="tw-max-w-72 tw-flex tw-flex-wrap tw-gap-3">
                  <?php
                  foreach (getTypesOfEmployee() as $n => $emptype) {
                  ?>
                    <div>
                      <input type="radio" id="formMotherEmpType<?= $n ?>" value="<?= $emptype ?>" name="mother_employee_type">
                      <label for="formMotherEmpType<?= $n ?>" class="tw-inline"><?= $emptype ?></label>
                    </div>
                  <?php
                  }
                  ?>
                </div>
                <input type="text" id="formMotherEmpTypeSpecify" class="form-control" disabled>
            </tr>
            <tr>
              <td>
                <label for="formFatherEducationAttainment">Highest Education Attainment</label>
              </td>
              <td>
                <div class="select-wrapper">
                  <select name="father_education_attainment" id="formFatherEducationAttainment" class="form-control" required>
                    <option value="" selected disabled>Select Education Attainment</option>
                    <?php
                    foreach (getEducationAttaiments() as $educAttainment) {
                    ?>
                      <option value="<?= $educAttainment ?>"><?= $educAttainment ?></option>
                    <?php
                    }
                    ?>
                  </select>
                </div>
              </td>
              <td>
                <label for="formMotherEducationAttainment">Highest Education Attainment</label>
              </td>
              <td>
                <div class="select-wrapper">
                  <select name="mother_education_attainment" id="formMotherEducationAttainment" class="form-control" required>
                    <option value="" selected disabled>Select Education Attainment</option>
                    <?php
                    foreach (getEducationAttaiments() as $educAttainment) {
                    ?>
                      <option value="<?= $educAttainment ?>"><?= $educAttainment ?></option>
                    <?php
                    }
                    ?>
                  </select>
                </div>

              </td>
            </tr>
            <tr>
              <td>
                <label for="formParentAddress">Parent's Present Address</label>
              </td>
              <td colspan="3">
                <input type="text" name="parent_address" id="formParentAddress" class="form-control" required>
              </td>
            </tr>
            <tr>
              <td>
                <b>Parent's Marital Status: </b><br />(Please mark (✓) any of the following, which is
                applicable)
              </td>
              <td colspan="3">
                <?php
                foreach (getMaritalStatuses() as $n => $mstatus) {
                ?>
                  <input type="radio" id="formParentMaritalStatus<?= $n ?>" value="<?= $mstatus ?>" name="parent_marital_status" <?= $n == 0 ? "checked" : "" ?>>
                  <label for="formParentMaritalStatus<?= $n ?>"><?= $mstatus ?></label>
                  <?php if (intval($n) + 1 < count(getMaritalStatuses())) { ?>
                    &emsp;
                  <?php } ?>
                <?php } ?>
                <input type="text" id="formParentMaritalStatusSpecify" class="tw-border tw-px-2 tw-py-1 tw-rounded disabled:tw-bg-[var(--bs-secondary-bg)]" disabled>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <h4>EDUCATIONAL ATTAINMENT</h4>
          <tr>
            <th>
            </th>
            <th colspan="">
              Name Of School
            </th>
            <th>
              Year Graduated
            </th>
            <th>
              Honor/s Received
            </th>
          </tr>

          <tr>
            <td>
              Doctoral Degree
            </td>
            <td>
              <input type="text" name="doctoral" id="formDoctoral" class="form-control">
            </td>
            <td>
              <input type="text" name="doctoral_graduated" id="formDoctoralGraduate" class="form-control">
            </td>
            <td>
              <input type="text" name="doctoral_honors" id="formDoctoralHonors" class="form-control">
            </td>
          </tr>
          <tr>
            <td class="text-end tw-italic">
              <label for="doctoral_program">Program:</label>
            </td>
            <td colspan="3">
              <input type="text" name="doctoral_program" id="formDoctoralProgram" class="form-control">
            </td>
          </tr>
          <tr>
            <td>
              Masteral Degree
            </td>
            <td>
              <input type="text" name="masteral" id="formMasteral" class="form-control">
            </td>
            <td>
              <input type="text" name="masteral_graduated" id="formMasteryGraduated" class="form-control">
            </td>
            <td>
              <input type="text" name="masteral_honors" id="formMasteralHonors" class="form-control">
            </td>
          </tr>
          <tr>
            <td class="text-end">
              <label for="masteral_program">Program:</label>
            </td>
            <td colspan="3">
              <input type="text" name="masteral_program" id="formMasteralProgram" class="form-control">
            </td>
          </tr>
          <tr>
            <td>
              College
            </td>
            <td>
              <input type="text" name="college" id="formCollege" class="form-control">
            </td>
            <td>
              <input type="text" name="college_graduated" id="formCollegeGraduated" class="form-control">
            </td>
            <td>
              <input type="text" name="college_honors" id="formCollegeHonors" class="form-control">
            </td>
          </tr>
          <tr>
            <td class="text-end">
              <label for="college_program">Program:</label>
            </td>
            <td colspan="3">
              <input type="text" name="college_program" id="formCollegeProgram" class="form-control">
            </td>
          </tr>
          <tr>
            <td>
              Tech-Voc
            </td>
            <td>
              <input type="text" name="techvoc" id="formTechVoc" class="form-control">
            </td>
            <td>
              <input type="text" name="techvoc_graduated" id="formTechVocGraduated" class="form-control">
            </td>
            <td>
              <input type="text" name="techvoc_honors" id="formTechVocHonors" class="form-control">
            </td>
          </tr>
          <tr>
            <td>
              High School
            </td>
            <td>
              <input type="text" name="highschool" id="formHighSchool" class="form-control">
            </td>
            <td>
              <input type="text" name="highschool_graduated" id="formHighSchoolGraduated" class="form-control">
            </td>
            <td>
              <input type="text" name="highschool_honors" id="formHighSchoolHonors" class="form-control">
            </td>
          </tr>
          <tr>
            <td>
              ALS
            </td>
            <td>
              <input type="text" name="als" id="formAls" class="form-control">
            </td>
            <td>
              <input type="text" name="als_graduated" id="formAlsGraduated" class="form-control">
            </td>
            <td>
              <input type="text" name="als_honors" id="formAlsHonors" class="form-control">
            </td>
          </tr>
          <tr>
            <td>
              Elementary
            </td>
            <td>
              <input type="text" name="elementary" id="formElementary" class="form-control">
            </td>
            <td>
              <input type="text" name="elementary_graduated" id="formElementaryGraduated" class="form-control">
            </td>
            <td>
              <input type="text" name="elementary_honors" id="formElementaryHonors" class="form-control">
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <tr>
            <th>
              Who is supporting your studies in SMCC?
            </th>
          </tr>

          <tr>
            <td>
              <?php
              foreach (getEducationSupports() as $n => $educsupports) {
              ?>
                &emsp;<input type="radio" name="support" id="formEducSupport<?= $n ?>" value="<?= $educsupports ?>" <?= $n === 0 ? "checked" : "" ?>>
                <label for="formEducSupport<?= $n ?>"><?= $educsupports ?></label>
              <?php
              }
              ?>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <label for="formNoOfSiblings">No. of Siblings: </label>
        <div class="select-wrapper tw-max-w-32 ml-2">
          <select name="number_of_siblings" id="formNoOfSiblings" class="form-control bg-white text-center" value="0">
            <?php
            for ($i = 0; $i < 20; $i++) {
            ?>
              <option value="<?= $i ?>"><?= $i ?></option>
            <?php
            }
            ?>
          </select>
        </div>
      </div>
      <div class="col-12 table-responsive">
        <table class="table table-light align-middle">
          <thead>
            <tr>
              <th>
                Name of Sister/Brother
              </th>
              <th>
                Age
              </th>
              <th>
                Occupation
              </th>
              <th>
                Educational Attainment
              </th>
            </tr>
          </thead>
          <tbody id="siblings-rows">
          </tbody>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <tr>
            <td>
              Number of persons living at home
            </td>
            <td>
              <input type="number" min="0" name="home_persons_living" id="formPersonsLiving" class="form-control" required>
            </td>
            <td>
              No. of Children in the family
            </td>
            <td class="">
              <input type="number" min="0" name="home_children" id="formNoOfChildren" class="form-control" required>
            </td>
          <tr>
            <td>
              Is your homelife:
            </td>
            <td>
              <input type="radio" name="homelife" id="formHomeVeryHappy" value="Very Happy" checked>
              <label for="formHomeVeryHappy">Very Happy</label>
              <input type="radio" name="homelife" id="formHomePleasant" value="Pleasant">
              <label for="formHomePleasant">Pleasant</label>
              <br /><input type="radio" name="homelife" id="formHomeBearable">
              <label for="formHomeBearable">Bearable</label>
              <input type="radio" name="homelife" id="formHomeUnhappy">
              <label for="formHomeUnhappy">Unhappy</label>
            </td>
            <td>
              Do you work at home?
              <input type="radio" name="workathome" id="formWorkAtHomeYes" value="Yes" checked>
              <label for="formWorkAtHomeYes">Yes</label>
              <input type="radio" name="workathome" id="formWorkAtHomeNo" value="No">
              <label for="formWorkAtHomeNo">No</label>
            </td>
            <td>
              What/s work?
              <input type="text" name="work" id="formWork" class="form-control" required>
            </td>

          </tr>
          <tr>
            <td>
              What type of discipline is being implemented at home?
            </td>
            <td>
              <input type="text" name="discipline_type" id="formDisciplineType" class="form-control" required>
            </td>
            <td>
              Who handles discipline at home?
            </td>
            <td>
              <input type="text" name="discipline_handle" id="formDisciplineHandle" class="form-control" required>
            </td>
          </tr>
          <tr>
            <td>
              What time do you sleep?
            </td>
            <td>
              <input type="text" name="sleep_time" id="formSleepTime" class="form-control" required>
            </td>
            <td>
              Do you have friends?
              <input type="radio" name="have_friends" id="formHaveFriendsYes" value="Yes" checked>
              <label for="formHaveFriendsYes">Yes</label>
              <input type="radio" name="have_friends" id="formHaveFriendsNo" value="No">
              <label for="formHaveFriendsNo">No</label>
            </td>
            <td>
              <span class="tw-text-sm tw-italic">if yes, why do you
                choose him/her</span>
              <input type="text" name="why_friend" id="formWhyFriend" class="form-control" required>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <h4>INTERESTS</h4>
          <tr>
            <td>List down your present hobbies/interests</td>
            <td><input type="text" name="hobbies" id="formHobbies" class="form-control"></td>
          </tr>
          <tr>
            <td>What do you enjoy more than anything else?</td>
            <td><input type="text" name="enjoy" id="formEnjoy" class="form-control"></td>
          </tr>
          <tr>
            <td>What organization/s do you belong in and out of school?</td>
            <td><input type="text" name="organization_out_of_school" id="formOrganizationOutOfSchool" class="form-control"></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <h4>HEALTH HISTORY</h4>
          <tr>
            <td><input type="checkbox" name="health_history[]" id="formHistoryFrequentColds" value="Frequent Colds">
              <label for="formHistoryFrequentColds">Frequent Colds</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryPneumonia" value="Pneumonia">
              <label for="formHistoryPneumonia">Pneumonia</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryHeartDisease" value="Heart Diseases">
              <label for="formHistoryHeartDisease">Heart Disease</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryKidneyInfection" value="Kidney Infection">
              <label for="formHistoryKidneyInfection">Kidney Infection</label>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" name="health_history[]" id="formHistoryChickenPox" value="Chicken Pox">
              <label for="formHistoryChickenPox">Chicken Pox</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryCough" value="Cough">
              <label for="formHistoryCough">Cough</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryPolio" value="Polio">
              <label for="formHistoryPolio">Polio</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryEpilepsy" value="Epilepsy">
              <label for="formHistoryEpilepsy">Epilepsy</label>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" name="health_history[]" id="formHistoryMigraine" value="Migraine">
              <label for="formHistoryMigraine">Migraine</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistorySoreThroats" value="Sore Throats">
              <label for="formHistorySoreThroats">Sore Throats</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryEarInfection" value="Ear Infection">
              <label for="formHistoryEarInfection">Ear Infection</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryAsthma" value="Asthma">
              <label for="formHistoryAsthma">Asthma</label>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" name="health_history[]" id="formHistorySoreEyes" value="Sore Eyes">
              <label for="formHistorySoreEyes">Sore Eyes</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryMeasles" value="Measles">
              <label for="formHistoryMeasles">Measles</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryTyphoidFever" value="Typhoid Fever">
              <label for="formHistoryTyphoidFever">Typhoid Fever</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryRestlessness" value="Restlessness">
              <label for="formHistoryRestlessness">Restlessness</label>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" name="health_history[]" id="formHistoryPoorSleepingHabit" value="Poor Sleeping Habit">
              <label for="formHistoryPoorSleepingHabit">Poor Sleeping Habit</label>
            </td>
            <td><input type="checkbox" name="health_history[]" id="formHistoryVisionDifficulties" value="Vision Difficulties">
              <label for="formHistoryVisionDifficulties">Vision Difficulties</label>
            </td>
            <td colspan="2"><input type="checkbox" id="formHistoryOthers">
              <label for="formHistoryOthers">Others Pls. Specify</label>
              <input type="text" name="health_history[]" id="formHistoryOthersSpecify" class="form-control" disabled>
            </td>
          </tr>

        </table>

        <div class="row mt-4">
          <div class="col table-responsive">
            <table class="table table-light align-middle">
              <tr>
                <td>Do you exhibit certain mannerisms? (Please Specify) </td>
                <td><input type="text" name="health_exhibit_mannerisms" id="formExhibitMannerisms" class="form-control"></td>
              </tr>
              <tr>
                <td>Do you have any past operations? (Please Specify) </td>
                <td><input type="text" name="health_past_operations" id="formPastOperations" class="form-control"></td>
              </tr>
              <tr>
                <td>Do you have any allergies? (Please Specify) </td>
                <td><input type="text" name="health_allergies" id="formAllergies" class="form-control"></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col table-responsive">
        <table class="table table-light align-middle">
          <h4>INDIGENOUS PEOPLE'S ACT</h4>
          <p><b><small>Pursuent to: (a) Indigenous People's Act (RA. 8371); (b) Magna Carta for Disabled
                Person (RA.
                7277);
                and (c) Solo Parents Welfare act of 2000 (RA. 8972), Please answer the
                following:</small></b></p>
          <tr>
            <td>a. Are you a member of any indigenous group?</td>
            <td><input type="radio" name="indigenous_group" id="formIndigenousGroupYes" value="Yes" checked>
              <label for="formIndigenousGroupYes">Yes</label>
            </td>
            <td><input type="radio" name="indigenous_group" id="formIndigenousGroupNo" value="No">
              <label for="formIndigenousGroupNo">No</label>
            </td>
          </tr>
          <tr>
            <td class="text-end">If "YES", please specify: </td>
            <td colspan="2"><input type="text" name="indigenous_group_specify" id="formIndigenousGroupSpecify" class="form-control" required></td>
          </tr>
          <tr>
            <td>b. Are you differently abled?</td>
            <td><input type="radio" name="differently_abled" id="formDifferentlyAbledYes" value="Yes" checked>
              <label for="formDifferentlyAbledYes">Yes</label>
            </td>
            <td><input type="radio" name="differently_abled" id="formDifferentlyAbledNo" value="No">
              <label for="formDifferentlyAbledNo">No</label>
            </td>
          </tr>
          <tr>
            <td class="text-end">If "YES", please specify: </td>
            <td colspan="2"><input type="text" name="differently_abled_specify" id="formDifferentlyAbledSpecify" class="form-control" required></td>
          </tr>
          <tr>
            <td>c. Are you a solo parent?</td>
            <td><input type="radio" name="solo_parent" id="formSoloParentYes" value="Yes" checked>
              <label for="formSoloParentYes">Yes</label>
            </td>
            <td><input type="radio" name="solo_parent" id="formSoloParentNo" value="No">
              <label for="formSoloParentNo">No</label>
            </td>
          </tr>
          <tr>
            <td class="text-end">If "YES", please specify: </td>
            <td colspan="2"><input type="text" name="solo_parent_specify" id="formSoloParentSpecify" class="form-control" required></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <p><small>
            Note: If there is anything that you would like to share with your Guidance Counselor, which
            you think need assistance, feel free to write in a separate sheet of paper, Rest assured
            that
            everything would be kept under confidentiality and respect.
          </small></p>
        <br /><br />
        <div class="row">
          <div class="col float-start"></div>
          <div class="col float-end">
            <p>I certify that the foreign information is true and correct, made in good faith and verified
              by me to the best of my knowledge and belief</p>
          </div>
        </div>
        <br />
        <!-- <div class="row">
          <div class="col float-start"></div>
          <div class="col float-end">
            <label for="formFile2" class="form-label"><small>Student's Digital Signature
                (JPG/PNG)</small></label>
            <input class="form-control" type="file" id="formFile2">
          </div>
        </div> -->
        <br />
      </div>
    </div>


    <div class="row text-center">
      <div class="col">
        <button type="submit" class="btn btn-primary"><i class="bx bx-check-circle"></i> Submit</button>
      </div>
    </div>
    <br />

  </form>
</div>

<?php endif   ?>

<script>
  var DEPARTMENTSANDCOURSES = JSON.parse(`<?= json_encode(getDepartmentsAndCourses()) ?>`);
  var PREVFORMDATA = JSON.parse(`<?= isset($_SESSION['formdata']) ? json_encode([...$_SESSION['formdata']] + (!empty($submittedProfile) ? ["profile_pic" => $submittedProfile["student_profile"]["profile_pic"]] : [])) : ((!empty($submittedProfile) && end($submittedProfile["profile_statuses"])['status'] === 'rejected') ? json_encode([...($submittedProfile["student_profile"]), "education" => $submittedProfile['education'], ...($submittedProfile["student_education"]), "grade_level" => $submittedProfile["student_education"]["gradelevel"] ?? "", "year_level" => $submittedProfile["student_education"]["yearlevel"] ?? ""]) : "[]") ?>`);
  (function(){
    const testing = JSON.parse(`<?= json_encode($submittedProfile, JSON_PRETTY_PRINT) ?>`);
    // console.log(testing);
  })();
</script>