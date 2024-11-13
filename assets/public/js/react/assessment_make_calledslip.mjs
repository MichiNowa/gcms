// @ts-ignore
import { React, ReactDOM, Swal, pathname, usePageData } from "./imports.mjs";
const $pageRoot = $("#page-root");
var StatusValue;
(function (StatusValue) {
    StatusValue["Pending"] = "pending";
    StatusValue["Completed"] = "completed";
    StatusValue["Rejected"] = "rejected";
})(StatusValue || (StatusValue = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
})(Gender || (Gender = {}));
var Education;
(function (Education) {
    Education["Basic"] = "basic";
    Education["College"] = "college";
    Education["None"] = "";
})(Education || (Education = {}));
function displayDate(date) {
    if (!date)
        return "(Not Set)";
    const dateObj = new Date(date);
    // format date in MMMM d, YYYY
    return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}
function displayTime(time) {
    if (!time)
        return "(Not Set)";
    // time in 12-H
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}
function getNextDate() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
}
function AssessmentMakeCalledSlip() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [disableButton, setDisableButton] = React.useState(false);
    const { sy, student, guidance } = usePageData(setIsLoading);
    const studentData = React.useMemo(() => student, [student]);
    const guidanceData = React.useMemo(() => guidance, [guidance]);
    const [inputData, setInputData] = React.useState({});
    const onSubmit = React.useCallback((e) => {
        e.preventDefault();
        setDisableButton(true);
        const url = new URL(pathname('/api/post/calledslip/schedule'), window.location.origin);
        $.post(url.toString(), {
            student_id: studentData.user.id,
            sy: sy.id,
            ...inputData
        })
            .done(function ({ success, error }) {
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                });
            }
            else if (success) {
                Swal.fire({
                    icon: 'success',
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
            .fail(function (_, statusText) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: statusText,
            });
            setDisableButton(false);
        });
    }, [sy, studentData, inputData]);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    if (!studentData || !guidanceData) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Invalid Data.");
    }
    return (React.createElement("div", { className: "tw-container tw-mt-4" },
        React.createElement("h3", { className: "tw-text-center tw-w-full" }, "CALLED-IN SLIP"),
        React.createElement("form", { className: "tw-mt-3", onSubmit: onSubmit },
            React.createElement("div", { className: "tw-flex tw-justify-between tw-items-start" },
                React.createElement("div", { className: "tw-block" },
                    React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                        React.createElement("div", { className: "tw-font-bold" }, "TO:"),
                        React.createElement("div", null,
                            studentData?.user.first_name,
                            " ",
                            student?.user.middle_initial ? student?.user.middle_initial + ". " : "",
                            student?.user.last_name,
                            " ",
                            student?.profile.suffix_name)),
                    React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                        React.createElement("div", { className: "tw-font-bold" }, "DATE:"),
                        React.createElement("div", null, (new Date()).toLocaleDateString())),
                    React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                        React.createElement("div", { className: "tw-font-bold" }, "Student ID:"),
                        React.createElement("div", null, student?.user.username)),
                    React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                        React.createElement("div", { className: "tw-font-bold" }, student?.education === Education.Basic ? "Adviser:" : "Dean:"),
                        React.createElement("div", null, student?.education === Education.Basic ? student.educ_profile.adviser : student?.educ_profile.dean)),
                    student?.education === Education.Basic && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                            React.createElement("div", { className: "tw-font-bold" }, "Grade Level:"),
                            React.createElement("div", null, student?.educ_profile.gradelevel)),
                        React.createElement("div", { className: "tw-flex tw-gap-x-2 tw-items-center" },
                            React.createElement("div", { className: "tw-font-bold" }, "Section:"),
                            React.createElement("div", null, student?.educ_profile.section)))),
                    student?.education === Education.College && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                            React.createElement("div", { className: "tw-font-bold" }, "Department"),
                            React.createElement("div", null, student?.educ_profile.department)),
                        React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                            React.createElement("div", { className: "tw-font-bold" }, "Course:"),
                            React.createElement("div", null, student?.educ_profile.course)),
                        React.createElement("div", { className: "tw-flex tw-gap-x-2" },
                            React.createElement("div", { className: "tw-font-bold" }, "Year Level:"),
                            React.createElement("div", null, student?.educ_profile.yearlevel))))),
                React.createElement("div", null,
                    React.createElement("div", { className: "tw-flex tw-flex-col tw-justify-start tw-mb-2" },
                        React.createElement("label", { htmlFor: "scheduled_date" }, "Schedule Date:"),
                        React.createElement("div", null,
                            React.createElement("input", { type: "date", id: "scheduled_date", min: getNextDate().toISOString().slice(0, 10), className: "form-control placeholder:tw-italic", placeholder: "Enter Scheduled Date", value: inputData.scheduled_date, onChange: (e) => setInputData((prev) => ({ ...prev, scheduled_date: e.target.value })), required: true }))),
                    React.createElement("div", { className: "tw-flex tw-flex-col tw-justify-start tw-mb-2" },
                        React.createElement("label", { htmlFor: "scheduled_time" }, "Schedule Time:"),
                        React.createElement("div", null,
                            React.createElement("input", { type: "time", id: "scheduled_time", className: "form-control placeholder:tw-italic", placeholder: "Enter Scheduled Time", value: inputData.scheduled_time, onChange: (e) => setInputData((prev) => ({ ...prev, scheduled_time: e.target.value })), required: true }))),
                    React.createElement("div", { className: "tw-flex tw-flex-col tw-justify-start tw-mb-2" },
                        React.createElement("button", { type: "submit", className: "btn btn-primary", disabled: !inputData.scheduled_date || !inputData.scheduled_time || disableButton },
                            React.createElement("i", { className: "bx bx-calendar" }),
                            " Create Called Slip Schedule")))),
            React.createElement("div", { className: "tw-my-4" },
                React.createElement("span", { className: "tw-font-bold" }, "FROM: "),
                React.createElement("span", null, "GUIDANCE COUNSELOR/IN-CHARGE")),
            React.createElement("div", { className: "tw-my-2" }, "Good Day!"),
            React.createElement("div", { className: "tw-mb-4" },
                React.createElement("p", null,
                    "The Guidance In-charge/Counselor would like to request your generous time for us to talk about some important matters. Your presence is highly needed to facilitate the said purpose. You are scheduled to see the Guidance. In-charge/Counselor on \u00A0",
                    React.createElement("span", { className: "tw-underline" },
                        displayDate(inputData.scheduled_date),
                        " (Date)"),
                    " at ",
                    React.createElement("span", { className: "tw-underline" },
                        displayTime(inputData.scheduled_time),
                        " (Time)"),
                    " in the Guidance Center."),
                React.createElement("br", null),
                React.createElement("p", null, "Rest assured all the information that transpired during the session will be treated with respect and circumscribed by the confidentiality statement."),
                React.createElement("br", null),
                React.createElement("p", null, "Thank you and More Power!")),
            React.createElement("div", { className: "tw-mb-8" }, "Respectfully Yours,"),
            React.createElement("div", { className: "tw-flex tw-flex-col tw-max-w-[300px] tw-text-center tw-mb-4" },
                React.createElement("div", { className: "tw-border-b tw-border-black tw-uppercase" },
                    guidanceData?.first_name,
                    " ",
                    guidanceData?.middle_initial ? guidanceData?.middle_initial + ". " : "",
                    guidanceData?.last_name),
                React.createElement("div", { className: "tw-text-sm tw-italic" }, "Guidance In-charge/Counselor")))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(AssessmentMakeCalledSlip));
