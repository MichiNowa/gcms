// @ts-ignore
import { pathname, React, ReactDOM, Swal, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType, TableColumn } from "./table.mjs";
// @ts-ignore
import { EditIcon } from "./icons.mjs";

const $pageRoot = $("#page-root");

const columns: TableColumn[] = [
  { label: "Photo", key: "profile_pic", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Employee ID", key: "username", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "First Name", key: "first_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Middle Initial", key: "middle_initial", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Last Name", key: "last_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Gender", key: "gender", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Email Address", key: "email", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Status", key: "status", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Created Date", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];

function AllStudentPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { students } = usePageData(setIsLoading);

  const onSetActive = React.useCallback((row: any) => {
    Swal.fire({
      icon: "question",
      title: "Set Active?",
      text: "Are you sure you want to set this student account as active?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, set active",
      cancelButtonText: "No, cancel",
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) {
        $.post(pathname("/api/set/student/active"), { id: row.id })
          .done(function({ error, success }: any) {
            if (error) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
                footer: 'Please try again later.'
              })
            } else if (success) {
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Student account set as active successfully.",
              });
              window.location.reload();
            }
          })
          .fail(function(e: any, statusText: any) {
            console.log(e, statusText);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: statusText,
              footer: 'Please try again later.'
            })
          })
      }
    })
  }, [])

  const onSetInactive = React.useCallback((row: any) => {
    Swal.fire({
      icon: "question",
      title: "Set Inactive?",
      text: "Are you sure you want to set this student account as inactive?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, set inactive",
      cancelButtonText: "No, cancel",
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) {
        $.post(pathname("/api/set/student/inactive"), { id: row.id })
          .done(function({ error, success }: any) {
            if (error) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
                footer: 'Please try again later.'
              })
            } else if (success) {
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Student account set as inactive successfully.",
              });
              window.location.reload();
            }
          })
          .fail(function(e: any, statusText: any) {
            console.log(e, statusText);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: statusText,
              footer: 'Please try again later.'
            })
          })
      }
    })
  }, [])

  const onEditAccount = React.useCallback((row: any) => {
    Object.keys(row).forEach(key => {
      $('#edit-student-form').find('#edit_' + key).val(row[key]);
    });
  }, [])

  const items = React.useMemo(() => students?.map((student: any) => ({
    id: student.id,
    profile_pic: {
      value: student.profile_pic || 'none',
      content: <img src={new URL(pathname("/" + student.profile_pic || '/images/default-user.png')).toString()} alt="Profile Pic" width="30" height="30" className="tw-mx-auto tw-w-[30px] tw-h-[30px]" />
    },
    username: student.username,
    first_name: student.first_name,
    middle_initial: student.middle_initial,
    last_name: student.last_name,
    gender: student.gender,
    email: student.email,
    status: {
      value: !student.status ? 'inactive' : 'active',
      content: !student.status
        ? <div><button type="button" onClick={() => onSetActive(student)} className="tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-red-500 hover:tw-bg-red-200">Inactive</button></div>
        : <div><button type="button" onClick={() => onSetInactive(student)} className="tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-green-500 hover:tw-bg-green-200">Active</button></div>,
    },
    created_at: student.created_at,
    action: <button type="button" onClick={() => onEditAccount(student)} data-bs-toggle="modal" data-bs-target="#edit-student-account-modal"><EditIcon className="tw-inline tw-size-4" /><span className="tw-inline tw-ml-1">Edit</span></button>,
  })) || [], [students]);

  React.useEffect(() => {
    $("#edit-student-form").on("submit", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const formData = new FormData(this as any);
      const body = {
        ...Object.fromEntries(formData),
        role: 'student'
      };
      $.post(pathname("/api/post/edit/student"), body)
        .done(function({ success, error }: any) {
          if (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error,
              footer: 'Please try again later.'
            })
          } else if (success) {
            $("#edit-student-account-modal").trigger("reset");
            Swal.fire({
              icon:'success',
              title: 'Student Account Updated!',
              text: 'Successfully updated student account.',
            });
            setTimeout(() => window.location.reload(), 500);
          }
        })
        .fail(function(e: any, statusText: any) {
          console.log(`Error:`, e);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: statusText,
            footer: 'Please try again later.'
          })
        })
    });
  }, [])

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  return (
    <div className="tw-container tw-mt-4">
      <h2>Student Accounts</h2>
      <p>Manage all student accounts.</p>
      <Table columns={columns} items={items} />
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(AllStudentPage));