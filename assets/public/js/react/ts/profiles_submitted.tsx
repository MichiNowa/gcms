// @ts-ignore
import {
  React, ReactDOM, ReactDOMServer, Swal, clsx, pathname, usePageData,
}
  // @ts-ignore
  from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType, TableColumn } from "./table.mjs";

const $pageRoot = $("#page-root");

enum StatusValue {
  Pending = "pending",
  Completed = "completed",
  Rejected = "rejected",
}

enum Gender {
  Male = "Male",
  Female = "Female",
}

interface UserInfo {
  id: number;
  username: string;
  first_name: string;
  middle_initial: string;
  last_name: number;
  gender: Gender;
  email: string;
  profile_pic: string;
  status: boolean;
}

interface BasicStatus {
  id: number;
  basic_id: number;
  status: StatusValue;
  reason: string;
  created_at: string;
  updated_at: string;
}

interface CollegeStatus {
  id: number;
  college_id: number;
  status: StatusValue;
  reason: string;
  created_at: string;
  updated_at: string;
}

interface CollegeStudentInfo {
  id: number;
  user_id: number;
  schoolyear_id: number;
  student_profile_id: number;
  department: string;
  yearlevel: number;
  course: string;
  dean: string;
  created_at: string;
  updated_at: string;
}

interface BasicStudentInfo {
  id: number;
  user_id: number;
  schoolyear_id: number;
  student_profile_id: number;
  gradelevel: number;
  section: string;
  adviser: string;
  created_at: string;
  updated_at: string;
}

interface AssessmentFormItem {
  id: string;
  item: string;
  alarming: boolean;
}

interface AssessmentForm {
  id: number;
  schoolyear_id: number;
  category_name: string;
  items: string | AssessmentFormItem[];
  created_at: string;
  updated_at: string;
}

interface AssessmentResponse {
  id: string;
  response: boolean;
}

interface Assessment {
  id: number;
  user_id: number;
  assessment_form_id: number;
  assessment_response: string | AssessmentResponse[];
}

interface DataValue {
  student_info: {
    profile: BasicStudentInfo | CollegeStudentInfo;
    user: UserInfo;
  };
  student_profile: any;
  profile_status?: BasicStatus | CollegeStatus | null;
  assessment: {
    assessment_forms: AssessmentForm[];
    assessment_responses: Assessment[];
    assessment_score: number | false;
  };
  case_notes?: number;
  called_slip?: number;
  referral_forms?: number;
  agreement_forms?: number;
}

type DataValueType = DataValue[] | undefined;

interface AllDataValues {
  sy: string;
  value: DataValueType;
}

function displayDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function displayNominal(num: number) {
  return num.toString().endsWith("1")
    ? num + "st"
    : num.toString().endsWith("2")
      ? num + "nd"
      : num.toString().endsWith("3")
        ? num + "rd"
        : num + "th";
}

enum Education {
  Basic = "basic",
  College = "college",
  None = "",
}

function SelectedCheckbox({
  checked,
  title,
  id,
}: {
  checked: boolean;
  title: string;
  id: string;
}) {
  return (
    <div className="tw-flex tw-items-center">
      <input
        type="checkbox"
        id={id + "__checkbox"}
        className="tw-peer tw-hidden disabled:tw-cursor-default"
        checked={checked}
        title={title}
        disabled
      />
      <label
        htmlFor={id + "__checkbox"}
        className="tw-flex tw-items-center"
        title={title}
      >
        <span
          className={
            "tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-lg"
          }
        >
          {checked && <i className="bx bxs-check-square"></i>}
          {!checked && <i className="bx bx-checkbox"></i>}
        </span>
      </label>
    </div>
  );
}

function ViewAssessmentComponent({
  assessmentForms,
  assessmentResponses,
  assessmentScore,
  student,
}: {
  assessmentForms: AssessmentForm[];
  assessmentResponses: Assessment[];
  assessmentScore: number;
  student: {
    id: number; // id of the profile status table
    student_id: number;
    name: string;
    course?: string;
    level: number | string;
    education: Education;
  };
}) {
  const getAssessmentResponseCheck = React.useCallback(
    (item: AssessmentFormItem) =>
      assessmentResponses.reduce(
        (init: boolean, val: Assessment) =>
          !!init ||
          !!(val.assessment_response as AssessmentResponse[]).reduce(
            (res: boolean, ar: AssessmentResponse) =>
              res || (item.id.toString() === ar.id.toString() && !!ar.response),
            false
          ),
        false
      ),
    []
  );
  return (
    <>
      <div className="tw-flex tw-gap-x-4">
        <div>Name: {student.name}</div>
        <div>
          {student.education === Education.Basic
            ? "Grade Level: " + student.level
            : "Year Level: " + student.level}
        </div>
        <div>
          {student.education === Education.College
            ? "Course: " + student.course
            : ""}
        </div>
      </div>
      <h3
        className={clsx(
          assessmentScore > 75
            ? "tw-text-red-600"
            : assessmentScore > 50
              ? "tw-text-orange-600"
              : assessmentScore > 25
                ? "tw-text-yellow-600"
                : "tw-text-green-600"
        )}
      >
        Assessment Result:{" "}
        {assessmentScore < 25
          ? "Strongly Positive"
          : assessmentScore < 50
            ? "Somewhat Neutral"
            : assessmentScore < 75
              ? "Strongly Negative"
              : "Urgent Attention Needed"}
      </h3>
      <div className="tw-flex tw-gap-3 tw-items-start tw-flex-wrap tw-justify-center">
        {assessmentForms?.map((forms) => (
          <div className="tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600 tw-items-start">
            <div className="tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200">
              <div className="tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase">
                {forms?.category_name}
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right">
              {(forms?.items as AssessmentFormItem[])?.map(
                (item: AssessmentFormItem) => (
                  <div
                    className={clsx(
                      "tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm",
                      !!item.alarming ? "tw-text-red-600" : "tw-text-gray-600"
                    )}
                  >
                    <div className="tw-flex tw-flex-shrink tw-items-center tw-text-right tw-text-[40pt]">
                      <SelectedCheckbox
                        checked={getAssessmentResponseCheck(item)}
                        id={item.id}
                        title={item.item}
                      />
                    </div>
                    <div className="tw-flex tw-flex-grow tw-items-start">
                      <div className="tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px] tw-text-left">
                        {item.item}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="tw-flex tw-justify-between tw-items-start">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            window.open(
              new URL(
                pathname(
                  `/assessment/make/calledslip?id=${student.id}&educ=${student.education}`
                ),
                window.location.origin
              )
            )
          }
        >
          <i className="bx bxs-phone-call"></i> Make a Called-In Slip for the
          student
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            window.open(
              new URL(
                pathname(
                  `/print?form=student_assessment&id=${student.student_id
                  }&assessments=${assessmentForms
                    .map((v: AssessmentForm) => v.id)
                    .join("-")}`
                ),
                window.location.origin
              )
            )
          }
        >
          <i className="bx bxs-printer"></i> Print
        </button>
      </div>
    </>
  );
}

function sendReminderNotification(
  sy: string | number,
  syid: string | number,
  student_id: string | number,
  onSuccess: any,
  onError: any
) {
  try {
    const broadcastUrl = new URL(
      pathname("/api/post/send/notification"),
      window.location.origin
    );
    const homepage = new URL(pathname("/"), window.location.origin).toString();
    const bodyHTMLString = ReactDOMServer.renderToString(
      <>
        <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
          <table
            style={{ width: "100%", border: 0, borderCollapse: "collapse" }}
          >
            <tr>
              <td style={{ padding: "20px" }} align="center">
                <table style={{ width: "600px", border: "1px solid #cccccc" }}>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#4CAF50",
                        padding: "20px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "24px",
                      }}
                    >
                      Guidance Office (SMCC)
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "20px",
                        textAlign: "left",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      <p>
                        We would like to remind you to submit your{" "}
                        <a href={homepage + "assess"}>
                          Student Self-Assessment Form
                        </a>{" "}
                        for S.Y. {sy} on Guidance Counseling Management System
                        (SMCC).
                        <br />
                        Thank you.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#f1f1f1",
                        padding: "10px",
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#555555",
                      }}
                    >
                      <a
                        href="https://www.smccnasipit.edu.ph"
                        style={{ color: "#555555" }}
                      >
                        Saint Michael College of Caraga
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#f1f1f1",
                        padding: "10px",
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#555555",
                      }}
                    >
                      <a href={homepage} style={{ color: "#555555" }}>
                        Guidance Office (SMCC)
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </>
    );
    const postData = {
      syid,
      student_id,
      subject: `Reminder on Student Self-Assessment Form | Guidance Office (SMCC)`,
      body: bodyHTMLString.replaceAll("\n", "").trim(),
      title: "Reminder on Student Self-Assessment Form Submission",
      message: `Reminding you to submit your <a href="${homepage + "assess"
        }">Student Self-Assessment Form</a> for S.Y. ${sy}. Thank you.`,
      href: "/assess",
    };
    // Broadcast notification to all users
    $.post(broadcastUrl.toString(), postData)
      .done(function ({ success, error }: any) {
        console.log(success, error);
        if (success) {
          onSuccess && onSuccess(success);
        } else if (error) {
          onError && onError(error);
        }
      })
      .fail(function (_: any, statusText: any) {
        console.log("Something went wrong", statusText);
        onError && onError(statusText);
      });
  } catch (error) {
    console.error("Error broadcasting notification:", error);
    onError && onError(error);
  }
}

function ProfilesSubmitted() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { school_years, all_profiles, gradeyear } = usePageData(setIsLoading);
  const [selectedSchoolYear, setSelectedSchoolYear] = React.useState<string>((new Date()).getFullYear().toString());
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("");
  const [selectedProgramSection, setSelectedProgramSection] = React.useState<string>("");
  const [selectedAssessScore, setSelectedAssessScore] = React.useState<string>("");
  const { profiles, sy, syid, assessment_open } = React.useMemo(() => {
    const selSy = Array.isArray(school_years) ? school_years.find((yr: any) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
    let profiles = Array.isArray(all_profiles) ? all_profiles.find((prof: AllDataValues) => prof.sy.toString() === selSy?.year?.toString()) : undefined;
    profiles = !!profiles?.profiles ? [...(profiles.profiles)] : [];
    return {
      profiles,
      sy: selSy?.year,
      syid: selSy?.id,
      assessment_open: selSy?.editable !== undefined && !selSy.editable ? true : false,
    }
  }, [school_years, all_profiles, selectedSchoolYear]);
  const data = React.useMemo<DataValueType>(
    () => profiles as DataValueType,
    [profiles]
  );
  const education = React.useMemo<Education>(
    () =>
      gradeyear > 0 && gradeyear < 5
        ? Education.College
        : gradeyear > 6 && gradeyear < 13
          ? Education.Basic
          : Education.None,
    [gradeyear]
  );
  const departmentOptions = React.useMemo<{ label: string, value: string }[]>(() => {
    const result: { label: string, value: string }[] = [];
    if (education) {
      const departments = data.map((d: DataValue) => (d.student_info?.profile as CollegeStudentInfo)?.department);
      departments.forEach((department: string) => {
        if (!!department) {
          if (!result.some(d => d.label === department)) {
            result.push({ label: department, value: department });
          }
        }
      })
    }
    return result;
  }, [education, data]);
  const assessmentScoreOptions = React.useMemo<{ label: string, value: string }[]>(() => {
    const result: { label: string, value: string }[] = [];
    [null, 75, 50, 25, 0].forEach(d => result.push({
      label: d === null ? 'No Assessment'
        : d === 75 ? 'Urgent assessment (Red)'
          : d === 50 ? 'Strongly Negative (Orange)'
            : d === 25 ? 'Somewhat Neutral (Yellow)'
              : 'Strongly Positive (Green)',
      value: d?.toString() || '-1',
    }))
    return result;
  }, []);
  const programSectionOptions = React.useMemo<{ label: string, value: string }[]>(() => {
    const result: { label: string, value: string }[] = [];
    if (education === "basic") {
      const sections = data.map((d: DataValue) => (d.student_info?.profile as BasicStudentInfo)?.section);
      sections.forEach((section: string) => {
        if (!!section) {
          if (!result.some(d => d.label === section)) {
            result.push({ label: section, value: section });
          }
        }
      })
    } else if (education === "college") {
      if (!selectedDepartment) {
        const courses = data.map((d: DataValue) => (d.student_info?.profile as CollegeStudentInfo)?.course);
        courses.forEach((course: string) => {
          if (!!course) {
            if (!result.some(d => d.label === course)) {
              result.push({ label: course, value: course });
            }
          }
        })
      } else {
        const courses = data.filter((d: DataValue) => (d.student_info?.profile as CollegeStudentInfo)?.department?.toString() === selectedDepartment).map((d: DataValue) => (d.student_info?.profile as CollegeStudentInfo)?.course);
        courses.forEach((course: string) => {
          if (!!course) {
            if (!result.some(d => d.label === course)) {
              result.push({ label: course, value: course });
            }
          }
        })
      }
    }
    return result;
  }, [selectedDepartment, education, data]);

  const columns: TableColumn[] = React.useMemo(
    () =>
      education === Education.College
        ? [
          {
            label: "Photo",
            key: "profile_pic",
            sortable: true,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "Student ID",
            key: "username",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Center,
          },
          {
            label: "Name",
            key: "name",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Gender",
            key: "gender",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Year Level",
            key: "yearlevel",
            sortable: true,
            cellType: TableCellType.Number,
            align: CellAlign.Center,
          },
          {
            label: "Course",
            key: "course",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Department",
            key: "department",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Dean",
            key: "dean",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Assessment",
            key: "assessment",
            sortable: true,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "View Profile",
            key: "profile",
            sortable: true,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "View Summary",
            key: "summary",
            sortable: false,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "Submitted Date",
            key: "created_at",
            sortable: true,
            cellType: TableCellType.Date,
            align: CellAlign.Center,
          },
        ]
        : [
          {
            label: "Photo",
            key: "profile_pic",
            sortable: true,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "Student ID",
            key: "username",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Center,
          },
          {
            label: "Name",
            key: "name",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Gender",
            key: "gender",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Grade Level",
            key: "gradelevel",
            sortable: true,
            cellType: TableCellType.Number,
            align: CellAlign.Center,
          },
          {
            label: "Adviser",
            key: "adviser",
            sortable: true,
            cellType: TableCellType.String,
            align: CellAlign.Left,
          },
          {
            label: "Assessment",
            key: "assessment",
            sortable: true,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "View Profile",
            key: "profile",
            sortable: true,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "View Summary",
            key: "summary",
            sortable: false,
            cellType: TableCellType.Custom,
            align: CellAlign.Center,
          },
          {
            label: "Submitted Date",
            key: "created_at",
            sortable: true,
            cellType: TableCellType.Date,
            align: CellAlign.Center,
          },
        ],
    [education]
  );

  const onViewAssessment = React.useCallback(
    (item: DataValue) => {
      if (!assessment_open) {
        Swal.fire({
          icon: "info",
          title: "Assessment Not Open",
          text: "Assessment Not Open Yet",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        return;
      }
      if (item.assessment.assessment_score === false) {
        return Swal.fire({
          title:
            "Do you want to remind student to submit their assessment form?",
          text: "Assessment Not Submitted Yet",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then(({ isConfirmed }: any) => {
          if (isConfirmed) {
            sendReminderNotification(
              sy,
              syid,
              item.student_info?.user?.id,
              (success: string) => {
                Swal.fire({
                  icon: "success",
                  title: "Reminder Sent",
                  text: success,
                  showConfirmButton: false,
                  timer: 2000,
                });
              },
              (error: string) => {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: error,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            );
          }
        });
      } else {
        const assessmentForms = item.assessment.assessment_forms.map((v) => ({
          ...v,
          items: JSON.parse(v.items as string),
        }));
        const assessmentResponses = item.assessment.assessment_responses.map(
          (v) => ({
            ...v,
            assessment_response: JSON.parse(v.assessment_response as string),
          })
        );
        const assessmentScore = item.assessment.assessment_score;
        const $vmodal = $("#view-assessment-submission");
        const $submissionRoot = $vmodal.find("#assessment-submission-root");
        const afroot = ReactDOM.createRoot($submissionRoot.get(0));
        // @ts-ignore
        $vmodal.modal("show");
        $vmodal.on("hidden.bs.modal", function () {
          $submissionRoot.empty();
        });
        afroot.render(
          <ViewAssessmentComponent
            student={{
              id: item.profile_status!.id,
              student_id: item.student_info.user!.id,
              name: `${item.student_info.user.first_name} ${item.student_info.user.middle_initial
                ? item.student_info.user.middle_initial + ". "
                : ""
                }${item.student_info.user.last_name}`,
              level:
                education === Education.Basic
                  ? (item.student_info.profile as BasicStudentInfo).gradelevel
                  : (item.student_info.profile as CollegeStudentInfo).yearlevel,
              course: (item.student_info.profile as CollegeStudentInfo).course,
              education,
            }}
            assessmentForms={assessmentForms}
            assessmentResponses={assessmentResponses}
            assessmentScore={assessmentScore}
          />
        );
      }
    },
    [education, syid, assessment_open]
  );


  const onViewProfile = React.useCallback(
    (item: DataValue) => {
      const $vmodal = $("#view-student-profile-submission");
      $vmodal
        .find("img#profile_pic")
        .attr("src", pathname(item.student_profile.profile_pic));
      if (item.profile_status?.status === "pending") {
        const $approveBtn = $("<button>");
        const $rejectBtn = $("<button>");
        $approveBtn.attr("type", "button");
        $rejectBtn.attr("type", "button");
        $approveBtn.addClass("btn btn-success");
        $rejectBtn.addClass("btn btn-danger");
        $approveBtn.text("Approve");
        $rejectBtn.text("Reject");
        $approveBtn.on("click", function () {
          $("button#view-profile-close-btn").on("click", function () {
            $approveBtn.off("click");
            $rejectBtn.off("click");
          });
          Swal.fire({
            icon: "question",
            title: "Approve this student profile?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve",
            cancelButtonText: "No, Cancel",
          }).then(({ isConfirmed }: any) => {
            if (isConfirmed) {
              const url = new URL(
                pathname("/api/post/profile/approve"),
                window.location.origin
              );
              $.post(url.toString(), { id: item.profile_status?.id, education })
                .done(function ({ success, error }: any) {
                  if (error) {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: error,
                    });
                  } else {
                    Swal.fire({
                      icon: "success",
                      title: "Profile Approved",
                      text: success,
                      showConfirmButton: false,
                      timer: 2000,
                    }).then(() => {
                      window.location.reload();
                    });
                  }
                })
                .fail(function (_: any, textStatus: any) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Request failed: " + textStatus,
                  });
                });
            }
          });
        });
        $rejectBtn.on("click", function () {
          // @ts-ignore
          $vmodal.modal("hide");
          Swal.fire({
            icon: "question",
            title: "Reject student profile?",
            input: "textarea",
            inputPlaceholder: "Reason for rejection",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject",
            cancelButtonText: "No, Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (reason: string) => {
              return new Promise((res, rej) => {
                const url = new URL(
                  pathname("/api/post/profile/reject"),
                  window.location.origin
                );
                $.post(url.toString(), {
                  id: item.profile_status?.id,
                  reason,
                  education,
                })
                  .done(function ({ success, error }: any) {
                    if (error) {
                      rej(error);
                    } else {
                      res(success);
                    }
                  })
                  .fail((_: any, textStatus: any) => rej(textStatus));
              })
                .then((response) => response)
                .catch((error) => {
                  Swal.showValidationMessage(`
                  Failed: ${error}
                `);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then(({ isConfirmed, value }: any) => {
            if (isConfirmed) {
              Swal.fire({
                icon: "success",
                title: value,
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                window.location.reload();
              });
            } else {
              // @ts-ignore
              $vmodal.modal("show");
            }
          });
        });
        $("#view-profile-button-container")
          .empty()
          .append($approveBtn)
          .append($rejectBtn);
        $("#view-profile-status")
          .removeClass("tw-text-green-500")
          .removeClass("tw-text-red-500")
          .addClass("tw-text-gray-500")
          .text("Status: Pending");
      } else if (item.profile_status?.status === "rejected") {
        $("#view-profile-button-container").empty();
        const $reasonBtn = $("<button>");
        $reasonBtn.addClass("btn btn-danger");
        $reasonBtn.text("View Rejected Reason");
        $reasonBtn.on("click", function () {
          $("button#view-profile-close-btn").on("click", function () {
            $reasonBtn.off("click");
          });
          Swal.fire({
            title: "Rejected Reason",
            text: item.profile_status?.reason,
            confirmButtonText: "Close",
          });
        });
        $("#view-profile-button-container").empty().append($reasonBtn);
        $("#view-profile-status")
          .removeClass("tw-text-green-500")
          .removeClass("tw-text-gray-500")
          .addClass("tw-text-red-500")
          .text("Status: Rejected");
      } else if (item.profile_status?.status === "completed") {
        $("#view-profile-button-container")
          .empty()
          .text(
            "Completed: " +
            new Date(item.profile_status!.updated_at!).toLocaleDateString()
          );
        $("#view-profile-status")
          .removeClass("tw-text-red-500")
          .removeClass("tw-text-gray-500")
          .addClass("tw-text-green-500")
          .text("Status: Completed");
      }
      const $iframe = $("<iframe>");
      $iframe.attr("width", "100%");
      $iframe.attr("height", "500");
      $iframe.attr(
        "src",
        pathname(
          `/print?form=student_profile&id=${item.profile_status?.id || ""
          }&education=${education}`
        )
      );
      $("#iframe-container").empty().append($iframe);
    },
    [education]
  );

  const resetSummary = React.useCallback(() => {
    const $summaryModal = $("#view-student-summary-modal");
    $summaryModal
      .find("#view-records")
      .off("click");
    $summaryModal.find("#view-photo").attr("src", "");
    $summaryModal.find("#view-full-name").text("");
    $summaryModal.find("#view-department-gradelevel").text("");
    $summaryModal.find("#view-year-course").text("");
  }, []);

  const onViewSummary = React.useCallback((item: DataValue) => {
    const $summaryModal = $("#view-student-summary-modal");
    $summaryModal
      .find("#view-records")
      .on("click", function () {
        const url = new URL(pathname('/print'), window.location.origin);
        url.searchParams.append('form', "summary_records");
        url.searchParams.append('sy', syid)
        url.searchParams.append('year', sy)
        url.searchParams.append('uid', item?.student_info?.user?.id?.toString() || "")
        window.open(url.toString(), "_blank")
      });
    $summaryModal
      .find("#view-photo")
      .attr(
        "src",
        pathname(item.student_profile.profile_pic || "/images/default-user.png")
      );
    $summaryModal
      .find("#view-full-name")
      .text(
        `${item.student_info.user.last_name}, ${item.student_info.user.first_name
        } ${item.student_info.user.middle_initial
          ? item.student_info.user.middle_initial + "."
          : ""
        }`
      );
    $summaryModal
      .find("#view-department-gradelevel")
      .text(
        (item.student_info.profile as CollegeStudentInfo)?.department ||
        (!!(item.student_info.profile as BasicStudentInfo)?.gradelevel
          ? `Grade ${(item.student_info.profile as BasicStudentInfo)?.gradelevel
          }`
          : "")
      );
    $summaryModal
      .find("#view-year-course")
      .text(
        !!(item.student_info.profile as CollegeStudentInfo).yearlevel
          ? displayNominal(
            (item.student_info.profile as CollegeStudentInfo).yearlevel
          ) +
          " " +
          (item.student_info.profile as CollegeStudentInfo).course
          : ""
      );
    $summaryModal
      .find("#view-student-profile")
      .text(item.profile_status?.status || "");
    $summaryModal
      .find("#view-case-notes")
      .text(item.case_notes?.toString() || "0");
    $summaryModal
      .find("#view-called-slip")
      .text(item.called_slip?.toString() || "0");
    $summaryModal
      .find("#view-self-assessment")
      .text(
        item.assessment.assessment_score === false ? "Pending" : "Completed"
      );
    // $summaryModal
    //   .find("#view-referral-forms")
    //   .text(item.referral_forms?.toString() || "0");
    $summaryModal
      .find("#view-agreement-forms")
      .text(item.agreement_forms?.toString() || "0");
  }, [syid, sy]);

  const items = React.useMemo(
    () => {
      let d = !data ? [] : [...data];
      if (!!selectedDepartment && education === "college") {
        d = d.filter((item: DataValue) =>
          (item.student_info.profile as CollegeStudentInfo)?.department?.toString() === selectedDepartment.toString()
        );
      }
      if (!!selectedAssessScore) {
        console.log(selectedAssessScore, d);
        d = d.filter((item: DataValue) =>
          (selectedAssessScore === "-1" && item.assessment.assessment_score === false) || (
            selectedAssessScore === "75" && item.assessment.assessment_score as number >= 75
          ) || (
            selectedAssessScore === "50" && item.assessment.assessment_score as number >= 50 && item.assessment.assessment_score as number < 75
          ) || (
            selectedAssessScore === "25" && item.assessment.assessment_score as number >= 25 && item.assessment.assessment_score as number < 50
          ) || (
            selectedAssessScore === "0" && item.assessment.assessment_score !== false && item.assessment.assessment_score >= 0 && item.assessment.assessment_score as number < 25
          )
        );
      }
      if (!!selectedProgramSection) {
        d = d.filter((item: DataValue) =>
          education === "basic"
            ? (item.student_info.profile as BasicStudentInfo)?.section === selectedProgramSection
            : (item.student_info.profile as CollegeStudentInfo)?.course === selectedProgramSection
        );
      }
      console.log('score:', d);
      return d?.map((item: DataValue) => ({
        id: item.profile_status?.id,
        profile_pic: {
          value: item.student_info.user.profile_pic || "none",
          content: (
            <img
              src={new URL(
                pathname(
                  item.student_profile.profile_pic || "/images/default-user.png"
                )
              ).toString()}
              alt="Profile Pic"
              width="30"
              height="30"
              className="tw-mx-auto tw-w-[30px] tw-h-[30px]"
            />
          ),
        },
        username: item.student_info.user.username,
        name: `${item.student_info.user.first_name} ${item.student_info.user.middle_initial
          ? item.student_info.user.middle_initial + ". "
          : ""
          }${item.student_info.user.last_name}`,
        gender: item.student_info.user.gender,
        yearlevel: (item.student_info.profile as CollegeStudentInfo).yearlevel,
        course: (item.student_info.profile as CollegeStudentInfo).course,
        department: (item.student_info.profile as CollegeStudentInfo)
          .department,
        dean: (item.student_info.profile as CollegeStudentInfo).dean,
        gradelevel: (item.student_info.profile as BasicStudentInfo).gradelevel,
        adviser: (item.student_info.profile as BasicStudentInfo).adviser,
        assessment: {
          value:
            item.assessment.assessment_score == false
              ? "0"
              : item.assessment.assessment_score.toString(),
          content: (
            <div>
              <button
                type="button"
                onClick={() => onViewAssessment(item)}
                className={clsx(
                  "tw-border-2 tw-rounded-full tw-w-[25px] tw-h-[25px]",
                  item.assessment.assessment_score === false
                    ? "tw-bg-gray-500"
                    : item.assessment.assessment_score > 75
                      ? "tw-bg-red-500"
                      : item.assessment.assessment_score > 50
                        ? "tw-bg-orange-500"
                        : item.assessment.assessment_score > 25
                          ? "tw-bg-yellow-500"
                          : "tw-bg-green-500"
                )}
              >
                &nbsp;
              </button>
            </div>
          ),
        },
        profile: {
          value: item.profile_status?.status,
          content: (
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#view-student-profile-submission"
              onClick={() => onViewProfile(item)}
              className={clsx(
                "tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-text-nowrap",
                item.profile_status?.status === "pending"
                  ? "tw-bg-yellow-300 hover:tw-bg-yellow-200"
                  : item.profile_status?.status === "rejected"
                    ? "tw-bg-red-300 hover:tw-bg-red-200"
                    : item.profile_status?.status === "completed"
                      ? "tw-bg-green-400 hover:tw-bg-green-200"
                      : "tw-bg-gray-300 hover:tw-bg-gray-200"
              )}
            >
              <i
                className={clsx(
                  "bx",
                  item.profile_status?.status === "pending"
                    ? "bx-time-five"
                    : item.profile_status?.status === "rejected"
                      ? "bx-x"
                      : item.profile_status?.status === "completed"
                        ? "bx-check"
                        : "bx-question-mark"
                )}
              ></i>
              &nbsp;<span>View Submitted</span>
            </button>
          ),
        },
        summary: (
          <button
            type="button"
            onClick={() => onViewSummary(item)}
            className="tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-blue-400 hover:tw-bg-blue-200"
            data-bs-toggle="modal"
            data-bs-target="#view-student-summary-modal"
          >
            View Summary
          </button>
        ),
        created_at: item.profile_status?.created_at
          ? displayDate(item.profile_status.created_at)
          : displayDate(item.student_info.profile.created_at),
      })) || []
    }, [data, selectedDepartment, selectedProgramSection, selectedAssessScore]
  );

  const displayTitle = React.useCallback(
    () =>
      education === Education.College
        ? gradeyear == 1
          ? "1st Year Student Profiles"
          : gradeyear == 2
            ? "2nd Year Student Profiles"
            : gradeyear == 3
              ? "3rd Year Student Profiles"
              : "4th Year Student Profiles"
        : "Grade " + gradeyear + " Student Profiles",
    [gradeyear, education]
  );

  React.useEffect(() => {
    $("#view-student-summary-modal")
      .find("#view-close-btn")
      .click(function () {
        resetSummary();
      });
    $("button#view-profile-close-btn").on("click", function () {
      $("#iframe-container").empty();
      $("#view-profile-button-container").empty();
      $("#view-profile-status").empty();
    });
  }, []);

  if (isLoading) {
    return (
      <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
    );
  }

  return (
    <div className="tw-container tw-mt-4">
      <h2>{displayTitle()}</h2>
      <div>
        <label>School Year: </label>
        <div className="tw-max-w-[300px]">
          <div className="select-wrapper">
            <select className="form-select" value={selectedSchoolYear} onChange={(e) => setSelectedSchoolYear(e.target.value)}>
              <option value="" disabled>School Year</option>
              {school_years?.map((yr: any) => (
                <option key={"year_" + yr.id} value={yr.year}>
                  S.Y {yr.year} - {Number.parseInt(yr.year) + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <br />
      <Table columns={columns} items={items}>
        {education === "college" && (
          <div className="select-wrapper">
            <select className="form-select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">
                Department
              </option>
              {departmentOptions.map((opt: { label: string, value: string }) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {(
          <div className="select-wrapper">
            <select className="form-select" value={selectedProgramSection} onChange={(e) => setSelectedProgramSection(e.target.value)}>
              <option value="">
                {education === "college" ? "Program/Course" : "Section"}
              </option>
              {programSectionOptions.map((opt: { label: string, value: string }) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {(
          <div className="select-wrapper">
            <select className="form-select" value={selectedAssessScore} onChange={(e) => setSelectedAssessScore(e.target.value)}>
              <option value="">
                Assessment Score
              </option>
              {assessmentScoreOptions.map((opt: { label: string, value: string }) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </Table>
    </div>
  );
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(ProfilesSubmitted));
