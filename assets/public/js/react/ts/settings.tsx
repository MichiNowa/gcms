// @ts-ignore
import { pathname, React, ReactDOM, Swal, usePageData } from "./imports.mjs";

const $pageRoot = $("#page-root");

function SettingsPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { user } = usePageData(setIsLoading);
  const [isPosting, setIsPosting] = React.useState<boolean>(false);
  const [inputDataA, setInputDataA] = React.useState<any>({});
  const [inputDataB, setInputDataB] = React.useState<any>({
    id: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    if (user) {
      setInputDataA({...user });
      setInputDataB({ ...inputDataB, id: user.id });
    }
  }, [user])

  const handleChangeA = React.useCallback((key: string, value: string) => {
    setInputDataA({...inputDataA, [key]: value });
  }, [inputDataA]);

  const handleChangeB = React.useCallback((key: string, value: string) => {
    setInputDataB({...inputDataB, [key]: value });
  }, [inputDataB]);

  const onSubmitA = React.useCallback((e: any) => {
    e.preventDefault();
    setIsPosting(true);
    // Make API call to update user profile
    const url = new URL(pathname("/api/post/change/profile"), window.location.origin);
    $.post(url.toString(), {...inputDataA})
      .done(function ({ success, error }: any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error Updating Profile",
            text: error,
          });
        } else if (success) {
          Swal.fire({
            icon: "success",
            title: "Profile Updated Successfully",
          });
        }
        setIsPosting(false);
      })
      .fail(function (_: any, statusText: any) {
        Swal.fire({
          icon: "error",
          title: "Error Updating Profile",
          text: statusText,
        });
        setIsPosting(false);
      })
  }, [inputDataA]);

  const onSubmitB = React.useCallback((e: any) => {
    e.preventDefault();
    if (!inputDataB.oldPassword) {
      Swal.fire({
        icon: "error",
        title: "Old Password Required",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return;
    }
    setIsPosting(true);
    // Make API call to update user profile
    const url = new URL(pathname("/api/post/change/password"), window.location.origin);
    $.post(url.toString(), {...inputDataB})
      .done(function ({ success, error }: any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error Changing Password",
            text: error,
          });
        } else if (success) {
          Swal.fire({
            icon: "success",
            title: "Profile Changing Password",
          });
        }
        setIsPosting(false);
      })
      .fail(function (_: any, statusText: any, error: any) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error Changing Password",
          text: statusText,
        });
        setIsPosting(false);
      })
  }, [inputDataB]);

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  return (
    <div className="tw-relative">
      {isPosting && (
        <div className="tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0 tw-bg-black/50 tw-z-50 tw-flex tw-flex-col tw-justify-center tw-items-center">
          <div className="tw-bg-white/70 tw-rounded-lg tw-px-4 tw-py-2 tw-text-font-semibold tw-text-lg">
            Updating...
          </div>
        </div>
      )}
      <h3>Settings</h3>
      <form onSubmit={onSubmitA} className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-3 tw-gap-y-2">
        <div>
          <h4>Profile Settings</h4>
        </div>
        <div></div>
        <div>{user?.role === "student" ? "Student ID:" : user?.role === "admin" ? "Employee ID:" : "Username"}</div>
        <div>{user?.role === "student" ? user?.username : <input type="text" className="form-control" value={inputDataA?.username} onChange={(e) => handleChangeA("usernmae", e.target.value)} required />}</div>
        <div>First Name:</div>
        <div>{user?.role === "student" ? user?.first_name : <input type="text" className="form-control" value={inputDataA?.first_name} onChange={(e) => handleChangeA("first_name", e.target.value)} required />}</div>
        <div>Middle Initial:</div>
        <div>{user?.role === "student" ? user?.middle_initial : <input type="text" className="form-control" value={inputDataA?.middle_initial} onChange={(e) => handleChangeA("first_initial", e.target.value)} maxLength={1} />}</div>
        <div>Last Name:</div>
        <div>{user?.role === "student" ? user?.last_name : <input type="text" className="form-control" value={inputDataA?.last_name} onChange={(e) => handleChangeA("last_name", e.target.value)} required />}</div>
        <div>Email Address:</div>
        <div>{user?.role === "student" ? user?.email : <input type="text" className="form-control" value={inputDataA?.email} onChange={(e) => handleChangeA("email", e.target.value)} required />}</div>
        <div>Gender:</div>
        <div className="select-wrapper">
          <select className="form-select" value={inputDataA?.gender} onChange={(e) => handleChangeA("gender", e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div></div>
        <div><button type="submit" className="btn btn-success" disabled={isPosting}>Change Profile</button></div>
      </form>
      <br />
      <form onSubmit={onSubmitB} className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-3 tw-gap-y-2">
        <div>
          <h4>Password Settings</h4>
        </div>
        <div><p>Change your password to enhance security.</p></div>
        <div>Old Password:</div>
        <div><input type="password" className="form-control" value={inputDataB.oldPassword} onChange={(e) => handleChangeB("oldPassword", e.target.value)} /></div>
        <div>New Password:</div>
        <div><input type="password" className="form-control" value={inputDataB.newPassword} onChange={(e) => handleChangeB("newPassword", e.target.value)} required={!!inputDataB.oldPassword} /></div>
        <div>Confirm Password:</div>
        <div><input type="password" className="form-control" value={inputDataB.confirmPassword} onChange={(e) => handleChangeB("confirmPassword", e.target.value)} required={!!inputDataB.oldPassword} /></div>
        <div></div>
        <div><button type="submit" className="btn btn-success" disabled={isPosting || (!inputDataB.oldPassword || !inputDataB.newPassword || !inputDataB.confirmPassword || (inputDataB.newPassword !== inputDataB.confirmPassword))}>Change Password</button></div>
      </form>
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(SettingsPage));