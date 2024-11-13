// @ts-ignore
import { React, ReactDOM, Swal, pathname } from "./imports.mjs";

const $pageRoot = $("#page-root");

function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasSent, setHasSent] = React.useState<boolean>(false);
  const [hasVerified, setHasVerified] = React.useState<boolean>(false);
  const [studentId, setStudentId] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");

  const [email, setEmail] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [otpId, setOtpId] = React.useState<null|number>(null);
  const [otpExpiry, setOtpExpiry] = React.useState<Date|null>(null);
  const otpExpired = React.useMemo(() => {
    if (!otpExpiry) return true;
    const now = Date.now();
    return now > otpExpiry.getTime();
  }, [otpExpiry]);
  const [tm, setTm] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setTm(!tm);
    }, 500);
  }, [tm])

  const expiryTimeDisplay = React.useCallback(() => {
    if (otpExpired) return "Resend"
    let now = new Date();
    let diff = otpExpiry.getTime() - now.getTime();
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    minutes %= 60;
    seconds %= 60;
    if (minutes === 0) {
      return `${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  }, [otpExpiry, otpExpired, tm]);



  const [verifiedUserId, setVerifiedUserId] = React.useState<null|number>(null);
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");

  const onSubmitForgot = React.useCallback((e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const url = new URL(pathname('/api/post/forgot_password'), window.location.origin);
    const data = {
      student_id: studentId,
      last_name: lastName.toUpperCase().trim()
    }
    $.post(url.toString(), data)
      .done(function({ success, error, otp_id, otp_expiry, email }: any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
            timer: 3000,
            timerProgressBar: true,
            position: "top-end",
          })
        } else if (success) {
          console.log(otp_id, otp_expiry, email);
          console.log(new Date(otp_expiry));
          setOtpId(otp_id);
          setOtpExpiry(new Date(otp_expiry));
          setEmail(email);
          setHasSent(true);
        }
        setIsLoading(false);
      })
      .fail(function(_: any, statusText: any) {
        console.log("Error: ", statusText);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Please try again.",
          timer: 3000,
          showConfirmButton: false,
        })
        setIsLoading(false);
      })
  }, [studentId, lastName]);

  const onOtpSubmit = React.useCallback((e: any) => {
    e.preventDefault();
    if (otpExpired) {
      Swal.fire({
        icon: 'error',
        title: "OTP Expired",
        text: "The OTP has expired. Please request a new one.",
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
      });
      return;
    }
    setIsLoading(true);
    const url = new URL(pathname('/api/post/verify/otp'), window.location.origin);
    const data = {
      id: otpId,
      otp,
    }
    $.post(url.toString(), data)
      .done(function({ success, error, user_id }: any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
            timer: 3000,
            timerProgressBar: true,
            position: "top-end",
          })
        } else if (success) {
          setVerifiedUserId(user_id);
          setHasVerified(true)
        }
        setIsLoading(false);
      })
      .fail(function(_: any, statusText: any) {
        console.log("Error: ", statusText);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Please try again.",
          timer: 3000,
          showConfirmButton: false,
        })
        setIsLoading(false);
      })
  }, [otp, otpId, otpExpired]);

  const onChangePassword = React.useCallback((e: any) => {
    e.preventDefault();
    if (newPassword !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        position: "top-end",
      })
      return;
    }
    setIsLoading(true);
    const url = new URL(pathname('/api/post/change/password/forgot'), window.location.origin);
    const data = {
      id: verifiedUserId,
      otp: otpId,
      new_password: newPassword,
    }
    $.post(url.toString(), data)
      .done(function({ success, error }: any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
            timer: 3000,
            timerProgressBar: true,
            position: "top-end",
          })
        } else if (success) {
          Swal.fire({
            icon: "success",
            title: "Password changed successfully",
            timer: 3000,
            timerProgressBar: true,
            position: "top-end",
          })
          .then(() => {
            window.location.href = pathname("/");
          })
        }
        setIsLoading(false);
      })
      .fail(function(_: any, statusText: any) {
        console.log("Error: ", statusText);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Please try again.",
          timer: 3000,
          showConfirmButton: false,
        })
        setIsLoading(false);
      })
  }, [newPassword, passwordConfirm, verifiedUserId, otpId]);

  return (
    <div className="container fluid text-center justify-content-center ">
      <div className="row justify-content-center mt-5">
        <div className="col-sm-10 col-lg-4 bg-white border p-4 box ">
          {!hasVerified && !hasSent && (
            <form onSubmit={onSubmitForgot}>
              <h1 className="h5 mb-3 text-muted">Forgot Password</h1>
              <div className="mb-3 tw-text-left">
                <label className="form-label" htmlFor="studentid">Student ID</label>
                <div className="form-floating">
                  <input type="text" id="studentid" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="form-control form-control-lg" placeholder="Student ID" disabled={isLoading} required />
                  <label htmlFor="studentid">Student ID</label>
                </div>
              </div>
              <div className="mb-3 tw-text-left">
                <label className="form-label" htmlFor="Last Name">Last Name</label>
                <div className="form-floating">
                  <input type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control form-control-lg" placeholder="Last Name" disabled={isLoading} required />
                  <label htmlFor="lastname">Last Name</label>
                  <button type="button" className="position-absolute tw-right-0 tw-top-0 tw-h-full tw-aspect-square p-2  ">
                    <i className="bi bi-eye-slash-fill"></i>
                  </button>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary col-12" disabled={isLoading} ><small className="text-light">Next</small></button>
              </div>
            </form>
          )}
          {!hasVerified && hasSent && (
            <form onSubmit={onOtpSubmit}>
              <h1 className="h5 mb-3 text-muted">Forgot Password</h1>
              <p>OTP Verification Code has been sent to your email <span className="tw-font-semibold">{email?.split("").map((v: string, i: number) => i < (email?.indexOf("@") - 1) && i > 1 ? "*" : v).join("")}</span></p>
              <div className="mb-3 tw-text-left">
                <label className="form-label" htmlFor="otp">OTP Verification Code:</label>
                <div className="form-floating">
                  <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="form-control form-control-lg" placeholder="Student ID" />
                  <label htmlFor="otp">Enter OTP Code:</label>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary col-12" disabled={isLoading}><small className="text-light">Verify</small></button>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <button type="button" onClick={onSubmitForgot} className="btn btn-secondary col-12" disabled={isLoading || !otpExpired}><small className="text-light">{expiryTimeDisplay()}</small></button>
              </div>
            </form>
          )}
          {hasVerified && (
            <form onSubmit={onChangePassword}>
              <h1 className="h5 mb-3 text-muted">Forgot Password</h1>
              <p>Student ID: {studentId}</p>
              <div className="mb-3 tw-text-left">
                <label className="form-label" htmlFor="newpassword">New Password</label>
                <div className="form-floating">
                  <input type="password" id="newpassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control form-control-lg" placeholder="Student ID" disabled={isLoading} required />
                  <label htmlFor="newpassword">Enter New Password</label>
                </div>
              </div>
              <div className="mb-3 tw-text-left">
                <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                <div className="form-floating">
                  <input type="password" id="confirmpassword" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="form-control form-control-lg" placeholder="Student ID" disabled={isLoading} required />
                  <label htmlFor="confirmpassword">Enter Confirm Password</label>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary col-12" disabled={isLoading}><small className="text-light">Change Password</small></button>
              </div>
            </form>
          )}
        </div>
        <div className="col-12 mt-3 text-center">
          <span><small>Don't Have an Account? <a href={pathname('/signup')} className="text-decoration-none">Register Here</a></small></span>
        </div>
        <div className="col-12 mt-3 text-center">
          <span><small>Already have an Account? <a href={pathname('/login')} className="text-decoration-none">Login Here</a></small></span>
        </div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(ForgotPasswordPage));