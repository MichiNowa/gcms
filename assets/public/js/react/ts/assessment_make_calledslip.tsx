// @ts-ignore
import { React, ReactDOM, Swal, pathname, usePageData } from "./imports.mjs";

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

enum Education {
  Basic = "basic",
  College = "college",
  None = ""
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

interface Student {
  user: UserInfo
  profile: any
  education: Education
  educ_profile: BasicStudentInfo|CollegeStudentInfo
}

function displayDate(date: string) {
  if (!date) return "(Not Set)";
  const dateObj = new Date(date);
  // format date in MMMM d, YYYY
  return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}

function displayTime(time: string) {
  if (!time) return "(Not Set)";
 // time in 12-H
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const ampm = hours >= 12? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function getNextDate() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today;
}

function AssessmentMakeCalledSlip() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const { sy, student, guidance } = usePageData(setIsLoading);
  const studentData: Student = React.useMemo(() => student as Student, [student]);
  const guidanceData: UserInfo = React.useMemo(() => guidance as UserInfo, [guidance]);
  const [inputData, setInputData] = React.useState({});

  const onSubmit = React.useCallback((e: any) => {
    e.preventDefault();
    setDisableButton(true);
    const url = new URL(pathname('/api/post/calledslip/schedule'), window.location.origin);
    $.post(
      url.toString(),
      {
        student_id: studentData.user.id,
        sy: sy.id,
        ...inputData
      }
    )
      .done(function ({ success, error }: any) {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
          });
        } else if (success) {
          Swal.fire({
            icon:'success',
            title: 'Success',
            text: 'Called-in slip scheduled successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            window.location.reload();
          });
        }
        setDisableButton(false);
      })
      .fail(function(_: any, statusText: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: statusText,
        });
        setDisableButton(false);
      })
  }, [sy, studentData, inputData])

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  if (!studentData || !guidanceData) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Invalid Data.</div>
  }

  return (
    <div className="tw-container tw-mt-4">
      <h3 className="tw-text-center tw-w-full">CALLED-IN SLIP</h3>
      <form className="tw-mt-3" onSubmit={onSubmit}>
        <div className="tw-flex tw-justify-between tw-items-start">
          <div className="tw-block">
            <div className="tw-flex tw-gap-x-2">
              <div className="tw-font-bold">TO:</div>
              <div>{studentData?.user.first_name} {student?.user.middle_initial ? student?.user.middle_initial + ". " : ""}{student?.user.last_name} {student?.profile.suffix_name}</div>
            </div>
            <div className="tw-flex tw-gap-x-2">
              <div className="tw-font-bold">DATE:</div>
              <div>{(new Date()).toLocaleDateString()}</div>
            </div>
            <div className="tw-flex tw-gap-x-2">
              <div className="tw-font-bold">Student ID:</div>
              <div>{student?.user.username}</div>
            </div>
            <div className="tw-flex tw-gap-x-2">
              <div className="tw-font-bold">{student?.education === Education.Basic ? "Adviser:" : "Dean:"}</div>
              <div>{student?.education === Education.Basic ? student.educ_profile.adviser : student?.educ_profile.dean}</div>
            </div>
            {student?.education === Education.Basic && (<>
              <div className="tw-flex tw-gap-x-2">
                <div className="tw-font-bold">Grade Level:</div>
                <div>{student?.educ_profile.gradelevel}</div>
              </div>
              <div className="tw-flex tw-gap-x-2 tw-items-center">
                <div className="tw-font-bold">Section:</div>
                <div>{student?.educ_profile.section}</div>
              </div>
            </>)}
            {student?.education === Education.College && (<>
              <div className="tw-flex tw-gap-x-2">
                <div className="tw-font-bold">Department</div>
                <div>{student?.educ_profile.department}</div>
              </div>
              <div className="tw-flex tw-gap-x-2">
                <div className="tw-font-bold">Course:</div>
                <div>{student?.educ_profile.course}</div>
              </div>
              <div className="tw-flex tw-gap-x-2">
                <div className="tw-font-bold">Year Level:</div>
                <div>{student?.educ_profile.yearlevel}</div>
              </div>
            </>)}
          </div>
          <div>
            <div className="tw-flex tw-flex-col tw-justify-start tw-mb-2">
              <label htmlFor="scheduled_date">Schedule Date:</label>
              <div><input type="date" id="scheduled_date" min={getNextDate().toISOString().slice(0, 10)} className="form-control placeholder:tw-italic" placeholder="Enter Scheduled Date" value={inputData.scheduled_date} onChange={(e) => setInputData((prev: any) => ({...prev, scheduled_date: e.target.value }))} required /></div>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-start tw-mb-2">
              <label htmlFor="scheduled_time">Schedule Time:</label>
              <div><input type="time" id="scheduled_time" className="form-control placeholder:tw-italic" placeholder="Enter Scheduled Time" value={inputData.scheduled_time} onChange={(e) => setInputData((prev: any) => ({...prev, scheduled_time: e.target.value }))} required /></div>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-start tw-mb-2">
              <button type="submit" className="btn btn-primary" disabled={!inputData.scheduled_date || !inputData.scheduled_time || disableButton}>
                <i className="bx bx-calendar"></i> Create Called Slip Schedule
              </button>
            </div>
          </div>
        </div>
        <div className="tw-my-4">
          <span className="tw-font-bold">FROM: </span>
          <span>GUIDANCE COUNSELOR/IN-CHARGE</span>
        </div>
        <div className="tw-my-2">Good Day!</div>
        <div className="tw-mb-4">
          <p>The Guidance In-charge/Counselor would like to request your generous time for us to talk about some important matters. Your presence is highly needed to facilitate the said purpose. You are scheduled to see the Guidance. In-charge/Counselor on
          &nbsp;<span className="tw-underline">{displayDate(inputData.scheduled_date)} (Date)</span> at <span className="tw-underline">{displayTime(inputData.scheduled_time)} (Time)</span> in the Guidance Center.</p>
          <br />
          <p>Rest assured all the information that transpired during the session will be treated with respect and circumscribed by the confidentiality statement.</p>
          <br />
          <p>Thank you and More Power!</p>
        </div>
        <div className="tw-mb-8">Respectfully Yours,</div>
        <div className="tw-flex tw-flex-col tw-max-w-[300px] tw-text-center tw-mb-4">
          <div className="tw-border-b tw-border-black tw-uppercase">
            {guidanceData?.first_name} {guidanceData?.middle_initial ? guidanceData?.middle_initial + ". " : ""}{guidanceData?.last_name}
          </div>
          <div className="tw-text-sm tw-italic">
            Guidance In-charge/Counselor
          </div>
        </div>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(AssessmentMakeCalledSlip));