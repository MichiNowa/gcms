// @ts-ignore
import { clsx, pathname, React, ReactDOM, ReactDOMServer, Swal, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, SortOrder, Table, TableCellType, TableColumn } from "./table.mjs";

const $pageRoot = $("#page-root");

const abb:any = {
  'College of Arts and Sciences': 'CAS',

  'College of Business Management and Accountancy': 'CBMA',

  'College of Computing and Information Sciences': 'CCIS',

  'College of Criminal Justice Education': 'CCJE',

  'College of Teacher Education': 'CTE',

  'College of Tourism and Hospitality Management': 'CTHM',

  'Basic Education': 'BasicEd',
}

enum Gender {
  Male = "Male",
  Female = "Female",
}

enum Education {
  Basic = "basic",
  College = "college",
  None = ""
}

interface CollegeStudentInfo {
  id: number
  user_id: number
  schoolyear_id: number
  student_profile_id: number
  department: string
  yearlevel: number
  course: string
  dean: string
  created_at: string
  updated_at: string
}

interface BasicStudentInfo {
  id: number
  user_id: number
  schoolyear_id: number
  student_profile_id: number
  gradelevel: number
  section: string
  adviser: string
  created_at: string
  updated_at: string
}

interface UserInfo {
  id: number
  username: string
  first_name: string
  middle_initial: string
  last_name: number
  gender: Gender
  email: string
  profile_pic: string
  status: boolean
}


interface AssessmentFormItem {
  id: string
  item: string
  alarming: boolean
}

interface AssessmentForm {
  id: number
  schoolyear_id: number
  category_name: string
  items: string | AssessmentFormItem[]
  created_at: string
  updated_at: string
}

interface AssessmentResponse {
  id: string
  response: boolean
}

interface Assessment {
  id: number
  user_id: number
  assessment_form_id: number
  assessment_response: string | AssessmentResponse[]
}

enum InteractionType {
  Individual = 'Individual',
  Group = 'Group',
  CalledIn = 'Called-in',
  WalkedIn = 'Walked-in',
  Referred = 'Referred',
  FollowUp = 'Follow-up',
}

const columns: TableColumn[] = [
  { label: "Schedule", key: "schedule", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Student ID", key: "student_id", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Photo", key: "profile_pic", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "First Name", key: "first_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
  { label: "Middle Initial", key: "middle_initial", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Last Name", key: "last_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
  { label: "Suffix", key: "suffix_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Level/Department", key: "department", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Grade/Year", key: "level", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Section/Course", key: "sectioncourse", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Type of Counseling", key: "interaction_type", sortable: false, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Case Note", key: "case_note", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Agreement Form", key: "agreement_form", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Counselor", key: "counselor", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Documentation", key: "referral_form", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
];

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function getNominal(n: number) {
  return n.toString().endsWith("1")
    ? n + 'st'
    : n.toString().endsWith("2")
      ? n + 'nd'
      : n.toString().endsWith("3")
        ? n + 'rd'
        : n + 'th';
}

function displayLevel(level?: number) {
  if (!level) return "";
  return level < 5 ? getNominal(level) + " Year" : "Grade " + (level?.toString() || "");
}

function displayDateTime(dateTime: string | undefined | null, defaultString?: string) {
  if (!dateTime) return defaultString;
  const scheduleDate = new Date(dateTime);
  return scheduleDate.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" }) + ' @ ' + scheduleDate.toLocaleTimeString('en-PH', { hour12: true });
}

function dateIsBeforeNow(dateTime: string) {
  if (!dateTime) return true;
  const scheduleDate = new Date(dateTime);
  return Date.now() > scheduleDate.getTime();
}

function displayDate(date: string, defaultString: string = "") {
  if (!date) return defaultString;
  const dateObj = new Date(date);
  // format date in MMMM d, YYYY
  return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}

function UploadDragAndDropImage({
  onSelectedFile,
  filesToUpload = 1,
}: {
  onSelectedFile: (files: File[]) => void,
  filesToUpload?: number
}) {
  const [file, setFile] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const dropzoneRef = React.useRef(null);

  // Handle file drop event
  const handleDrop = React.useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const selectedFile = [...droppedFiles];
      let count = file.length;
      if (file.length === filesToUpload) return;
      const filed = [...file];
      for (let i = 0; i < Math.min(selectedFile.length, filesToUpload); i++) {
        if (count > filesToUpload) break;
        filed.push(selectedFile[i]);
        count++;
      }
      setFile(filed);
    }

    setDragging(false);  // Reset dragging state
  }, [filesToUpload]);

  // Handle file drag over event
  const handleDragOver = React.useCallback((e: any) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  // Handle drag leave event
  const handleDragLeave = React.useCallback(() => {
    setDragging(false);
  }, []);

  // Handle file input change
  const handleFileInputChange = React.useCallback((e: any) => {
    const selectedFile = [...e.target.files];
    let count = file.length;
    if (file.length === filesToUpload) return;
    const filed = [...file];
    for (let i = 0; i < Math.min(selectedFile.length, filesToUpload); i++) {
      if (count > filesToUpload) break;
      filed.push(selectedFile[i]);
      count++;
    }
    setFile(filed);
  }, [file]);

  const handleRemoveFile = (index: number) => {
    const filed = [...file];
    filed.splice(index, 1);
    setFile(filed);
  }

  const [fileUrls, setFileUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    onSelectedFile(file);
    const furls = file.map((fl: File) => URL.createObjectURL(fl));
    setFileUrls(furls);
    return () => {
      furls.forEach((url: string) => URL.revokeObjectURL(url));
    }
  }, [file]);

  return (<div className="tw-block">
    <div className="tw-flex items-center tw-justify-center tw-w-full">
      {file.length < filesToUpload && (
        <label
          ref={dropzoneRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          htmlFor="form-dropzone-file"
          className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-64 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 ${dragging ? 'tw-bg-gray-100' : 'hover:tw-bg-gray-100'}`}
        >
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
            <svg
              className="tw-w-8 tw-h-8 tw-mb-4 tw-text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="tw-mb-2 tw-text-sm tw-text-gray-500">
              <span className="tw-font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="tw-text-xs tw-text-gray-500">PNG or JPG: MAX 5MB</p>
          </div>
          <input
            id="form-dropzone-file"
            type="file"
            className="tw-hidden"
            accept=".png,.jpg,.jpeg"
            aria-describedby="file-help"
            multiple={filesToUpload > 1}
            onChange={handleFileInputChange}
          />
        </label>
      )}
    </div>
    {file.length > 0 && (
      <div className="tw-mt-4 tw-flex tw-gap-4 tw-flex-wrap">
        {file.map((fl: any, index: any) => (
          <div key={"files-" + index} className="tw-flex tw-flex-col tw-items-center tw-relative">
            <button type="button" onClick={() => handleRemoveFile(index)} className="tw-absolute tw-right-1 tw-top-1 tw-text-red-500 tw-w-[30px] tw-h-[30px]"><i className="bx bxs-trash-alt tw-text-[30px]"></i></button>
            <p className="tw-text-sm tw-text-gray-700">Selected file ({index + 1}):</p>
            <img
              src={fileUrls?.[index] || ""}
              alt="Preview"
              className="tw-h-32 tw-w-auto tw-rounded-md"
            />
            <p className="tw-text-xs tw-text-gray-500">{fl.name}</p>
          </div>
        ))}
      </div>
    )}
  </div>);
}

interface FeedbackItem {
  item: string;
  type: "number" | "boolean";
  rating: "1" | "2" | "3" | "4" | boolean | undefined;
}

interface FeedbackFormCategory {
  category_name: string;
  items: FeedbackItem[];
}


function sendReminderNotification(syid: string | number, student_id: string | number, schedule: string, onSuccess: any, onError: any) {
  try {
    const broadcastUrl = new URL(
      pathname("/api/post/send/notification"),
      window.location.origin
    );
    const homepage = (new URL(pathname('/'), window.location.origin)).toString();
    const bodyHTMLString = ReactDOMServer.renderToString(<>
      <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <table style={{ width: '100%', border: 0, borderCollapse: "collapse" }}>
          <tr>
            <td style={{ padding: '20px' }} align="center">
              <table style={{ width: '600px', border: '1px solid #cccccc' }}>
                <tr>
                  <td
                    style={{
                      backgroundColor: '#4CAF50',
                      padding: '20px',
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '24px',
                    }}
                  >
                    Guidance Office (SMCC)
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: '20px',
                      textAlign: 'left',
                      fontSize: '16px',
                      lineHeight: '1.6',
                    }}
                  >
                    <p>We would like to remind you of your counseling appointment on {schedule}. Please be there at the scheduled time. Thank you.</p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      backgroundColor: '#f1f1f1',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#555555',
                    }}
                  >
                    <a href="https://www.smccnasipit.edu.ph" style={{ color: '#555555' }}>
                      Saint Michael College of Caraga
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      backgroundColor: '#f1f1f1',
                      padding: '10px',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#555555',
                    }}
                  >
                    <a href={homepage} style={{ color: '#555555' }}>
                      Guidance Office (SMCC)
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </>);
    const postData = {
      syid,
      student_id,
      subject: `Reminder on Counseling Appointment Schedule | Guidance Office (SMCC)`,
      body: bodyHTMLString.replaceAll("\n", "").trim(),
      title: "Reminder on Counseling Appointment Schedule",
      message: `You have an appointment scheduled on ${schedule}. Please be there on the scheduled time. Thank you.`,
      href: "/appointments",
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
      })
  } catch (error) {
    console.error("Error broadcasting notification:", error);
    onError && onError(error);
  }
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // This makes it display am/pm
  };

  return date.toLocaleString('en-US', options).replace(",", " @");
};


function SelectedCheckbox({
  checked,
  title,
  id
}: {
  checked: boolean,
  title: string,
  id: string,
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
      <label htmlFor={id + "__checkbox"} className="tw-flex tw-items-center" title={title}>
        <span
          className={'tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-lg'}
        >
          {checked && <i className="bx bxs-check-square"></i>}
          {!checked && <i className="bx bx-checkbox"></i>}
        </span>
      </label>
    </div>
  );
};

function ViewAssessmentComponent({
  assessmentForms,
  assessmentResponses,
  assessmentScore,
  student
}: {
  assessmentForms: AssessmentForm[],
  assessmentResponses: Assessment[],
  assessmentScore: number,
  student: {
    id: number; // id of the profile status table
    student_id: number;
    name: string;
    course?: string;
    level: number | string;
    education: Education;
  }
}) {
  const getAssessmentResponseCheck = React.useCallback((item: AssessmentFormItem) =>
    assessmentResponses.reduce(
      (init: boolean, val: Assessment) => !!init || !!(val.assessment_response as AssessmentResponse[]).reduce(
        (res: boolean, ar: AssessmentResponse) => res || (item.id.toString() === ar.id.toString() && !!ar.response), false), false), [])
  return (<>
    <div className="tw-flex tw-gap-x-4">
      <div>Name: {student.name}</div>
      <div>{student.education === Education.Basic ? "Grade Level: " + student.level : "Year Level: " + student.level}</div>
      <div>{student.education === Education.College ? "Course: " + student.course : ""}</div>
    </div>
    <h3 className={clsx(assessmentScore < 25 ? "tw-text-green-600" : (assessmentScore < 50 ? "tw-text-yellow-600" : (assessmentScore < 75 ? "tw-text-orange-600" : "tw-text-red-600")))}>
      Assessment Result: {assessmentScore < 25 ? "Strongly Positive" : (assessmentScore < 50 ? "Somewhat Negative" : (assessmentScore < 75 ? "Strongly Negative" : "Urgent Attention Needed"))}
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
            {(forms?.items as AssessmentFormItem[])?.map((item: AssessmentFormItem) => (
              <div className={clsx("tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm", !!item.alarming ? "tw-text-red-600" : "tw-text-gray-600")}>
                <div className="tw-flex tw-flex-shrink tw-items-center tw-text-right tw-text-[40pt]">
                  <SelectedCheckbox checked={getAssessmentResponseCheck(item)} id={item.id} title={item.item} />
                </div>
                <div className="tw-flex tw-flex-grow tw-items-start">
                  <div className="tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px] tw-text-left">
                    {item.item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="tw-flex tw-justify-between tw-items-start">
      <button type="button" className="btn btn-primary" onClick={() => window.open((new URL(pathname(`/print?form=student_assessment&id=${student.student_id}&assessments=${assessmentForms.map((v: AssessmentForm) => v.id).join("-")}`), window.location.origin)))}>
        <i className="bx bxs-printer"></i> Print
      </button>
    </div>
  </>)
}

function CounselingRecords() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const { called_in, walked_in, sy, syid, students, guidance } = usePageData(setIsLoading);
  const [itemSchedule, setItemSchedule] = React.useState<any>(null);

  const { school_years, all_data, guidance } = usePageData(setIsLoading);
  const [selectedSchoolYear, setSelectedSchoolYear] = React.useState<string>((new Date()).getFullYear());
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("");
  const [selectedProgramSection, setSelectedProgramSection] = React.useState<string>("");
  const { called_in, walked_in, sy, syid, students } = React.useMemo(() => {
    const selSy = Array.isArray(school_years) ? school_years.find((yr: any) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
    let alldata = Array.isArray(all_data) ? all_data.find((c: any) => c.sy.toString() === selSy?.year?.toString()) : undefined;
    let called = !!alldata?.called_in ? [...(alldata.called_in)] : [];
    let walked = !!alldata?.walked_in ? [...(alldata.walked_in)] : [];
    let studs = !!alldata?.students ? [...(alldata.students)] : [];
    return {
      called_in: called,
      walked_in: walked,
      students: studs,
      sy: selSy?.year,
      syid: selSy?.id
    }
  }, [school_years, all_data, selectedSchoolYear]);
  

  const education = React.useMemo(() => !!selectedDepartment ? Education.College : (!!selectedProgramSection ? Education.Basic : Education.None), [selectedDepartment, selectedProgramSection]);
  const departmentOptions = React.useMemo<{ label: string, value: string }[]>(() => {
    const result: { label: string, value: string }[] = [];
    const currentData = all_data?.find((d: any) => d.sy.toString() === selectedSchoolYear.toString());
    const departments = currentData?.students?.map((st: any) => st.education === Education.College ? (st.student as CollegeStudentInfo)?.department : null)?.filter((v: any) => !!v) || [];
    departments.forEach((department: string) => {
      if (!!department) {
        if (!result.some(d => d.label === department)) {
          result.push({ label: department, value: department });
        }
      }
    })
    return result;
  }, [all_data, selectedSchoolYear]);

  const programSectionOptions = React.useMemo<{ label: string, value: string }[]>(() => {
    const result: { label: string, value: string }[] = [];
    if (education === "basic") {
      const currentData = all_data?.find((d: any) => d.sy.toString() === selectedSchoolYear.toString());
      const sections = currentData?.students?.map((st: any) => st.education === Education.Basic ? (st.student as BasicStudentInfo)?.section : null)?.filter((v: any) => !!v) || [];
      sections.forEach((section: string) => {
        if (!!section) {
          if (!result.some(d => d.label === section)) {
            result.push({ label: section, value: section });
          }
        }
      })
    } else if (education === "college") {
      const currentData = all_data?.find((d: any) => d.sy.toString() === selectedSchoolYear.toString());
      const courses = currentData?.students
        ?.filter((st: any) => (st?.student as CollegeStudentInfo)?.department?.toString() === selectedDepartment)
        ?.map((st: any) => st.education === Education.College ? (st?.student as CollegeStudentInfo)?.course : null)
        ?.filter((v: any) => !!v) || [];
      courses.forEach((course: string) => {
        if (!!course) {
          if (!result.some(d => d.label === course)) {
            result.push({ label: course, value: course });
          }
        }
      })
    }
    return result;
  }, [selectedDepartment, education, all_data, selectedSchoolYear]);

  const data = React.useMemo(() => [...(called_in || []), ...(walked_in || [])], [called_in, walked_in]);

  const [filterByMonth, setFilterByMonth] = React.useState<number|"">("")
  const [filterByInteractionType, setFilterByInteractionType] = React.useState<InteractionType|"">("")
  
  const onPrintCalledSlip = (item: any) => {
    const printUrl = new URL(pathname("/print"), window.location.origin)
    printUrl.searchParams.append('form', 'called_slip');
    printUrl.searchParams.append('id', item?.id || "");
    const win = window.open(printUrl.toString(), '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=800,height=600');
    if (win) {
      win.onafterprint = () => {
        win.close();
      };
      win.print();
    } else {
      console.error('Failed to open print window');
    }
  };

  const onReScheduleOrPrint = React.useCallback((item: any) => {
    Swal.fire({
      title: "Counseling Appointment on " + displayDateTime(item.schedule),
      html: ReactDOMServer.renderToString(<>
        <div className="tw-flex tw-flex-nowrap tw-justify-evenly tw-items-center tw-gap-4">
          <button type="button" id="print-appointment" className="btn btn-primary tw-text-nowrap tw-relative hover:after:tw-content-['Print'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0" title="Print"><i className="bx bxs-printer"></i></button>
          <button type="button" id="re-schedule-appointment" className="btn btn-warning tw-text-nowrap tw-relative hover:after:tw-content-['Re-schedule'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0" title="Re-schedule Appointment"><i className="bx bx-time-five"></i></button>
        </div>
      </>),
      showConfirmButton: false,
    }).then(() => {
      $("button#re-print-appointment").off("click");
      $("button#re-schedule-appointment").off("click");
    });
    setItemSchedule(item);
  }, []);

  const onSendReminder = React.useCallback((item: any) => {
    Swal.fire({
      title: "Counseling Appointment on " + displayDateTime(item.schedule),
      html: ReactDOMServer.renderToString(<>
        <div className="tw-flex tw-flex-nowrap tw-justify-evenly tw-items-center tw-gap-4">
          <button type="button" id="print-appointment" className="btn btn-primary tw-text-nowrap tw-relative hover:after:tw-content-['Print'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0" title="Print"><i className="bx bxs-printer"></i></button>
          <button type="button" id="remind-schedule-appointment" className="btn btn-warning tw-text-nowrap tw-relative hover:after:tw-content-['Remind'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0" title="Re-schedule Appointment"><i className="bx bxs-bell-ring"></i></button>
          <button type="button" id="re-schedule-appointment" className="btn btn-danger tw-text-nowrap tw-relative hover:after:tw-content-['Re-schedule'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0" title="Re-schedule Appointment"><i className="bx bx-time-five"></i></button>
        </div>
      </>),
      showConfirmButton: false,
    }).then(() => {
      $("button#re-print-appointment").off("click");
      $("button#remind-schedule-appointment").off("click");
      $("button#re-schedule-appointment").off("click");
    });
    setItemSchedule(item);
  }, [syid])


  React.useEffect(() => {
    if (itemSchedule) {
      const item = { ...itemSchedule };
      if (!item?.id) {
        $("button#print-appointment").prop("disabled", true);
      }
      $("button#print-appointment").on("click", () => onPrintCalledSlip(item));
      $("button#re-schedule-appointment").on("click", () => {
        Swal.fire({
          icon: "question",
          title: "Are you sure?",
          text: "Are you sure you want to reschedule this appointment?",
          showCancelButton: true,
          confirmButtonText: "Yes, reschedule",
          cancelButtonText: "No",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then(({ isConfirmed }: any) => {
          if (isConfirmed) {
            const url = new URL(pathname(`/assessment/make/calledslip?id=${item.id}&educ=${item.education}`), window.location.origin);
            window.open(url.toString(), '_blank', 'toolbar=no,menubar=no,location=no,status=no,referrer=no');
          } else {
            onReScheduleOrPrint(item);
          }
        })
      })
      $("button#remind-schedule-appointment").on("click", () => {
        Swal.fire({
          icon: "question",
          title: "Are you sure?",
          text: "Are you sure you want to send a reminder to this student?",
          showCancelButton: true,
          confirmButtonText: "Yes, send reminder",
          cancelButtonText: "No",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then(({ isConfirmed }: any) => {
          if (isConfirmed) {
            // send email and notification to the specified student
            // send notification to the specified student's guidance
            const url = new URL(pathname('/api/post/send/notification'), window.location.origin);
            sendReminderNotification(syid, item.user?.id, formatDate(new Date(item.schedule)), (success: string) => {
              Swal.fire({
                icon: "success",
                title: "Reminder sent successfully.",
                timer: 2000,
              })
            }, (error: string) => {
              Swal.fire({
                icon: "error",
                title: "Error sending reminder",
                text: error,
                timer: 3000,
              });
            });
          }
        })
      })
      setItemSchedule(null);
    }
  }, [itemSchedule]);

  const onWalkedIn = React.useCallback(() => {
    const $vmodal = $("#create-case-note-walkin-modal");
    `
      <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
      <datalist id="datalistOptions">
        <option value="San Francisco">
        <option value="New York">
        <option value="Seattle">
        <option value="Los Angeles">
        <option value="Chicago">
      </datalist>
    `
    const mappedStudents = [...students].map((s: { user: UserInfo }) => s.user?.username.toLowerCase());
    const $studentSelection = $("<input>")
      .addClass("form-control")
      .attr({
        type: "text",
        id: "studentIdSelection",
        list: "datalistOptions",
        maxLength: Math.max(...mappedStudents.map((s: string) => s.length)),
        minLength: Math.min(...mappedStudents.map((s: string) => s.length)),
        placeholder: "Enter Student ID",
        pattern: "^\\d{4}\\d{5}$",
      })
      .css({
        'background-color': '#fbfae3',
        'display': 'inline-block'
      })
      .prop("required", true);
    const $studentOptions = [...students].map(
      (student: { user: UserInfo }) => $("<option>").attr("value", student.user?.username).text(student.user?.first_name + " " + (student.user?.middle_initial ? student.user.middle_initial + ". " : "") + student.user?.last_name));
    const $datalistOption = $('<datalist>').attr("id", "datalistOptions");
    $datalistOption.append($studentOptions);
    const $studentIdHiddenValue = $('<input>').attr({
      type: "hidden",
      id: "studentIdHiddenValue",
      name: "student_id",
      value: "",
    }).prop('required', true);

    $studentSelection.on('change', function (e) {
      const currentValue = $(this).val() as string;
      if (!mappedStudents.includes(currentValue?.toLowerCase())) {
        $(this).css('background-color', '#f5a4a4');
      } else {
        if (currentValue.length < 9) {
          $(this).css('background-color', '#fbfae3');
        } else {
          $(this).css('background-color', 'white');
          const stdid = students.find((st: { user: UserInfo }) => st.user?.username?.toLowerCase() === currentValue.toLowerCase())?.user?.id;
          $studentIdHiddenValue.val(stdid).trigger("change");
        }
      }
    })
    $vmodal.find("#create-student-id").empty().append($studentSelection).append($datalistOption).append($studentIdHiddenValue);
    $studentIdHiddenValue.on("change", function () {
      if (!$(this).val()) return;
      const selectedStudentId = $(this).val() as string;
      if (!selectedStudentId) {
        $vmodal.find("#create-photo").attr("src", (new URL(pathname('/images/default-user.png'), window.location.origin)).toString());
        $vmodal.find("#create-full-name").text("");
        $vmodal.find("#create-department-level").text("");
        $vmodal.find("#create-year-grade-level").text("");
        $vmodal.find("#create-course-section").text("");
        $vmodal.find("#create-guidance-name").text("");
        return;
      }
      const student = students.find(({ user: stud }: { user: UserInfo }) => stud?.id === parseInt(selectedStudentId));
      if (student) {
        $vmodal.find("#create-photo").attr("src", (new URL(pathname(student.student_profile?.profile_pic || student.user?.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
        $vmodal.find("#create-full-name").text((student.user?.last_name + ', ' + student.user?.first_name + ' ' + (student.user?.middle_initial ? student.user.middle_initial + ". " : "") + (student.student_profile?.suffix_name || "")).trim());
        $vmodal.find("#create-department-level").text(!student.student ? "[No Profile]" : student.student?.yearlevel ? student.student?.department : (student.student?.gradelevel ? (student.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
        $vmodal.find("#create-year-grade-level").text(displayLevel(student.student?.gradelevel || student.student?.yearlevel || ""));
        $vmodal.find("#create-course-section").text(student.student?.section || student.student?.course || "");
        $vmodal.find("#create-guidance-name").text(guidance?.first_name + " " + (guidance?.middle_initial ? (guidance.middle_initial + ". ").replace("..", ".") : "") + guidance?.last_name);
      } else {
        $vmodal.find("#create-photo").attr("src", (new URL(pathname('/images/default-user.png'), window.location.origin)).toString());
        $vmodal.find("#create-full-name").text("");
        $vmodal.find("#create-department-level").text("");
        $vmodal.find("#create-year-grade-level").text("");
        $vmodal.find("#create-course-section").text("");
        $vmodal.find("#create-guidance-name").text("");
      }
    });

    const $agfroot = $vmodal.find("#case-upload-photo-root");
    const afroot = ReactDOM.createRoot($agfroot.get(0));
    var selectedFiles: File[] = [];
    const onSelectedFile = (selfile: File[]) => {
      selectedFiles = selfile;
    }
    afroot.render(<UploadDragAndDropImage onSelectedFile={onSelectedFile} filesToUpload={1} />);

    $vmodal.find("form#form-create-case-note").on("submit", function (e) {
      e.preventDefault();
      const formData: any = {};

      $(this).find('input, select, textarea').each(function () {
        const name = $(this).attr('name');
        const value = $(this).val();
        if (name) {
          if ($(this).attr('type') === "radio") {
            if ($(this).prop('checked')) {
              formData[name] = value;
            }
          } else {
            formData[name] = value;
          }
        }
      });

      const url = new URL(pathname("/api/post/casenote/create"), window.location.origin);
      // const postData = {
      //   ...formData,
      //   guidance_id: guidance?.id,
      //   sy,
      //   called_in_slip: null,
      //   agreement_form_id: null,
      //   referral_form_id: null,
      // };

      // $.post(url.toString(), postData)
      //   .done(function ({ success, error }: any) {
      //     Swal.fire({
      //       icon: success ? "success" : "error",
      //       title: success ? "Success!" : "Error",
      //       text: success ? success : error,
      //       timer: 3000,
      //       showConfirmButton: false,
      //     }).then(() => {
      //       if (success) {
      //         window.location.reload();
      //       }
      //     })
      //   })
      //   .fail(function (_: any, statusText: string) {
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Error',
      //       text: statusText,
      //       timer: 3000,
      //       showConfirmButton: false,
      //     })
      //   })
      const postData = new FormData();
      // Append the file to the form data
      Object.keys(formData).forEach((key) => {
        postData.append(key, formData[key]);
      });
      //   sy,
      //   called_in_slip: null,
      //   agreement_form_id: null,
      //   referral_form_id: null,
      postData.append('guidance_id', guidance.id);
      postData.append('sy', sy);
      postData.append('upload_count', selectedFiles.length.toString());
      if (selectedFiles.length>0){
        selectedFiles.forEach((selected, ind: number)=>{
          postData.append('case_note_img_' + ind, selected, selected.name);
          // console.log(ind, selected, selected.name);
        })
      }
      
      // Send the file using jQuery $.post() or $.ajax()
      $.ajax({
        url: url.toString(),
        type: 'POST',
        data: postData,
        processData: false, // Important for file upload
        contentType: false, // Important for file upload
        success: ({ success, error }) => {
          Swal.fire({
            icon: success ? "success" : "error",
            title: success ? "Success!" : "Error",
            text: success ? success : error,
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            if (success) {
              window.location.reload();
            }
          })
        },
        error: (_, statusText) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: statusText,
            timer: 3000,
            showConfirmButton: false,
          })
        }
      });

    });

    // @ts-ignore
    $vmodal.modal("show");
    $vmodal.on('hidden.bs.modal', function () {
      $vmodal.find("form#form-create-case-note").off("submit");
    });
  }, [students, guidance]);

  const onViewCaseNote = React.useCallback((item: any) => {
    // check if not scheduled yet
    if (!dateIsBeforeNow(item.schedule)) {
      Swal.fire({
        icon: "info",
        title: "It is not yet the scheduled date/time",
        text: "You can only create/view the case note on or after the scheduled date/time.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    if (!item.case_note) {
      // Modal to add Case Note
      const $vmodal = $("#create-case-note-modal");
      $vmodal.find("#create-photo").attr("src", (new URL(pathname(item.student_profile?.profile_pic || item.user.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
      $vmodal.find("#create-student-id").text(item.user?.username || "");
      $vmodal.find("#create-full-name").text((item.user?.last_name + ', ' + item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + (item.student_profile?.suffix_name || "")).trim());
      $vmodal.find("#create-department-level").text(item.student?.yearlevel ? item.student?.department : (item.student?.gradelevel ? (item.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
      $vmodal.find("#create-year-grade-level").text(displayLevel(item.student?.gradelevel || item.student?.yearlevel));
      $vmodal.find("#create-course-section").text(item.student?.section || item.student?.course);
      $vmodal.find("#create-guidance-name").text(item.guidance?.first_name + ' ' + (item.guidance?.middle_initial ? (item.guidance.middle_initial + ". ").replace("..", ".") : "") + item.guidance?.last_name);
      $vmodal.find(!item.schedule ? "input#it-3" : "input#it-2").prop("checked", true);

      const $agfroot = $vmodal.find("#case-upload-photo-root");
      const afroot = ReactDOM.createRoot($agfroot.get(0));
      var selectedFiles: File[] = [];
      const onSelectedFile = (selfile: File[]) => {
        selectedFiles = selfile;
      }
      afroot.render(<UploadDragAndDropImage onSelectedFile={onSelectedFile} filesToUpload={1} />);

      $vmodal.find("form#form-create-case-note").on("submit", function (e) {
        e.preventDefault();
        const formData: any = {};

        $(this).find('input, select, textarea').each(function () {
          const name = $(this).attr('name');
          const value = $(this).val();
          if (name) {
            if ($(this).attr('type') === "radio") {
              if ($(this).prop('checked')) {
                formData[name] = value;
              }
            } else {
              formData[name] = value;
            }
          }
        });

        const url = new URL(pathname("/api/post/casenote/create"), window.location.origin);
        // const postData = {
        //   ...formData,
        //   student_id: item.user?.id,
        //   guidance_id: item.guidance?.id,
        //   sy,
        //   called_in_slip: item?.id || null,
        //   agreement_form_id: item.agreement_form?.id || null,
        //   referral_form_id: item.referral_form?.id,
        // };
        const postData = new FormData();
        // // Append the file to the form data
        Object.keys(formData).forEach((key) => {
          postData.append(key, formData[key]);
        });
        if (item.user?.id) {
          postData.append('student_id', item.user.id);
        }
        if (item.guidance?.id) {
          postData.append('guidance_id', item.guidance.id);
        }
        if (item.aggreement_form?.id) {
          postData.append('agreement_form_id', item.agreement_form.id);
        }
        if (item?.id) {
          postData.append('called_in_slip', item.id || null);
        }
        if (item.id) {
          postData.append('referral_form_id', item.referral_form?.id);
        }
        postData.append('upload_count', selectedFiles.length.toString());
        postData.append('sy', sy);
        if (selectedFiles.length>0){
          selectedFiles.forEach((selected, ind: number)=>{
            postData.append('case_note_img_' + ind, selected, selected.name);
            // console.log(ind, selected, selected.name);
          })
        }
        // if (selectedFiles.length>0){
        //   selectedFiles.forEach((selected)=>{
        //     postData.append('case_note_img[]', selected, selected.name);
        //   })
        // }
       
        // Send the file using jQuery $.post() or $.ajax()
        $.ajax({
          url: url.toString(),
          type: 'POST',
          data: postData,
          processData: false, // Important for file upload
          contentType: false, // Important for file upload
          success: ({ success, error }) => {
            Swal.fire({
              icon: success ? "success" : "error",
              title: success ? "Success!" : "Error",
              text: success ? success : error,
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              if (success) {
                window.location.reload();
              }
            })
          },
          error: (_, statusText) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: statusText,
              timer: 3000,
              showConfirmButton: false,
            })
          }
        });

        // $.post(url.toString(), postData)
        //   .done(function ({ success, error }: any) {
        //     Swal.fire({
        //       icon: success ? "success" : "error",
        //       title: success ? "Success!" : "Error",
        //       text: success ? success : error,
        //       timer: 3000,
        //       showConfirmButton: false,
        //     }).then(() => {
        //       if (success) {
        //         window.location.reload();
        //       }
        //     })
        //   })
        //   .fail(function (_: any, statusText: string) {
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Error',
        //       text: statusText,
        //       timer: 3000,
        //       showConfirmButton: false,
        //     })
        //   })
      });

      // @ts-ignore
      $vmodal.modal("show");
      $vmodal.on('hidden.bs.modal', function () {
        $vmodal.find("form#form-create-case-note").off("submit");
      });
    } else {
      // Modal to view Case Note
      const $vmodal = $("#view-case-note-modal");
      $vmodal.find("#view-photo").attr("src", (new URL(pathname(item.student_profile?.profile_pic || item.user.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
      $vmodal.find("#view-student-id").text(item.user?.username || "");
      $vmodal.find("#view-full-name").text((item.user?.last_name + ', ' + item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + (item.student_profile?.suffix_name || "")).trim());
      $vmodal.find("#view-department-level").text(item.student?.yearlevel ? item.student?.department : (item.student?.gradelevel ? (item.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
      $vmodal.find("#view-year-grade-level").text(displayLevel(item.student?.gradelevel || item.student?.yearlevel));
      $vmodal.find("#view-course-section").text(item.student?.section || item.student?.course);
      $vmodal.find("#view-guidance-name").text(item.guidance?.first_name + ' ' + (item.guidance?.middle_initial ? (item.guidance.middle_initial + ". ").replace("..", ".") : "") + item.guidance?.last_name);
      $vmodal.find("#view-interaction-type").text(`${item.case_note?.interaction_type || ""}`);
      $vmodal.find("#view-details").text(`${item.case_note?.details || ""}`);
      $vmodal.find("#view-information").text(`${item.case_note?.information_by_counselor || ""}`);
      $vmodal.find("#view-decision").text(`${item.case_note?.client_decision || ""}`);
      $vmodal.find("#view-observation").text(`${item.case_note?.behavioral_observation || ""}`);
      $vmodal.find("#view-date").text(`${displayDate(item.case_note?.created_at)}`);
      //diri add picture
      $vmodal.find("#view-img").attr("src", (new URL(pathname(item.case_note?.case_note_img), window.location.origin)).toString());
      // $vmodal.find("#view-photo").attr("src", (new URL(pathname(item.student_profile?.profile_pic || item.user.profile_pic || '/images/default-user.png'), window.location.origin)).toString()); 
      $vmodal.find("button#view-case-note-print").on("click", function () {
        const printUrl = new URL(pathname("/print"), window.location.origin)
        printUrl.searchParams.append('form', 'case_notes');
        printUrl.searchParams.append('id', item.case_note?.id || "");
        const win = window.open(printUrl.toString(), '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=800,height=600');
        if (win) {
          win.onafterprint = () => {
            win.close();
          };
          win.print();
        } else {
          console.error('Failed to open print window');
        }
      });
      // @ts-ignore
      $vmodal.modal("show");
      $vmodal.on('hidden.bs.modal', function () {
        $vmodal.find("button#view-case-note-print").off("click");
      });
    }
  }, [sy]);

  const onViewAgreementForm = React.useCallback((item: any) => {
    // check if not scheduled yet
    if (!dateIsBeforeNow(item.schedule)) {
      Swal.fire({
        icon: "info",
        title: "It is not yet the scheduled date/time",
        text: "You can only create/view the Agreement Form on or after the scheduled date/time.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    if (!item.agreement_form) {
      // Modal to add Agreement Form
      const $vmodal = $("#create-agreement-form-modal");
      $vmodal.find("#create-photo").attr("src", (new URL(pathname(item.student_profile?.profile_pic || item.user.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
      $vmodal.find("#create-student-id").text(item.user?.username || "");
      $vmodal.find("#create-full-name").text((item.user?.last_name + ', ' + item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + (item.student_profile?.suffix_name || "")).trim());
      $vmodal.find("#create-department-level").text(item.student?.yearlevel ? item.student?.department : (item.student?.gradelevel ? (item.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
      $vmodal.find("#create-year-grade-level").text(displayLevel(item.student?.gradelevel || item.student?.yearlevel));
      $vmodal.find("#create-course-section").text(item.student?.section || item.student?.course);
      $vmodal.find(".create-guidance-name").text(item.guidance?.first_name + ' ' + (item.guidance?.middle_initial ? (item.guidance.middle_initial + ". ").replace("..", ".") : "") + item.guidance?.last_name);
      $vmodal.find("#create-full-name-2").text((item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + item.user.last_name + ' ' + (item.student_profile?.suffix_name || '')).toLowerCase().trim());

      const $agfroot = $vmodal.find("#agreement-upload-photo-root");
      const afroot = ReactDOM.createRoot($agfroot.get(0));
      var selectedFile: File | null = null;
      const onSelectedFile = (selfile: File[]) => {
        if (selfile.length > 0) {
          selectedFile = selfile[0];
        } else {
          selectedFile = null;
        }
      }
      afroot.render(<UploadDragAndDropImage onSelectedFile={onSelectedFile} />);

      $vmodal.find("form#form-create-agreement-form").on("submit", function (e) {
        e.preventDefault();
        const formData: any = {};
        if (!selectedFile) {
          alert("Please select a file");
          return;
        }

        const url = new URL(pathname("/api/post/agreementform/create"), window.location.origin);
        const postData = new FormData();
        // Append the file to the form data
        Object.keys(formData).forEach((key) => {
          postData.append(key, formData[key]);
        });
        if (item.user?.id) {
          postData.append('student_id', item.user.id);
        }
        if (item.guidance?.id) {
          postData.append('guidance_id', item.guidance.id);
        }
        if (item.case_note?.id) {
          postData.append('case_note_id', item.case_note.id);
        }
        if (item.id) {
          postData.append('called_slip_id', item.id);
        }
        postData.append('sy', sy);
        postData.append('agreement_pic', selectedFile, selectedFile.name);
        $.ajax({
          url: url.toString(),
          type: 'POST',
          data: postData,
          processData: false, // Important for file upload
          contentType: false, // Important for file upload
          success: ({ success, error }) => {
            Swal.fire({
              icon: success ? "success" : "error",
              title: success ? "Success!" : "Error",
              text: success ? success : error,
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              if (success) {
                window.location.reload();
              }
            })
          },
          error: (_, statusText) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: statusText,
              timer: 3000,
              showConfirmButton: false,
            })
          }
        });
      });

      // @ts-ignore
      $vmodal.modal("show");
      $vmodal.on('hidden.bs.modal', function () {
        $vmodal.find("form#form-create-agreement-form").off("submit");
        $agfroot.empty();
      });
    } else {
      const $vmodal = $("#view-agreement-form-modal");
      $vmodal.find("#view-photo").attr("src", (new URL(pathname(item.student_profile?.profile_pic || item.user.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
      $vmodal.find("#view-student-id").text(item.user?.username || "");
      $vmodal.find("#view-full-name").text((item.user?.last_name + ', ' + item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + (item.student_profile?.suffix_name || "")).trim());
      $vmodal.find("#view-department-level").text(item.student?.yearlevel ? item.student?.department : (item.student?.gradelevel ? (item.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
      $vmodal.find("#view-year-grade-level").text(displayLevel(item.student?.gradelevel || item.student?.yearlevel));
      $vmodal.find("#view-course-section").text(item.student?.section || item.student?.course);
      $vmodal.find(".view-guidance-name").text(item.guidance?.first_name + ' ' + (item.guidance?.middle_initial ? (item.guidance.middle_initial + ". ").replace("..", ".") : "") + item.guidance?.last_name);
      $vmodal.find("#view-full-name-2").text((item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + item.user.last_name + ' ' + (item.student_profile?.suffix_name || '')).toLowerCase().trim());
      $vmodal.find(".view-date").text(`${displayDate(item.agreement_form?.created_at)}`);
      $vmodal.find("img#agreement-photo").attr("src", item.agreement_form?.agreement_pic ? (new URL(pathname(item.agreement_form.agreement_pic))).toString() : "");
      // @ts-ignore
      $vmodal.modal("show");
    }
  }, [sy]);

  const onUploadReferral = React.useCallback((item: any) => {
    // check if not scheduled yet
    if (!dateIsBeforeNow(item.schedule)) {
      Swal.fire({
        icon: "info",
        title: "It is not yet the scheduled date/time",
        text: "You can only create/view the Documentation on or after the scheduled date/time.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    if (!item.referral_form) {
      // Modal to add Agreement Form
      const $vmodal = $("#create-referral-form-modal");
      $vmodal.find("#create-photo").attr("src", (new URL(pathname(item.student_profile?.profile_pic || item.user.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
      $vmodal.find("#create-student-id").text(item.user?.username || "");
      $vmodal.find("#create-full-name").text((item.user?.last_name + ', ' + item.user?.first_name + ' ' + (item.user?.middle_initial ? item.user.middle_initial + ". " : "") + (item.student_profile?.suffix_name || "")).trim());
      $vmodal.find("#create-department-level").text(item.student?.yearlevel ? item.student?.department : (item.student?.gradelevel ? (item.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
      $vmodal.find("#create-year-grade-level").text(displayLevel(item.student?.gradelevel || item.student?.yearlevel));
      $vmodal.find("#create-course-section").text(item.student?.section || item.student?.course);
      $vmodal.find("#create-guidance-name").text(item.guidance?.first_name + ' ' + (item.guidance?.middle_initial ? (item.guidance.middle_initial + ". ").replace("..", ".") : "") + item.guidance?.last_name);

      const $agfroot = $vmodal.find("#referral-upload-photo-root");
      const afroot = ReactDOM.createRoot($agfroot.get(0));
      var selectedFiles: File[] = [];
      const onSelectedFile = (selfile: File[]) => {
        selectedFiles = selfile;
      }
      afroot.render(<UploadDragAndDropImage onSelectedFile={onSelectedFile} filesToUpload={2} />);

      $vmodal.find("form#form-create-referral-form").on("submit", function (e) {
        e.preventDefault();
        const formData: any = {};
        if (selectedFiles.length === 0) {
          alert("Please select two (1) one or (2) photos to upload");
          return;
        }

        const url = new URL(pathname("/api/post/documentation/upload"), window.location.origin);
        const postData = new FormData();
        // Append the file to the form data
        Object.keys(formData).forEach((key) => {
          postData.append(key, formData[key]);
        });
        if (item.user?.id) {
          postData.append('student_id', item.user.id);
        }
        if (item.guidance?.id) {
          postData.append('guidance_id', item.guidance.id);
        }
        if (item.case_note?.id) {
          postData.append('case_note_id', item.case_note.id);
        }
        if (item.id) {
          postData.append('called_slip_id', item.id);
        }
        postData.append('sy', sy);
        postData.append('referral_a', selectedFiles[0], selectedFiles[0].name);
        if (!!selectedFiles[1]) {
          postData.append('referral_b', selectedFiles[1], selectedFiles[1]?.name);
        }
        // Send the file using jQuery $.post() or $.ajax()
        $.ajax({
          url: url.toString(),
          type: 'POST',
          data: postData,
          processData: false, // Important for file upload
          contentType: false, // Important for file upload
          success: ({ success, error }) => {
            Swal.fire({
              icon: success ? "success" : "error",
              title: success ? "Success!" : "Error",
              text: success ? success : error,
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              if (success) {
                window.location.reload();
              }
            })
          },
          error: (_, statusText) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: statusText,
              timer: 3000,
              showConfirmButton: false,
            })
          }
        });
      });

      // @ts-ignore
      $vmodal.modal("show");
      $vmodal.on('hidden.bs.modal', function () {
        $vmodal.find("form#form-create-referral-form").off("submit");
        $agfroot.empty();
      });
    }
  }, [sy]);

  const onViewReferral = React.useCallback((it: any, photo: any) => {
    const viewContainerPhoto = (
      <div className="tw-flex tw-items-center tw-justify-center">
        {!photo && <>No Image</>}
        {!!photo && (<img src={(new URL(pathname(photo))).toString()} alt="Failed to Load Documentation Photo" width="100%" height="100%" />)}
      </div>
    );
    Swal.fire({
      title: 'Documentation',
      html: ReactDOMServer.renderToString(viewContainerPhoto),
    })
  }, []);

  const onViewAssessmentForm = React.useCallback((item: any) => {
    if (!item.assessment) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No Assessment Form Found',
        timer: 3000,
        showConfirmButton: false,
      })
      return;
    }
    const assessmentForms = item.assessment.assessment_forms;
    const assessmentResponses = item.assessment.assessment_responses;
    const assessmentScore = item.assessment.assessment_score;
    const $vmodal = $('#view-assessment-submission');
    const $submissionRoot = $vmodal.find('#assessment-submission-root');
    const afroot = ReactDOM.createRoot($submissionRoot.get(0));
    // @ts-ignore
    $vmodal.modal("show");
    $vmodal.on('hidden.bs.modal', function () {
      $submissionRoot.empty();
    });
    afroot.render(
      <ViewAssessmentComponent
        student={{
          id: item.profile_status!.id,
          student_id: item.user!.id,
          name: `${item.user.first_name} ${item.user.middle_initial ? item.user.middle_initial + '. ' : ""}${item.user.last_name}`,
          level: item.education === Education.Basic ? (item.student as BasicStudentInfo).gradelevel : (item.student as CollegeStudentInfo).yearlevel,
          course: (item.student as CollegeStudentInfo).course,
          education: item.education
        }}
        assessmentForms={assessmentForms}
        assessmentResponses={assessmentResponses}
        assessmentScore={assessmentScore}
      />
    );
  }, []);
  const finalData = React.useMemo(() => {
    let d = !data ? [] : [...data];
    if (education === "college") {
      d = d.filter((item: any) =>
        (item.student as CollegeStudentInfo)?.department?.toString() === selectedDepartment.toString()
      );
    }
    if (!!selectedProgramSection) {
      d = d.filter((item: any) =>
        education === "basic"
          ? (item.student as BasicStudentInfo)?.section === selectedProgramSection
          : education === "college"
            ? (item.student as CollegeStudentInfo)?.course === selectedProgramSection
            : item
      );
    }
    if (!Number.isNaN(Number.parseInt(filterByMonth.toString()))) {
      d = d.filter((item: any) =>
        new Date(item.case_note?.created_at || item.schedule).getMonth().toString() === filterByMonth.toString()
      );
    }
    if (!!filterByInteractionType) {
      d = d.filter((item: any) =>
        (item.case_note?.interaction_type || InteractionType.CalledIn) === filterByInteractionType
      );
    }
    return d.map((v: any) => ({
      student_id: v.user.username,
      profile_pic: {
        value: v.student_profile?.profile_pic || v.user.profile_pic || 'none',
        content: <img src={new URL(pathname(("/" + (v.student_profile?.profile_pic || v.user.profile_pic)) || '/images/default-user.png')).toString()} alt="Profile Pic" width="30" height="30" className="tw-mx-auto tw-w-[40px] tw-h-[40px]" />
      },
      first_name: v.user.first_name,
      middle_initial: v.user.middle_initial ? v.user.middle_initial + ". " : "",
      last_name: v.user.last_name,
      suffix_name: v.student_profile?.suffix_name,
      interaction_type: v.case_note?.interaction_type || InteractionType.CalledIn,
      department: v.student?.yearlevel ? v.student?.department : (v.student?.gradelevel ? (v.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""),
      level: displayLevel(v.student?.gradelevel || v.student?.yearlevel),
      sectioncourse: v.student?.section || v.student?.course,
      assessment: {
        value: v.assessment?.assessment_score == false ? '0' : v.assessment?.assessment_score.toString(),
        content: (
          <button type="button" onClick={() => onViewAssessmentForm(v)} className={clsx("tw-w-[40px] tw-h-[40px]", !!v.assessment ? "tw-text-green-500 hover:tw-text-green-400" : "tw-text-[#6923D0] hover:tw-text-[#9c73d8]")}>
            <i className="bx bxs-file-pdf tw-text-[14pt]"></i>
          </button>
        ),
      },
      schedule: {
        value: displayDateTime(v.schedule, displayDateTime(v.case_note?.created_at)),
        content: <button type="button" className={clsx("tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-whitespace-nowrap", !dateIsBeforeNow(v.schedule) ? "tw-bg-gray-300 hover:tw-bg-gray-100" : (!v.case_note ? "tw-bg-red-400 hover:tw-bg-red-200" : "tw-bg-green-400 hover:tw-bg-green-200"))} onClick={() => !dateIsBeforeNow(v.schedule) ? onSendReminder(v) : (!v.case_note ? onReScheduleOrPrint(v) : onPrintCalledSlip(v))} disabled={!v.schedule}>{displayDateTime(v.schedule, displayDateTime(v.case_note?.created_at))}</button>,
      },
      case_note: {
        value: !v.case_note ? "0" : "1",
        content: (
          <button type="button" onClick={() => onViewCaseNote(v)} className={clsx("tw-w-[40px] tw-h-[40px]", !v.case_note ? "tw-text-[#6923D0] hover:tw-text-[#9c73d8]" : "tw-text-green-500 hover:tw-text-green-400")}>
            <i className="bx bxs-note tw-text-[14pt]"></i>
          </button>
        ),
      },
      agreement_form: {
        value: !v.agreement_form ? "0" : "1",
        content: (
          <button type="button" onClick={() => onViewAgreementForm(v)} className={clsx("tw-w-[40px] tw-h-[40px]", !v.agreement_form ? "tw-text-[#6923D0] hover:tw-text-[#9c73d8]" : "tw-text-green-500 hover:tw-text-green-400")}>
            <i className="bx bxs-message-alt-check tw-text-[14pt]"></i>
          </button>
        ),
      },
      counselor: v.guidance?.first_name + " " + (v.guidance?.middle_initial ? (v.guidance?.middle_initial + ". ").replace("..", ".") : "") + v.guidance?.last_name,
      referral_form: {
        value: !v.referral_form ? "0" : "1",
        content: !v.referral_form
          ? <button type="button" onClick={() => onUploadReferral(v)} className="tw-whitespace-nowrap tw-px-w tw-py-1 tw-text-blue-600 tw-w-[40px] tw-h-[40px] hover:tw-text-blue-400"><i className="bx bx-upload tw-text-[14pt]">&nbsp;</i>Upload</button>
          : (<div className="tw-flex tw-flex-nowrap tw-justify-center tw-gap-x-2">
            {[v.referral_form.referral_a, v.referral_form.referral_b].filter((vimg) => !!vimg).map((item: any) => (
              <button type="button" onClick={() => onViewReferral(v, item)} className="tw-w-[40px] tw-h-[40px] tw-text-[#6923D0] hover:tw-text-[#9c73d8]">
                <i className="bx bxs-image tw-text-[14pt]"></i>
              </button>
            ))}
          </div>),
      }
    }));
  }, [data, selectedProgramSection, selectedDepartment, education, filterByMonth, filterByInteractionType]);
  const handlePrint = React.useCallback(() => {
    let pathurl = `/print?form=counseling_report`;
    if (!!selectedDepartment) {
      pathurl += `&department=${abb[selectedDepartment]}`;
    }
    if (!!selectedProgramSection) {
      pathurl += `&section=${selectedProgramSection}`;
    }
    if (!!sy) {
      pathurl += `&sy=${sy}`;
    }
    if (!Number.isNaN(Number.parseInt(filterByMonth))) {
      pathurl += `&month=${filterByMonth}`;
    }
    if (!!filterByInteractionType) {
      pathurl += `&interaction=${filterByInteractionType}`;
    }
    window.open((new URL(pathname(pathurl), window.location.origin)))
  }, [selectedDepartment, selectedProgramSection, sy, filterByMonth, filterByInteractionType]);

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  return (
    <div className="tw-container tw-mt-4 tw-relative">
      <button className="tw-absolute tw-right-0 tw-top-0 btn btn-primary" onClick={handlePrint}>Print</button>
      <h2>Counseling</h2>
      <div className="tw-flex tw-justify-between tw-w-full">
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
        <div className="flex justify-end">
          <div>
            <label>Filter By Month: </label>
            <div className="tw-max-w-[300px]">
              <div className="select-wrapper">
                <select className="form-select" value={filterByMonth} onChange={(e) => setFilterByMonth(e.target.value)}>
                  <option value="">-- Month --</option>
                  {monthList.map((month: string, index: number) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <label>Filter By Interaction Type: </label>
            <div className="tw-max-w-[300px]">
              <div className="select-wrapper">
                <select className="form-select" value={filterByInteractionType} onChange={(e) => setFilterByInteractionType(e.target.value)}>
                  <option value="">-- Interaction Type --</option>
                  {Object.values(InteractionType).map((itype: string, index: number) => (
                    <option key={itype + index} value={itype}>
                      {itype}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>Counseling Records of A.Y. {sy} - {Number.parseInt(sy) + 1}</p>
      <br />
      <Table defaultSortOrder={SortOrder.Descending} columns={columns} items={finalData}>
        <div>
          <button type="button" className="btn btn-primary tw-max-w-[250px]" onClick={onWalkedIn}>
            <i className="bx bx-plus"></i>&nbsp;Case Note
          </button>
        </div>
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
      </Table>
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(CounselingRecords));