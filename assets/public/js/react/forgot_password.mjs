// @ts-ignore
import { React, ReactDOM, Swal, pathname } from "./imports.mjs";
const $pageRoot = $("#page-root");
function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasSent, setHasSent] = React.useState(false);
    const [hasVerified, setHasVerified] = React.useState(false);
    const [studentId, setStudentId] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [otpId, setOtpId] = React.useState(null);
    const [otpExpiry, setOtpExpiry] = React.useState(null);
    const otpExpired = React.useMemo(() => {
        if (!otpExpiry)
            return true;
        const now = Date.now();
        return now > otpExpiry.getTime();
    }, [otpExpiry]);
    const [tm, setTm] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setTm(!tm);
        }, 500);
    }, [tm]);
    const expiryTimeDisplay = React.useCallback(() => {
        if (otpExpired)
            return "Resend";
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
    const [verifiedUserId, setVerifiedUserId] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const onSubmitForgot = React.useCallback((e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = new URL(pathname('/api/post/forgot_password'), window.location.origin);
        const data = {
            student_id: studentId,
            last_name: lastName.toUpperCase().trim()
        };
        $.post(url.toString(), data)
            .done(function ({ success, error, otp_id, otp_expiry, email }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error,
                    timer: 3000,
                    timerProgressBar: true,
                    position: "top-end",
                });
            }
            else if (success) {
                console.log(otp_id, otp_expiry, email);
                console.log(new Date(otp_expiry));
                setOtpId(otp_id);
                setOtpExpiry(new Date(otp_expiry));
                setEmail(email);
                setHasSent(true);
            }
            setIsLoading(false);
        })
            .fail(function (_, statusText) {
            console.log("Error: ", statusText);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Please try again.",
                timer: 3000,
                showConfirmButton: false,
            });
            setIsLoading(false);
        });
    }, [studentId, lastName]);
    const onOtpSubmit = React.useCallback((e) => {
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
        };
        $.post(url.toString(), data)
            .done(function ({ success, error, user_id }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error,
                    timer: 3000,
                    timerProgressBar: true,
                    position: "top-end",
                });
            }
            else if (success) {
                setVerifiedUserId(user_id);
                setHasVerified(true);
            }
            setIsLoading(false);
        })
            .fail(function (_, statusText) {
            console.log("Error: ", statusText);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Please try again.",
                timer: 3000,
                showConfirmButton: false,
            });
            setIsLoading(false);
        });
    }, [otp, otpId, otpExpired]);
    const onChangePassword = React.useCallback((e) => {
        e.preventDefault();
        if (newPassword !== passwordConfirm) {
            Swal.fire({
                icon: "error",
                title: "Passwords do not match",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                position: "top-end",
            });
            return;
        }
        setIsLoading(true);
        const url = new URL(pathname('/api/post/change/password/forgot'), window.location.origin);
        const data = {
            id: verifiedUserId,
            otp: otpId,
            new_password: newPassword,
        };
        $.post(url.toString(), data)
            .done(function ({ success, error }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error,
                    timer: 3000,
                    timerProgressBar: true,
                    position: "top-end",
                });
            }
            else if (success) {
                Swal.fire({
                    icon: "success",
                    title: "Password changed successfully",
                    timer: 3000,
                    timerProgressBar: true,
                    position: "top-end",
                })
                    .then(() => {
                    window.location.href = pathname("/");
                });
            }
            setIsLoading(false);
        })
            .fail(function (_, statusText) {
            console.log("Error: ", statusText);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Please try again.",
                timer: 3000,
                showConfirmButton: false,
            });
            setIsLoading(false);
        });
    }, [newPassword, passwordConfirm, verifiedUserId, otpId]);
    return (React.createElement("div", { className: "container fluid text-center justify-content-center " },
        React.createElement("div", { className: "row justify-content-center mt-5" },
            React.createElement("div", { className: "col-sm-10 col-lg-4 bg-white border p-4 box " },
                !hasVerified && !hasSent && (React.createElement("form", { onSubmit: onSubmitForgot },
                    React.createElement("h1", { className: "h5 mb-3 text-muted" }, "Forgot Password"),
                    React.createElement("div", { className: "mb-3 tw-text-left" },
                        React.createElement("label", { className: "form-label", htmlFor: "studentid" }, "Student ID"),
                        React.createElement("div", { className: "form-floating" },
                            React.createElement("input", { type: "text", id: "studentid", value: studentId, onChange: (e) => setStudentId(e.target.value), className: "form-control form-control-lg", placeholder: "Student ID", disabled: isLoading, required: true }),
                            React.createElement("label", { htmlFor: "studentid" }, "Student ID"))),
                    React.createElement("div", { className: "mb-3 tw-text-left" },
                        React.createElement("label", { className: "form-label", htmlFor: "Last Name" }, "Last Name"),
                        React.createElement("div", { className: "form-floating" },
                            React.createElement("input", { type: "text", id: "lastname", value: lastName, onChange: (e) => setLastName(e.target.value), className: "form-control form-control-lg", placeholder: "Last Name", disabled: isLoading, required: true }),
                            React.createElement("label", { htmlFor: "lastname" }, "Last Name"),
                            React.createElement("button", { type: "button", className: "position-absolute tw-right-0 tw-top-0 tw-h-full tw-aspect-square p-2  " },
                                React.createElement("i", { className: "bi bi-eye-slash-fill" })))),
                    React.createElement("div", { className: "mt-3 d-flex justify-content-between align-items-center" },
                        React.createElement("button", { type: "submit", className: "btn btn-primary col-12", disabled: isLoading },
                            React.createElement("small", { className: "text-light" }, "Next"))))),
                !hasVerified && hasSent && (React.createElement("form", { onSubmit: onOtpSubmit },
                    React.createElement("h1", { className: "h5 mb-3 text-muted" }, "Forgot Password"),
                    React.createElement("p", null,
                        "OTP Verification Code has been sent to your email ",
                        React.createElement("span", { className: "tw-font-semibold" }, email?.split("").map((v, i) => i < (email?.indexOf("@") - 1) && i > 1 ? "*" : v).join(""))),
                    React.createElement("div", { className: "mb-3 tw-text-left" },
                        React.createElement("label", { className: "form-label", htmlFor: "otp" }, "OTP Verification Code:"),
                        React.createElement("div", { className: "form-floating" },
                            React.createElement("input", { type: "text", id: "otp", value: otp, onChange: (e) => setOtp(e.target.value), className: "form-control form-control-lg", placeholder: "Student ID" }),
                            React.createElement("label", { htmlFor: "otp" }, "Enter OTP Code:"))),
                    React.createElement("div", { className: "mt-3 d-flex justify-content-between align-items-center" },
                        React.createElement("button", { type: "submit", className: "btn btn-primary col-12", disabled: isLoading },
                            React.createElement("small", { className: "text-light" }, "Verify"))),
                    React.createElement("div", { className: "mt-3 d-flex justify-content-between align-items-center" },
                        React.createElement("button", { type: "button", onClick: onSubmitForgot, className: "btn btn-secondary col-12", disabled: isLoading || !otpExpired },
                            React.createElement("small", { className: "text-light" }, expiryTimeDisplay()))))),
                hasVerified && (React.createElement("form", { onSubmit: onChangePassword },
                    React.createElement("h1", { className: "h5 mb-3 text-muted" }, "Forgot Password"),
                    React.createElement("p", null,
                        "Student ID: ",
                        studentId),
                    React.createElement("div", { className: "mb-3 tw-text-left" },
                        React.createElement("label", { className: "form-label", htmlFor: "newpassword" }, "New Password"),
                        React.createElement("div", { className: "form-floating" },
                            React.createElement("input", { type: "password", id: "newpassword", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "form-control form-control-lg", placeholder: "Student ID", disabled: isLoading, required: true }),
                            React.createElement("label", { htmlFor: "newpassword" }, "Enter New Password"))),
                    React.createElement("div", { className: "mb-3 tw-text-left" },
                        React.createElement("label", { className: "form-label", htmlFor: "confirmpassword" }, "Confirm Password"),
                        React.createElement("div", { className: "form-floating" },
                            React.createElement("input", { type: "password", id: "confirmpassword", value: passwordConfirm, onChange: (e) => setPasswordConfirm(e.target.value), className: "form-control form-control-lg", placeholder: "Student ID", disabled: isLoading, required: true }),
                            React.createElement("label", { htmlFor: "confirmpassword" }, "Enter Confirm Password"))),
                    React.createElement("div", { className: "mt-3 d-flex justify-content-between align-items-center" },
                        React.createElement("button", { type: "submit", className: "btn btn-primary col-12", disabled: isLoading },
                            React.createElement("small", { className: "text-light" }, "Change Password")))))),
            React.createElement("div", { className: "col-12 mt-3 text-center" },
                React.createElement("span", null,
                    React.createElement("small", null,
                        "Don't Have an Account? ",
                        React.createElement("a", { href: pathname('/signup'), className: "text-decoration-none" }, "Register Here")))),
            React.createElement("div", { className: "col-12 mt-3 text-center" },
                React.createElement("span", null,
                    React.createElement("small", null,
                        "Already have an Account? ",
                        React.createElement("a", { href: pathname('/login'), className: "text-decoration-none" }, "Login Here")))))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(ForgotPasswordPage));
