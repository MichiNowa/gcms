// @ts-ignore
import { pathname, React, ReactDOM, ReactDOMServer, Swal, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType, TableColumn } from "./table.mjs";

const $pageRoot = $("#page-root");


enum Gender {
  Male = "Male",
  Female = "Female",
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

type DataValueType = UserInfo[] | undefined

const columns: TableColumn[] = [
  { label: "Photo", key: "profile_pic", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Student ID", key: "username", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "First Name", key: "first_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
  { label: "Middle Initial", key: "middle_initial", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Last Name", key: "last_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
  { label: "Gender", key: "gender", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Email", key: "email", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
  { label: "Remind Student", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];

function displayDate(dateString: string)
{
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}


function sendReminderNotification(sy: string|number, syid: string|number, student_id: string|number, onSuccess: any, onError: any) {
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
                    <p>We would like to remind you to submit your <a href={homepage + "profile"}>Student Profile</a> for S.Y. {sy} on Guidance Counseling Management System (SMCC).
                    <br />Thank you.</p>
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
      subject: `Reminder on Student Profile Submission | Guidance Office (SMCC)`,
      body: bodyHTMLString.replaceAll("\n", "").trim(),
      title: "Reminder on Student Profile Submission",
      message: `Reminding you to submit your <a href={homepage + "profile"}>Student Profile</a> for S.Y. ${sy}. Thank you.`,
      href: "/profile",
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
      .fail(function(_: any, statusText: any) {
        console.log("Something went wrong", statusText);
        onError && onError(statusText);
      })
  } catch (error) {
    console.error("Error broadcasting notification:", error);
    onError && onError(error);
  }
}

function broadcastNotification(sy: string|number, syid: string|number, onSuccess: any, onError: any) {
  try {
    const broadcastUrl = new URL(
      pathname("/api/post/broadcast/notification"),
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
                    <p>We would like to remind you to submit your <a href={homepage + "profile"}>Student Profile</a> for S.Y. {sy} on Guidance Counseling Management System (SMCC).
                    <br />Thank you.</p>
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
      subject: `Reminder on Student Profile Submission | Guidance Office (SMCC)`,
      body: bodyHTMLString.replaceAll("\n", "").trim(),
      title: "Reminder on Student Profile Submission",
      message: `Reminding you to submit your <a href="${homepage + 'profile'}">Student Profile</a> for S.Y. ${sy}. Thank you.`,
      href: "/profile",
    };
    // Broadcast notification to all users
    $.post(broadcastUrl.toString(), postData)
      .done(function ({ success, error }: any) {
        if (success) {
          onSuccess && onSuccess(success)
        } else if (error) {
          onError && onError(error);
        }
      })
      .fail(function(_: any, statusText: any) {
        console.log("Something went wrong", statusText);
        onError && onError(statusText);
      })
  } catch (error) {
    console.error("Error broadcasting notification:", error);
    onError && onError(error);
  }
}

function AllAdminPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { school_years, all_not_submitted } = usePageData(setIsLoading);
  const [selectedSchoolYear, setSelectedSchoolYear] = React.useState<string>((new Date()).getFullYear().toString());
  const { notsubmitted, sy, syid } = React.useMemo(() => {
    const selSy = Array.isArray(school_years) ? school_years.find((yr: any) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
    let notsub = Array.isArray(all_not_submitted) ? all_not_submitted.find((nots: any) => nots.sy.toString() === selSy?.year?.toString()) : undefined;
    notsub = !!notsub?.notsubmitted ? [...(notsub.notsubmitted)] : [];
    return {
      notsubmitted: notsub,
      sy: selSy?.year,
      syid: selSy?.id,
    }
  }, [school_years, all_not_submitted, selectedSchoolYear]);

  const data = React.useMemo<DataValueType>(() => notsubmitted as DataValueType, [notsubmitted]);

  const onSendReminderToAll = React.useCallback(() => {
    Swal.fire({
      icon: "question",
      title: `Send Reminder to all students listed?`,
      text: "Are you sure you want to send a reminder to this students listed?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send reminder",
      cancelButtonText: "No, cancel",
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) {
        broadcastNotification(sy, syid, (success: string) => {
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
    });
  }, [data]);

  const onSendReminder = React.useCallback((student: UserInfo) => {
    Swal.fire({
      icon: "question",
      title: `Send Reminder to ${student?.first_name} ${student?.middle_initial} ${student?.last_name}?`,
      text: "Are you sure you want to send a reminder to this student?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send reminder",
      cancelButtonText: "No, cancel",
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) {
      sendReminderNotification(sy, syid, student?.id, (success: string) => {
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
    });
  }, [sy, syid])

  const items = React.useMemo(() => data?.map((item: UserInfo) => ({
    id: item?.id,
    profile_pic: {
      value: item.profile_pic || 'none',
      content: <img src={new URL(pathname("/" + item.profile_pic || '/images/default-user.png')).toString()} alt="Profile Pic" width="30" height="30" className="tw-mx-auto tw-w-[30px] tw-h-[30px]" />
    },
    username: item.username,
    first_name: item.first_name,
    middle_initial: item.middle_initial ? item.middle_initial + ". " : "",
    last_name: item.last_name,
    gender: item.gender,
    email: item.gender,
    action: <button type="button" className="tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-blue-400 hover:tw-bg-blue-200" onClick={() => onSendReminder(item)}>Send Reminder</button>
  })) || [], [data]);

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  return (
    <div className="tw-container tw-mt-4">
      <h2>No Profiles Submitted Yet</h2>
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
      <p>All not submitted student profiles of A.Y. {sy} - {Number.parseInt(sy) + 1}</p>
      <Table columns={columns} items={items}>
        <div>
          <button type="button" className="btn btn-primary" onClick={onSendReminderToAll}>
            Send Reminder To All
          </button>
        </div>
      </Table>
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(AllAdminPage));