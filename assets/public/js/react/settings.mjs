// @ts-ignore
import { pathname, React, ReactDOM, Swal, usePageData } from "./imports.mjs";
const $pageRoot = $("#page-root");
function SettingsPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const { user } = usePageData(setIsLoading);
    const [isPosting, setIsPosting] = React.useState(false);
    const [inputDataA, setInputDataA] = React.useState({});
    const [inputDataB, setInputDataB] = React.useState({
        id: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    React.useEffect(() => {
        if (user) {
            setInputDataA({ ...user });
            setInputDataB({ ...inputDataB, id: user.id });
        }
    }, [user]);
    const handleChangeA = React.useCallback((key, value) => {
        setInputDataA({ ...inputDataA, [key]: value });
    }, [inputDataA]);
    const handleChangeB = React.useCallback((key, value) => {
        setInputDataB({ ...inputDataB, [key]: value });
    }, [inputDataB]);
    const onSubmitA = React.useCallback((e) => {
        e.preventDefault();
        setIsPosting(true);
        // Make API call to update user profile
        const url = new URL(pathname("/api/post/change/profile"), window.location.origin);
        $.post(url.toString(), { ...inputDataA })
            .done(function ({ success, error }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error Updating Profile",
                    text: error,
                });
            }
            else if (success) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated Successfully",
                });
            }
            setIsPosting(false);
        })
            .fail(function (_, statusText) {
            Swal.fire({
                icon: "error",
                title: "Error Updating Profile",
                text: statusText,
            });
            setIsPosting(false);
        });
    }, [inputDataA]);
    const onSubmitB = React.useCallback((e) => {
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
        $.post(url.toString(), { ...inputDataB })
            .done(function ({ success, error }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error Changing Password",
                    text: error,
                });
            }
            else if (success) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Changing Password",
                });
            }
            setIsPosting(false);
        })
            .fail(function (_, statusText, error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error Changing Password",
                text: statusText,
            });
            setIsPosting(false);
        });
    }, [inputDataB]);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", { className: "tw-relative" },
        isPosting && (React.createElement("div", { className: "tw-w-full tw-h-full tw-absolute tw-left-0 tw-top-0 tw-bg-black/50 tw-z-50 tw-flex tw-flex-col tw-justify-center tw-items-center" },
            React.createElement("div", { className: "tw-bg-white/70 tw-rounded-lg tw-px-4 tw-py-2 tw-text-font-semibold tw-text-lg" }, "Updating..."))),
        React.createElement("h3", null, "Settings"),
        React.createElement("form", { onSubmit: onSubmitA, className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-3 tw-gap-y-2" },
            React.createElement("div", null,
                React.createElement("h4", null, "Profile Settings")),
            React.createElement("div", null),
            React.createElement("div", null, user?.role === "student" ? "Student ID:" : user?.role === "admin" ? "Employee ID:" : "Username"),
            React.createElement("div", null, user?.role === "student" ? user?.username : React.createElement("input", { type: "text", className: "form-control", value: inputDataA?.username, onChange: (e) => handleChangeA("usernmae", e.target.value), required: true })),
            React.createElement("div", null, "First Name:"),
            React.createElement("div", null, user?.role === "student" ? user?.first_name : React.createElement("input", { type: "text", className: "form-control", value: inputDataA?.first_name, onChange: (e) => handleChangeA("first_name", e.target.value), required: true })),
            React.createElement("div", null, "Middle Initial:"),
            React.createElement("div", null, user?.role === "student" ? user?.middle_initial : React.createElement("input", { type: "text", className: "form-control", value: inputDataA?.middle_initial, onChange: (e) => handleChangeA("first_initial", e.target.value), maxLength: 1 })),
            React.createElement("div", null, "Last Name:"),
            React.createElement("div", null, user?.role === "student" ? user?.last_name : React.createElement("input", { type: "text", className: "form-control", value: inputDataA?.last_name, onChange: (e) => handleChangeA("last_name", e.target.value), required: true })),
            React.createElement("div", null, "Email Address:"),
            React.createElement("div", null, user?.role === "student" ? user?.email : React.createElement("input", { type: "text", className: "form-control", value: inputDataA?.email, onChange: (e) => handleChangeA("email", e.target.value), required: true })),
            React.createElement("div", null, "Gender:"),
            React.createElement("div", { className: "select-wrapper" },
                React.createElement("select", { className: "form-select", value: inputDataA?.gender, onChange: (e) => handleChangeA("gender", e.target.value) },
                    React.createElement("option", { value: "" }, "Select Gender"),
                    React.createElement("option", { value: "Male" }, "Male"),
                    React.createElement("option", { value: "Female" }, "Female"))),
            React.createElement("div", null),
            React.createElement("div", null,
                React.createElement("button", { type: "submit", className: "btn btn-success", disabled: isPosting }, "Change Profile"))),
        React.createElement("br", null),
        React.createElement("form", { onSubmit: onSubmitB, className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-x-3 tw-gap-y-2" },
            React.createElement("div", null,
                React.createElement("h4", null, "Password Settings")),
            React.createElement("div", null,
                React.createElement("p", null, "Change your password to enhance security.")),
            React.createElement("div", null, "Old Password:"),
            React.createElement("div", null,
                React.createElement("input", { type: "password", className: "form-control", value: inputDataB.oldPassword, onChange: (e) => handleChangeB("oldPassword", e.target.value) })),
            React.createElement("div", null, "New Password:"),
            React.createElement("div", null,
                React.createElement("input", { type: "password", className: "form-control", value: inputDataB.newPassword, onChange: (e) => handleChangeB("newPassword", e.target.value), required: !!inputDataB.oldPassword })),
            React.createElement("div", null, "Confirm Password:"),
            React.createElement("div", null,
                React.createElement("input", { type: "password", className: "form-control", value: inputDataB.confirmPassword, onChange: (e) => handleChangeB("confirmPassword", e.target.value), required: !!inputDataB.oldPassword })),
            React.createElement("div", null),
            React.createElement("div", null,
                React.createElement("button", { type: "submit", className: "btn btn-success", disabled: isPosting || (!inputDataB.oldPassword || !inputDataB.newPassword || !inputDataB.confirmPassword || (inputDataB.newPassword !== inputDataB.confirmPassword)) }, "Change Password")))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(SettingsPage));
