<?php if (empty($data)): ?>
<div>Not Found</div>
<?php else:
  $employeeTypes = [
    "Government",
    "Private",
    "Entrepreneur",
    "NGO",
    "Self-Employed",
    "OFW",
  ];
  $maritalStatuses = [
    "Married in Church",
    "Mother Remarried",
    "Father Remarried",
    "Single Parents",
    "Married Civilly",
    "Living Together",
  ];
  $supporting = [
    "Father",
    "Mother",
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
  $homelife = [
    "Very Happy",
    "Pleasant",
    "Bearable",
    "Unhappy"
  ];
  $health = [
    "Frequent Colds",
    "Polio",
    "Frequent Colds",
    "Heart Disease",
    "Ear Infection",
    "Measles",
    "Sore Throat",
    "Vision Difficulties",
    "Cough",
    "Pneumonia",
    "Poor Sleeping Habit",
    "Migraine",
    "Chicken Pox",
    "Typhoid Fever",
    "Kidney Infection",
    "Epilepsy",
    "Restlessness",
    "Asthma",
  ]
?>
<div class="tw-font-calibri tw-w-[8.5in] tw-p-[0.4in] print:tw-p-0 print:tw-h-[calc(13in-0.8in)] print:tw-max-h-[calc(13in-0.8in)] print:tw-w-[calc(8.5in-0.8in)] print:tw-max-w-[calc(8.5in-0.8in)] tw-mx-auto print:tw-mx-0 tw-my-4 print:tw-my-0 tw-shadow-lg print:tw-shadow-none tw-bg-white tw-border print:tw-border-none">
  <div class="tw-min-h-[calc(13in-0.8in-1.0in)]">
    <table class="tw-mx-auto tw-border-collapse">
      <tbody>
        <tr>
          <td class="tw-w-[90px]">
            <img src="<?= pathname('images/smcc.gif') ?>" alt="SMCC Logo">
          </td>
          <td class="tw-p-4 tw-text-center">
            <div class="tw-text-[23px] tw-font-bold">Saint Michael College of Caraga</div>
            <div>Brgy.4, Nasipit, Agusandel Norte, Philippines</div>
            <div>Tel. Nos. +63 085343-3251 / +63085283-3113</div>
            <div>No.+63 085808-0892</div>
            <div>www.smccnasipit.edu.ph</div>
          </td>

          <td class="tw-w-[110px]">
            <img src="<?= pathname('images/1.jpg') ?>" alt="SMCC Logo">
          </td>
        </tr>
      </tbody>
    </table>
    <?= br() ?>
    <div class="tw-font-bold tw-w-full tw-text-center tw-text-[16pt]">
      Student Profle
    </div>
    <?= br() ?>
    <div class="tw-grid tw-grid-cols-9">
      <div class="tw-bg-white tw-col-span-2">
        <img src="<?= pathname($student_profile?->getProfilePic()) ?>" alt="" class="tw-w-[1.5in] tw-h-[1.5in] tw-object-contain tw-border" id="profile_pic">
      </div>
      <div class="tw-col-span-3">
        <div class="tw-font-bold tw-underline">
          For Basic Education
        </div>

        <div class="tw-pr-3">
          <div class="tw-flex tw-justify-start tw-gap-x-2">
            <div>Grade/Year Level:</div>
            <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow">
              <?= $education === "basic" ? $student_education?->getGradeLevel() : "" ?>
            </div>
          </div>
          <div class="tw-flex tw-justify-start tw-gap-x-2">
            <div>Section:</div>
            <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow">
              <?= $education === "basic" ? $student_education?->getSection() : "" ?>
            </div>
          </div>
          <div class="tw-flex tw-justify-start tw-gap-x-2">
            <div>School Year:</div>
            <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow">
              <?= $education === "basic" ? "S.Y. " . $school_year : "" ?>
            </div>
          </div>
          <div class="tw-flex tw-justify-start tw-gap-x-2">
            <div>Adviser:</div>
            <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow tw-text-nowrap">
            <?= $education === "basic" ? $student_education->getAdviser() : "" ?>
          </div>
          </div>
        </div>
      </div>

      <div class="tw-col-span-4">
        <div class="tw-font-bold tw-underline">
          For College Department
        </div>
        <div>
          <div class="tw-flex tw-justify-start tw-items-center tw-gap-x-1">
            Semester:
            <div class="tw-text-[14pt] tw-flex-shrink">
              <?= displayCheckbox($education === "college" && $student_education->getSemester() === "1st Semester") ?>
            </div>
            <div class="tw-mr-3">
              1st
            </div>
            <div class="tw-text-[14pt] tw-flex-shrink">
              <?= displayCheckbox($education === "college" && $student_education->getSemester() === "2nd Semester") ?>
            </div>
            <div class="tw-mr-3">
              2nd
            </div>
            <div class="tw-text-[14pt] tw-flex-shrink">
              <?= displayCheckbox($education === "college" && $student_education->getSemester() === "Summer") ?>
            </div>
            <div class="tw-mr-3">
              Summer
            </div>
          </div>
        </div>
        <div class="tw-flex tw-justify-start tw-gap-x-2">
          <div>Academic Year:</div>
          <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow">
          <?= $education === "college" ? "A.Y. " . $school_year : "" ?>
          </div>
        </div>
        <div class="tw-flex tw-justify-start tw-gap-x-2">
          <div>Course/Program:</div>
          <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow">
            <?= $education === "college" ? $student_education->getCourse() : "" ?>
          </div>
        </div>
        <div class="tw-flex tw-justify-start tw-gap-x-2">
          <div>Department:</div>
          <div class="tw-border-b tw-border-black tw-text-center tw-flex-grow">
            <?= $education === "college" ? $student_education->getDepartment() : "" ?>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-flex tw-justify-center tw-p-[10px]">
      <div class="tw-m-4">
        <div class="tw-text-center tw-min-h-[18pt]">
          <?= $user->getLastName() ?>
        </div>
        <div class="tw-border-t-2 tw-border-black tw-italic tw-text-sm">
          SURNAME
        </div>
      </div>

      <div class="tw-m-4">
        <div class="tw-text-center tw-min-h-[18pt]">
          <?= $user->getFirstName() ?>
        </div>
        <div class="tw-border-t-2 tw-border-black tw-italic tw-text-sm">
          GIVEN NAME
        </div>
      </div>
      <div class="tw-m-4">
        <div class="tw-text-center tw-min-h-[18pt]">
          <?= $student_profile->getMiddleName() ?>
        </div>
        <div class="tw-border-t-2 tw-border-black tw-italic tw-text-sm">
          MIDDLE NAME
        </div>
      </div>
      <div class="tw-m-4">
        <div class="tw-text-center tw-min-h-[18pt]">
          <?= $student_profile->getSuffixName() ?>
        </div>
        <div class="tw-border-t-2 tw-border-black tw-italic tw-text-sm">
          AUXILIARY NAME (Sr,Jr,I,II,III, etc)
        </div>
      </div>

    </div>

    <table class="tw-w-full tw-border-collapse">
      <tr>
        <td class="tw-border-2 tw-border-black tw-p-1 tw-font-bold">
          Gender:
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1">
          <?= $user->getGender() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1 tw-font-bold">
          Age:
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1">
          <?= $student_profile->getAge() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1 tw-font-bold">
          Blood Type:
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1">
        <?= $student_profile->getBloodtype() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1 tw-font-bold">
          Height (cm.):
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1">
        <?= $student_profile->getHeight() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1 tw-font-bold">
          Weight (kg.):
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1">
        <?= $student_profile->getWeight() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1 tw-font-bold">
          Civil Status:
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1">
        <?= $student_profile->getCivilStatus() ?>
        </td>
      </tr>
      <tr>
        <td class="tw-border-2 tw-border-black tw-p-1 " colspan="2">
          Home Address
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="6">
          <?= $student_profile->getAddress() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
          Citizenship
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
        <?= $student_profile->getCitizenship() ?>
        </td>
      </tr>
      <tr>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
          Date of Birth
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="6">
          <?= $student_profile->getBirthdate() ?>
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
          Contact No.
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
          <?= $student_profile->getContact() ?>
        </td>
      </tr>
      <tr>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
          Religion
        </td>
        <td class="tw-border-2 tw-border-black tw-p-1" colspan="10">
          <?= $student_profile->getReligion() ?>
        </td>
      </tr>
      <tr>
        <th class="tw-border-2 tw-border-black tw-p-1" rowspan="2" colspan="8">
          <div>In case of emergency. please notify:</div>
          <div class="tw-font-normal"><?= $student_profile->getEmergencyName() ?></div>
        </th>
        <td class="tw-border-2 tw-border-black tw-border-r-0 tw-px-1 tw-font-bold" colspan="2">
          Relationship:
        </td>
        <td class="tw-border-2 tw-border-black tw-border-l-0 tw-px-1 tw-font-bold" colspan="2">
          <?= $student_profile->getEmergencyRelationship() ?>
        </td>
      </tr>
      <tr>
        <td class="tw-border-2 tw-border-black tw-border-r-0 tw-px-1 tw-font-bold" colspan="2">
          Contact No.:
        </td>
        <td class="tw-border-2 tw-border-black tw-border-l-0 tw-px-1 tw-font-bold" colspan="2">
          <?= $student_profile->getEmergencyContact() ?>
        </td>
      </tr>
    </table>

    <div>
      <h2 class="tw-text-lg tw-font-semibold">PARENTAL BACKGROUND</h2>
      <table class="tw-w-full tw-border-collapse">
        <thead>
          <tr>
            <th class="tw-border-2 tw-border-black tw-p-1" colspan="3">
              Father's Information
            </th>
            <th class="tw-border-2 tw-border-black tw-p-1" colspan="3">
              Mother's Information
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Surname
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getFatherLastName() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Surname
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getMotherLastName() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              First Name
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getFatherFirstName() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1">
              First Name
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getMotherFirstName() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Middle Name
            </td>
            <td class="fathermiddlename-td" colspan="2">
              <?= $student_profile->getFatherMiddleName() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Middle Name
            </td>
            <td class=" tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getMotherMiddleName() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Contact No.
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getFatherContact() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Contact No.
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getMotherContact() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Occupation
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getFatherOccupation() ?>
            </td>
            <td>
              Occupation
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getMotherOccupation() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Type of Employee
              <?= br(); ?>
              <i>(Please mark (t) any of the following, which is applicable)</i>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <div class="tw-grid tw-grid-cols-2 tw-gap-1 tw-min-w-[190px]">
                <?php foreach ($employeeTypes as $et): ?>
                  <div class="tw-flex tw-justify-start">
                    <div class="tw-text-[14pt] tw-flex-shrink">
                      <?= displayCheckbox($student_profile->getFatherEmployeeType() === $et) ?>
                    </div>
                    <div class="tw-mr-3 tw-text-wrap">
                      <?= $et ?>
                    </div>
                  </div>
                <?php endforeach ?>
              </div>
              <div class="tw-font-bold">
                Others, pls specify:
              </div>
              <div>
                <?= !in_array($student_profile->getFatherEmployeeType(), $employeeTypes) ? $student_profile->getFatherEmployeeType() : br() ?>
              </div>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1">
              Type of Employee
              <?= br(); ?>
              <i>(Please mark (t) any of the following, which is applicable)</i>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <div class="tw-grid tw-grid-cols-2 tw-gap-1 tw-min-w-[200px]">
                <?php foreach ($employeeTypes as $et): ?>
                  <div class="tw-flex tw-justify-start">
                    <div class="tw-text-[14pt] tw-flex-shrink">
                      <?= displayCheckbox($student_profile->getMotherEmployeeType() === $et) ?>
                    </div>
                    <div class="tw-mr-3 tw-text-wrap">
                      <?= $et ?>
                    </div>
                  </div>
                <?php endforeach ?>
              </div>
              <div class="tw-font-bold">
                Others, pls specify:
              </div>
              <div>
                <?= !in_array($student_profile->getMotherEmployeeType(), $employeeTypes) ? $student_profile->getFatherEmployeeType() : br() ?>
              </div>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              <i>Highest Education Attainment</i>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getFatherEducationAttainment() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1">
              <i>Highest Education Attainment</i>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="2">
              <?= $student_profile->getMotherEducationAttainment() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              <i> Parent's Present Address</i>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="5">
              <?= $student_profile->getParentAddress() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1">
              <b>Parent's Marital Status</b>(Please mark (r) any of the following, which is
              applicable)
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="5">
              <div class="tw-grid tw-grid-cols-2 tw-gap-1 tw-min-w-[190px]">
                <?php foreach ($maritalStatuses as $mts): ?>
                  <div class="tw-flex tw-justify-start">
                    <div class="tw-text-[14pt] tw-flex-shrink">
                      <?= displayCheckbox($student_profile->getParentMaritalStatus() === $mts) ?>
                    </div>
                    <div class="tw-mr-3 tw-text-wrap">
                      <?= $mts ?>
                    </div>
                  </div>
                <?php endforeach ?>
              </div>
              <div>If Separated, with whom do you stay:</div>
              <div>
                <?= !in_array($student_profile->getParentMaritalStatus(), $maritalStatuses) ? $student_profile->getParentMaritalStatus() : br() ?>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2 class="tw-text-lg tw-font-semibold">
        EDUCATIONAL ATTAINMENT
      </h2>
      <table class="tw-w-full tw-border-collapse">
        <thead>
          <tr class="tw-border-2 tw-border-black tw-p-1">
            <th class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              &nbsp;
            </th>
            <th class="tw-border-2 tw-border-black tw-p-1 tw-min-w-[200px]">
              Name Of School
            </th>
            <th class="tw-border-2 tw-border-black tw-p-1 tw-min-w-[100px]">
              Year Graduated
            </th>
            <th class="tw-border-2 tw-border-black tw-p-1">
              Honor/s Received
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              Doctoral Degree
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getDoctoral() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getDoctoralGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getDoctoralHonors() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-text-right">
              <b> <i>Program:</i></b>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1" colspan="3">
              <?= $student_profile->getDoctoralProgram() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              Masteral Degree
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getMasteral() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getMasteralGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getMasteralHonors() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-text-right">
              <b><i>Program:</i></b>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 " colspan="3">
              <?= $student_profile->getMasteralProgram() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              College
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getCollege() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getCollegeGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getCollegeHonors() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-text-right">
              <b><i>Degree:</i></b>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 " colspan="3">
              <?= $student_profile->getCollegeProgram() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              Tech voc
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getTechvoc() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getTechvocGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getTechvocHonors() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              High School
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getHighschool() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getHighschoolGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getHighschoolHonors() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              ALS
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getAls() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getAlsGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getAlsHonors() ?>
            </td>
          </tr>
          <tr>
            <td class="tw-border-2 tw-border-black tw-p-1 tw-w-fit">
              Elementary
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getElementary() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getElementaryGraduated() ?>
            </td>
            <td class="tw-border-2 tw-border-black tw-p-1 ">
              <?= $student_profile->getElementaryHonors() ?>
            </td>
          </tr>
        </tbody>
      </table>
      <?= br(); ?>
      <table class="tw-w-full tw-border-collapse">
        <thead>
          <tr>
            <th class="tw-w-full tw-border-2 tw-border-black tw-p-1">
              Who is supporting your studies in SMCC?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tw-w-full tw-border-2 tw-border-black">
              <div class="tw-grid tw-grid-cols-4 tw-justify-start tw-items-center tw-gap-x-2 tw-flex-wrap">
                <?php foreach($supporting as $sup): ?>
                  <div class="tw-flex tw-justify-start tw-items-center tw-gap-x-2">
                    <div class="tw-text-[14pt] tw-flex-shrink">
                      <?= displayCheckbox($student_profile->getSupport() === $sup) ?>
                    </div>
                    <div>
                      <?= $sup ?>
                    </div>
                  </div>
                <?php endforeach ?>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2 class="tw-text-lg tw-font-semibold tw-uppercase">Family and Social Environment</h2>
      <table class="tw-w-full tw-border-collapse">
        <thead>
          <tr>
            <th class="tw-w-full tw-border-2 tw-border-black tw-p-1" colspan="2">
              <b>Name of Sister/Brother</b>
            </th>
            <th class="tw-w-full tw-border-2 tw-border-black tw-p-1">
              Age
            </th>
            <th class="tw-w-full tw-border-2 tw-border-black tw-p-1">
              Occupation
            </th>
            <th class="tw-w-full tw-border-2 tw-border-black tw-p-1 tw-text-nowrap">
              Educational Attainment
            </th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($student_profile->getSiblings() as $n => $sibling): ?>
            <tr>
              <td class="tw-max-w-fit tw-border-2 tw-border-black tw-p-1">
                <?= intval($n) + 1 ?>.
              </td>
              <td class="tw-w-full tw-border-2 tw-border-black tw-py-1 tw-px-2">
                <?= $sibling['name']?>
              </td>
              <td class="tw-w-fit tw-border-2 tw-border-black tw-py-1 tw-text-end tw-px-2">
                <?= $sibling['age']?>
              </td>
              <td class="tw-w-fit tw-border-2 tw-border-black tw-py-1 tw-px-2">
                <?= $sibling['occupation']?>
              </td>
              <td class="tw-w-auto tw-border-2 tw-border-black tw-py-1 tw-px-2">
                <?= $sibling['educational_attainment']?>
              </td>
            </tr>
          <?php endforeach ?>
        </tbody>
      </table>
      <table class="tw-w-full tw-border-collapse tw-mt-2">
        <tr>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1 tw-min-w-[200px]">
            Number of Person living at home
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-p-1 tw-text-center">
            <?= $student_profile->getHomePersonsLiving() ?>
          </td>
          <td colspan="2" class="tw-w-full tw-border-2 tw-border-black tw-p-1">
            <b><i>Is your homelife:</i></b>
            <div class="tw-grid tw-grid-cols-2">
              <?php foreach ($homelife as $hl): ?>
                <div class="tw-flex tw-gap-x-2">
                  <div class="tw-text-[14pt] tw-flex-shrink">
                    <?= displayCheckbox($student_profile->getHomelife() === $hl)?>
                  </div>
                  <div>
                    <?= $hl?>
                  </div>
                </div>
              <?php endforeach ?>
            </div>
          </td>
        </tr>
        <tr>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1">
            No. of Children in the family
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-p-1 tw-text-center">
            <?= $student_profile->getHomeChildren() ?>
          </td>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1 tw-min-w-[200px]">
            <b>
              <i>
                Do you work at home:
              </i>
            </b>
            <div class="tw-grid tw-grid-cols-2">
              <?php foreach (["Yes", "No"] as $hl): ?>
                <div class="tw-flex tw-gap-x-2">
                  <div class="tw-text-[14pt] tw-flex-shrink">
                    <?= displayCheckbox($student_profile->getWorkathome() === $hl)?>
                  </div>
                  <div>
                    <?= $hl?>
                  </div>
                </div>
              <?php endforeach ?>
            </div>
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-p-1 tw-min-w-[200px]">
            <b>
              <i>
                What/s work?
              </i>
            </b>
            <div>
              <?= $student_profile->getWork() ?>
            </div>
          </td>
        </tr>
        <tr>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1">
            What type of discipline is being implemented at home?
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-px-2 tw-py-1">
            <?= $student_profile->getDisciplineType() ?>
          </td>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1">
            Who handles discipline at home?
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-px-2 tw-py-1">
            <?= $student_profile->getDisciplineHandle() ?>
          </td>
        </tr>
        <tr>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1">
            What time do you sleep
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-px-2 tw-py-1">
            <?= $student_profile->getSleepTime() ?>
          </td>
          <td class="tw-w-fit tw-border-2 tw-border-black tw-p-1">
            Do you have friend?
            <div class="tw-grid tw-grid-cols-2">
              <?php foreach (["Yes", "No"] as $hl): ?>
                <div class="tw-flex tw-gap-x-2">
                  <div class="tw-text-[14pt] tw-flex-shrink">
                    <?= displayCheckbox($student_profile->getHaveFriends() === $hl)?>
                  </div>
                  <div>
                    <?= $hl?>
                  </div>
                </div>
              <?php endforeach ?>
            </div>
          </td>
          <td class="tw-w-full tw-border-2 tw-border-black tw-px-2 tw-py-1">
            <i>if yes, why do you
            choose him/her?</i>
            <div>
              <?= $student_profile->getWhyFriend() ?>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- <div>
      <div class="subjuct-like-div">
        <p>
          Subject/s you like the most: Snack
          why? hard
        </p>
      </div>
      <div class="subject-hate-div">
        <p>
          Subject/s you hate the most: Recess
          why? full
        </p>
      </div>
      <div class="leader-position-div">
        <p>
          What leadership position/s do you have in and out of school?<?= br(); ?>
          President
      </div>
      <div class="honor-distinct-div">
        <p>
          What honor/s distinctions did you receive in and out of school?<?= br(); ?>
          Fun
        </p>
      </div>
    </div> -->
    <div>
      <h2 class="tw-font-semibold tw-text-lg">INTERESTS:</h2>
      <div class="tw-border-2 tw-border-black tw-p-1">
        <div class="font-semibold">List down your present hobbies/interest:</div>
        <div class="tw-indent-4"><?= $student_profile->getHobbies() ?></div>
        <div class="font-semibold">What do you enjoy more than anything else?</div>
        <div class="tw-indent-4"><?= $student_profile->getEnjoy() ?></div>
        <div class="font-semibold">What organization/s do you belong in and out of school?</div>
        <div class="tw-indent-4"><?= $student_profile->getOrganizationOutOfSchool() ?></div>
      </div>
    </div>
    <div>
      <h2 class="tw-font-semibold tw-text-lg">
        HEALTH HISTORY
      </h2>
      <div class="tw-border-2 tw-border-black tw-p-1">
        <div class="tw-grid tw-grid-cols-4 tw-justify-start tw-items-center tw-gap-x-2 tw-flex-wrap">
          <?php foreach($health as $hh): ?>
            <div class="tw-flex tw-justify-start tw-items-center tw-gap-x-2">
              <div class="tw-text-[14pt] tw-flex-shrink">
                <?= displayCheckbox(in_array($hh, $student_profile->getHealthHistory())) ?>
              </div>
              <div class="tw-mr-3">
                <?= $hh ?>
              </div>
            </div>
          <?php endforeach ?>
          <div class="tw-flex tw-justify-start tw-items-center tw-gap-x-2">
            <div class="tw-text-[14pt] tw-flex-shrink">
              <?php $hh = $student_profile->getHealthHistory(); ?>
              <?= displayCheckbox(!in_array(end($hh), $health)) ?>
            </div>
            <div class="tw-mr-3 tw-col-span-2 tw-flex tw-gap-x-1">
              <div class="tw-text-nowrap">Others, Pls specify:</div>
              <div class="tw-text-wrap tw-border-b tw-border-black"><?= !in_array(end($hh), $health) ? end($hh) : "" ?></div>
            </div>
          </div>
        </div>
      </div>
      <?= br() ?>
      <div class="tw-flex tw-gap-x-2">
        <div class="tw-flex-shrink">
          Do you Exhibit certain mannerism? (Please specify):
        </div>
        <div class="tw-flex-grow tw-border-b tw-border-black tw-px-1">
          <?= $student_profile->getHealthExhibitMannerisms() ?>
        </div>
      </div>
      <div class="tw-flex tw-gap-x-2">
        <div class="tw-flex-shrink">
          Do you have any past operation? (Please specify):
        </div>
        <div class="tw-flex-grow tw-border-b tw-border-black tw-px-1">
          <?= $student_profile->getHealthPastOperations() ?>
        </div>
      </div>
      <div class="tw-flex tw-gap-x-2">
        <div class="tw-flex-shrink">
          Do you have any allergies? (Please Specify)
        </div>
        <div class="tw-flex-grow tw-border-b tw-border-black tw-px-1">
          <?= $student_profile->getHealthAllergies() ?>
        </div>
      </div>
    </div>
    <?= br() ?>
    <div>
      <h2 class="tw-font-semibold tw-text-lg">
        INDIGENOUS PEOPLE'S ACT
      </h2>
      <p>Pursuent to: (a) Indigenous People's Act (RA. 8371); (b) Magna Carta for Disabled Person (RA. 7277); and (c) Solo Parents Welfare act of 2000 (RA. 8972), Please answer the following:</p>
      <div class="tw-grid tw-grid-cols-6 tw-gap-x-2">
        <div class="tw-col-span-2">Are you a member of any indigenous group?</div>
        <div class="tw-flex tw-justify-start tw-items-start tw-gap-x-2">
          <div class="tw-text-[14pt] tw-flex-shrink">
            <?= displayCheckbox($student_profile->getIndigenousGroup() === "Yes") ?>
          </div>
          <div class="tw-mr-3">Yes</div>
          <div class="tw-text-[14pt] tw-flex-shrink">
            <?= displayCheckbox($student_profile->getIndigenousGroupSpecify() === "No") ?>
          </div>
          <div class="tw-mr-3">No</div>
        </div>
        <div class="tw-col-span-2">
          If <b>"YES"</b>, Please specify:
        </div>
        <div><?= $student_profile->getIndigenousGroupSpecify() ?>&nbsp;</div>
        <div class="tw-col-span-2">Are you differently abled?</div>
        <div class="tw-flex tw-justify-start tw-items-start tw-gap-x-2">
          <div class="tw-text-[14pt] tw-flex-shrink">
            <?= displayCheckbox($student_profile->getDifferentlyAbled() === "Yes") ?>
          </div>
          <div class="tw-mr-3">Yes</div>
          <div class="tw-text-[14pt] tw-flex-shrink">
            <?= displayCheckbox($student_profile->getDifferentlyAbled() === "No") ?>
          </div>
          <div class="tw-mr-3">No</div>
        </div>
        <div class="tw-col-span-2">
          If <b>"YES"</b>, Please specify:
        </div>
        <div><?= $student_profile->getDifferentlyAbledSpecify() ?>&nbsp;</div>
        <div class="tw-col-span-2">Are you a solo Parent?</div>
        <div class="tw-flex tw-justify-start tw-items-start tw-gap-x-2">
          <div class="tw-text-[14pt] tw-flex-shrink">
            <?= displayCheckbox($student_profile->getSoloParent() === "Yes") ?>
          </div>
          <div class="tw-mr-3">Yes</div>
          <div class="tw-text-[14pt] tw-flex-shrink">
            <?= displayCheckbox($student_profile->getSoloParent() === "No") ?>
          </div>
          <div class="tw-mr-3">No</div>
        </div>
        <div class="tw-col-span-2">
          If <b>"YES"</b>, Please specify:
        </div>
        <div><?= $student_profile->getSoloParentSpecify() ?>&nbsp;</div>
      </div>
    </div>
    <?= br() ?>
    <div class="tw-border tw-border-black tw-p-2">
      <p class="tw-text-justify">
        <b>NOTE:</b> If there is anything that you would like to share with your Guidance Counselor, which
        you think need assistance, feel free to write in a separate sheet of paper, Rest assured that
        everything would be kept under confidentiality and respect.
      </p>
    </div>
    <?= br() ?>
    <div>
      <p>
        I certify that the foreign information is true and correct, made in good faith and verified
        by me to the best of my knowledge and belief.
      </p>
      <?= br() ?>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-mt-4 tw-text-center tw-max-w-[300px] tw-leading-[1.3]">
          <div class="tw-border-b-2 tw-border-black">
            <?= $user->getFirstName() ?> <?= $user->getMiddleInitial() ? $user->getMiddleInitial() . ". " : "" ?> <?= $user->getLastName() ?>
          </div>
          <div>
            Student's Signature over Printed Name
          </div>
        </div>
        <div class="tw-flex tw-gap-x-2 tw-items-end tw-justify-end">
          <div>Date:</div>
          <div class="tw-border-b tw-border-b-black tw-text-center"><?= $student_profile->getUpdatedAt()->format("F j, Y") ?>&nbsp;</div>
        </div>
      </div>
      <?= br() ?>
      <?= br() ?>
      <?= br() ?>
      <footer class="tw-flex-grow tw-min-h-[1.0in-0.1in]">
        <div class="tw-flex ">
          <div class="tw-w-[200px]">
            <img src="<?= pathname('images/formlabel2.png') ?>" alt="SMCC Logo">
          </div>
          <div class="tw-w-[600px]">
            <img src="<?= pathname('images/form-footer.png') ?>" alt="SMCC Logo">
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
<?php endif ?>