// @ts-ignore
import { React, ReactDOM, ReactDOMServer, Swal, clsx, pathname, usePageData, } 
// @ts-ignore
from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType } from "./table.mjs";
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
function displayDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
function displayNominal(num) {
    return num.toString().endsWith("1")
        ? num + "st"
        : num.toString().endsWith("2")
            ? num + "nd"
            : num.toString().endsWith("3")
                ? num + "rd"
                : num + "th";
}
var Education;
(function (Education) {
    Education["Basic"] = "basic";
    Education["College"] = "college";
    Education["None"] = "";
})(Education || (Education = {}));
function SelectedCheckbox({ checked, title, id, }) {
    return (React.createElement("div", { className: "tw-flex tw-items-center" },
        React.createElement("input", { type: "checkbox", id: id + "__checkbox", className: "tw-peer tw-hidden disabled:tw-cursor-default", checked: checked, title: title, disabled: true }),
        React.createElement("label", { htmlFor: id + "__checkbox", className: "tw-flex tw-items-center", title: title },
            React.createElement("span", { className: "tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-lg" },
                checked && React.createElement("i", { className: "bx bxs-check-square" }),
                !checked && React.createElement("i", { className: "bx bx-checkbox" })))));
}
function ViewAssessmentComponent({ assessmentForms, assessmentResponses, assessmentScore, student, }) {
    const getAssessmentResponseCheck = React.useCallback((item) => assessmentResponses.reduce((init, val) => !!init ||
        !!val.assessment_response.reduce((res, ar) => res || (item.id.toString() === ar.id.toString() && !!ar.response), false), false), []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "tw-flex tw-gap-x-4" },
            React.createElement("div", null,
                "Name: ",
                student.name),
            React.createElement("div", null, student.education === Education.Basic
                ? "Grade Level: " + student.level
                : "Year Level: " + student.level),
            React.createElement("div", null, student.education === Education.College
                ? "Course: " + student.course
                : "")),
        React.createElement("h3", { className: clsx(assessmentScore > 75
                ? "tw-text-red-600"
                : assessmentScore > 50
                    ? "tw-text-orange-600"
                    : assessmentScore > 25
                        ? "tw-text-yellow-600"
                        : "tw-text-green-600") },
            "Assessment Result:",
            " ",
            assessmentScore < 25
                ? "Strongly Positive"
                : assessmentScore < 50
                    ? "Somewhat Neutral"
                    : assessmentScore < 75
                        ? "Strongly Negative"
                        : "Urgent Attention Needed"),
        React.createElement("div", { className: "tw-flex tw-gap-3 tw-items-start tw-flex-wrap tw-justify-center" }, assessmentForms?.map((forms) => (React.createElement("div", { className: "tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600 tw-items-start" },
            React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200" },
                React.createElement("div", { className: "tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase" }, forms?.category_name)),
            React.createElement("div", { className: "tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right" }, forms?.items?.map((item) => (React.createElement("div", { className: clsx("tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm", !!item.alarming ? "tw-text-red-600" : "tw-text-gray-600") },
                React.createElement("div", { className: "tw-flex tw-flex-shrink tw-items-center tw-text-right tw-text-[40pt]" },
                    React.createElement(SelectedCheckbox, { checked: getAssessmentResponseCheck(item), id: item.id, title: item.item })),
                React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-start" },
                    React.createElement("div", { className: "tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px] tw-text-left" }, item.item)))))))))),
        React.createElement("div", { className: "tw-flex tw-justify-between tw-items-start" },
            React.createElement("button", { type: "button", className: "btn btn-primary", onClick: () => window.open(new URL(pathname(`/assessment/make/calledslip?id=${student.id}&educ=${student.education}`), window.location.origin)) },
                React.createElement("i", { className: "bx bxs-phone-call" }),
                " Make a Called-In Slip for the student"),
            React.createElement("button", { type: "button", className: "btn btn-primary", onClick: () => window.open(new URL(pathname(`/print?form=student_assessment&id=${student.student_id}&assessments=${assessmentForms
                    .map((v) => v.id)
                    .join("-")}`), window.location.origin)) },
                React.createElement("i", { className: "bx bxs-printer" }),
                " Print"))));
}
function sendReminderNotification(sy, syid, student_id, onSuccess, onError) {
    try {
        const broadcastUrl = new URL(pathname("/api/post/send/notification"), window.location.origin);
        const homepage = new URL(pathname("/"), window.location.origin).toString();
        const bodyHTMLString = ReactDOMServer.renderToString(React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontFamily: "Arial, sans-serif", margin: 0, padding: 0 } },
                React.createElement("table", { style: { width: "100%", border: 0, borderCollapse: "collapse" } },
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: "20px" }, align: "center" },
                            React.createElement("table", { style: { width: "600px", border: "1px solid #cccccc" } },
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            backgroundColor: "#4CAF50",
                                            padding: "20px",
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: "24px",
                                        } }, "Guidance Office (SMCC)")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            padding: "20px",
                                            textAlign: "left",
                                            fontSize: "16px",
                                            lineHeight: "1.6",
                                        } },
                                        React.createElement("p", null,
                                            "We would like to remind you to submit your",
                                            " ",
                                            React.createElement("a", { href: homepage + "assess" }, "Student Self-Assessment Form"),
                                            " ",
                                            "for S.Y. ",
                                            sy,
                                            " on Guidance Counseling Management System (SMCC).",
                                            React.createElement("br", null),
                                            "Thank you."))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            backgroundColor: "#f1f1f1",
                                            padding: "10px",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            color: "#555555",
                                        } },
                                        React.createElement("a", { href: "https://www.smccnasipit.edu.ph", style: { color: "#555555" } }, "Saint Michael College of Caraga"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            backgroundColor: "#f1f1f1",
                                            padding: "10px",
                                            textAlign: "center",
                                            fontSize: "12px",
                                            color: "#555555",
                                        } },
                                        React.createElement("a", { href: homepage, style: { color: "#555555" } }, "Guidance Office (SMCC)"))))))))));
        const postData = {
            syid,
            student_id,
            subject: `Reminder on Student Self-Assessment Form | Guidance Office (SMCC)`,
            body: bodyHTMLString.replaceAll("\n", "").trim(),
            title: "Reminder on Student Self-Assessment Form Submission",
            message: `Reminding you to submit your <a href="${homepage + "assess"}">Student Self-Assessment Form</a> for S.Y. ${sy}. Thank you.`,
            href: "/assess",
        };
        // Broadcast notification to all users
        $.post(broadcastUrl.toString(), postData)
            .done(function ({ success, error }) {
            console.log(success, error);
            if (success) {
                onSuccess && onSuccess(success);
            }
            else if (error) {
                onError && onError(error);
            }
        })
            .fail(function (_, statusText) {
            console.log("Something went wrong", statusText);
            onError && onError(statusText);
        });
    }
    catch (error) {
        console.error("Error broadcasting notification:", error);
        onError && onError(error);
    }
}
function ProfilesSubmitted() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { school_years, all_profiles, gradeyear } = usePageData(setIsLoading);
    const [selectedSchoolYear, setSelectedSchoolYear] = React.useState((new Date()).getFullYear().toString());
    const [selectedDepartment, setSelectedDepartment] = React.useState("");
    const [selectedProgramSection, setSelectedProgramSection] = React.useState("");
    const [selectedAssessScore, setSelectedAssessScore] = React.useState("");
    const { profiles, sy, syid, assessment_open } = React.useMemo(() => {
        const selSy = Array.isArray(school_years) ? school_years.find((yr) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
        let profiles = Array.isArray(all_profiles) ? all_profiles.find((prof) => prof.sy.toString() === selSy?.year?.toString()) : undefined;
        profiles = !!profiles?.profiles ? [...(profiles.profiles)] : [];
        return {
            profiles,
            sy: selSy?.year,
            syid: selSy?.id,
            assessment_open: selSy?.editable !== undefined && !selSy.editable ? true : false,
        };
    }, [school_years, all_profiles, selectedSchoolYear]);
    const data = React.useMemo(() => profiles, [profiles]);
    const education = React.useMemo(() => gradeyear > 0 && gradeyear < 5
        ? Education.College
        : gradeyear > 6 && gradeyear < 13
            ? Education.Basic
            : Education.None, [gradeyear]);
    const departmentOptions = React.useMemo(() => {
        const result = [];
        if (education) {
            const departments = data.map((d) => d.student_info?.profile?.department);
            departments.forEach((department) => {
                if (!!department) {
                    if (!result.some(d => d.label === department)) {
                        result.push({ label: department, value: department });
                    }
                }
            });
        }
        return result;
    }, [education, data]);
    const assessmentScoreOptions = React.useMemo(() => {
        const result = [];
        [null, 75, 50, 25, 0].forEach(d => result.push({
            label: d === null ? 'No Assessment'
                : d === 75 ? 'Urgent assessment (Red)'
                    : d === 50 ? 'Strongly Negative (Orange)'
                        : d === 25 ? 'Somewhat Neutral (Yellow)'
                            : 'Strongly Positive (Green)',
            value: d?.toString() || '-1',
        }));
        return result;
    }, []);
    const programSectionOptions = React.useMemo(() => {
        const result = [];
        if (education === "basic") {
            const sections = data.map((d) => d.student_info?.profile?.section);
            sections.forEach((section) => {
                if (!!section) {
                    if (!result.some(d => d.label === section)) {
                        result.push({ label: section, value: section });
                    }
                }
            });
        }
        else if (education === "college") {
            if (!selectedDepartment) {
                const courses = data.map((d) => d.student_info?.profile?.course);
                courses.forEach((course) => {
                    if (!!course) {
                        if (!result.some(d => d.label === course)) {
                            result.push({ label: course, value: course });
                        }
                    }
                });
            }
            else {
                const courses = data.filter((d) => d.student_info?.profile?.department?.toString() === selectedDepartment).map((d) => d.student_info?.profile?.course);
                courses.forEach((course) => {
                    if (!!course) {
                        if (!result.some(d => d.label === course)) {
                            result.push({ label: course, value: course });
                        }
                    }
                });
            }
        }
        return result;
    }, [selectedDepartment, education, data]);
    const columns = React.useMemo(() => education === Education.College
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
        ], [education]);
    const onViewAssessment = React.useCallback((item) => {
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
                title: "Do you want to remind student to submit their assessment form?",
                text: "Assessment Not Submitted Yet",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    sendReminderNotification(sy, syid, item.student_info?.user?.id, (success) => {
                        Swal.fire({
                            icon: "success",
                            title: "Reminder Sent",
                            text: success,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }, (error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    });
                }
            });
        }
        else {
            const assessmentForms = item.assessment.assessment_forms.map((v) => ({
                ...v,
                items: JSON.parse(v.items),
            }));
            const assessmentResponses = item.assessment.assessment_responses.map((v) => ({
                ...v,
                assessment_response: JSON.parse(v.assessment_response),
            }));
            const assessmentScore = item.assessment.assessment_score;
            const $vmodal = $("#view-assessment-submission");
            const $submissionRoot = $vmodal.find("#assessment-submission-root");
            const afroot = ReactDOM.createRoot($submissionRoot.get(0));
            // @ts-ignore
            $vmodal.modal("show");
            $vmodal.on("hidden.bs.modal", function () {
                $submissionRoot.empty();
            });
            afroot.render(React.createElement(ViewAssessmentComponent, { student: {
                    id: item.profile_status.id,
                    student_id: item.student_info.user.id,
                    name: `${item.student_info.user.first_name} ${item.student_info.user.middle_initial
                        ? item.student_info.user.middle_initial + ". "
                        : ""}${item.student_info.user.last_name}`,
                    level: education === Education.Basic
                        ? item.student_info.profile.gradelevel
                        : item.student_info.profile.yearlevel,
                    course: item.student_info.profile.course,
                    education,
                }, assessmentForms: assessmentForms, assessmentResponses: assessmentResponses, assessmentScore: assessmentScore }));
        }
    }, [education, syid, assessment_open]);
    const onViewProfile = React.useCallback((item) => {
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
                }).then(({ isConfirmed }) => {
                    if (isConfirmed) {
                        const url = new URL(pathname("/api/post/profile/approve"), window.location.origin);
                        $.post(url.toString(), { id: item.profile_status?.id, education })
                            .done(function ({ success, error }) {
                            if (error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: error,
                                });
                            }
                            else {
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
                            .fail(function (_, textStatus) {
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
                    preConfirm: async (reason) => {
                        return new Promise((res, rej) => {
                            const url = new URL(pathname("/api/post/profile/reject"), window.location.origin);
                            $.post(url.toString(), {
                                id: item.profile_status?.id,
                                reason,
                                education,
                            })
                                .done(function ({ success, error }) {
                                if (error) {
                                    rej(error);
                                }
                                else {
                                    res(success);
                                }
                            })
                                .fail((_, textStatus) => rej(textStatus));
                        })
                            .then((response) => response)
                            .catch((error) => {
                            Swal.showValidationMessage(`
                  Failed: ${error}
                `);
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                }).then(({ isConfirmed, value }) => {
                    if (isConfirmed) {
                        Swal.fire({
                            icon: "success",
                            title: value,
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
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
        }
        else if (item.profile_status?.status === "rejected") {
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
        }
        else if (item.profile_status?.status === "completed") {
            $("#view-profile-button-container")
                .empty()
                .text("Completed: " +
                new Date(item.profile_status.updated_at).toLocaleDateString());
            $("#view-profile-status")
                .removeClass("tw-text-red-500")
                .removeClass("tw-text-gray-500")
                .addClass("tw-text-green-500")
                .text("Status: Completed");
        }
        const $iframe = $("<iframe>");
        $iframe.attr("width", "100%");
        $iframe.attr("height", "500");
        $iframe.attr("src", pathname(`/print?form=student_profile&id=${item.profile_status?.id || ""}&education=${education}`));
        $("#iframe-container").empty().append($iframe);
    }, [education]);
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
    const onViewSummary = React.useCallback((item) => {
        const $summaryModal = $("#view-student-summary-modal");
        $summaryModal
            .find("#view-records")
            .on("click", function () {
            const url = new URL(pathname('/print'), window.location.origin);
            url.searchParams.append('form', "summary_records");
            url.searchParams.append('sy', syid);
            url.searchParams.append('year', sy);
            url.searchParams.append('uid', item?.student_info?.user?.id?.toString() || "");
            window.open(url.toString(), "_blank");
        });
        $summaryModal
            .find("#view-photo")
            .attr("src", pathname(item.student_profile.profile_pic || "/images/default-user.png"));
        $summaryModal
            .find("#view-full-name")
            .text(`${item.student_info.user.last_name}, ${item.student_info.user.first_name} ${item.student_info.user.middle_initial
            ? item.student_info.user.middle_initial + "."
            : ""}`);
        $summaryModal
            .find("#view-department-gradelevel")
            .text(item.student_info.profile?.department ||
            (!!item.student_info.profile?.gradelevel
                ? `Grade ${item.student_info.profile?.gradelevel}`
                : ""));
        $summaryModal
            .find("#view-year-course")
            .text(!!item.student_info.profile.yearlevel
            ? displayNominal(item.student_info.profile.yearlevel) +
                " " +
                item.student_info.profile.course
            : "");
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
            .text(item.assessment.assessment_score === false ? "Pending" : "Completed");
        // $summaryModal
        //   .find("#view-referral-forms")
        //   .text(item.referral_forms?.toString() || "0");
        $summaryModal
            .find("#view-agreement-forms")
            .text(item.agreement_forms?.toString() || "0");
    }, [syid, sy]);
    const items = React.useMemo(() => {
        let d = !data ? [] : [...data];
        if (!!selectedDepartment && education === "college") {
            d = d.filter((item) => item.student_info.profile?.department?.toString() === selectedDepartment.toString());
        }
        if (!!selectedAssessScore) {
            console.log(selectedAssessScore, d);
            d = d.filter((item) => (selectedAssessScore === "-1" && item.assessment.assessment_score === false) || (selectedAssessScore === "75" && item.assessment.assessment_score >= 75) || (selectedAssessScore === "50" && item.assessment.assessment_score >= 50 && item.assessment.assessment_score < 75) || (selectedAssessScore === "25" && item.assessment.assessment_score >= 25 && item.assessment.assessment_score < 50) || (selectedAssessScore === "0" && item.assessment.assessment_score !== false && item.assessment.assessment_score >= 0 && item.assessment.assessment_score < 25));
        }
        if (!!selectedProgramSection) {
            d = d.filter((item) => education === "basic"
                ? item.student_info.profile?.section === selectedProgramSection
                : item.student_info.profile?.course === selectedProgramSection);
        }
        console.log('score:', d);
        return d?.map((item) => ({
            id: item.profile_status?.id,
            profile_pic: {
                value: item.student_info.user.profile_pic || "none",
                content: (React.createElement("img", { src: new URL(pathname(item.student_profile.profile_pic || "/images/default-user.png")).toString(), alt: "Profile Pic", width: "30", height: "30", className: "tw-mx-auto tw-w-[30px] tw-h-[30px]" })),
            },
            username: item.student_info.user.username,
            name: `${item.student_info.user.first_name} ${item.student_info.user.middle_initial
                ? item.student_info.user.middle_initial + ". "
                : ""}${item.student_info.user.last_name}`,
            gender: item.student_info.user.gender,
            yearlevel: item.student_info.profile.yearlevel,
            course: item.student_info.profile.course,
            department: item.student_info.profile
                .department,
            dean: item.student_info.profile.dean,
            gradelevel: item.student_info.profile.gradelevel,
            adviser: item.student_info.profile.adviser,
            assessment: {
                value: item.assessment.assessment_score == false
                    ? "0"
                    : item.assessment.assessment_score.toString(),
                content: (React.createElement("div", null,
                    React.createElement("button", { type: "button", onClick: () => onViewAssessment(item), className: clsx("tw-border-2 tw-rounded-full tw-w-[25px] tw-h-[25px]", item.assessment.assessment_score === false
                            ? "tw-bg-gray-500"
                            : item.assessment.assessment_score > 75
                                ? "tw-bg-red-500"
                                : item.assessment.assessment_score > 50
                                    ? "tw-bg-orange-500"
                                    : item.assessment.assessment_score > 25
                                        ? "tw-bg-yellow-500"
                                        : "tw-bg-green-500") }, "\u00A0"))),
            },
            profile: {
                value: item.profile_status?.status,
                content: (React.createElement("button", { type: "button", "data-bs-toggle": "modal", "data-bs-target": "#view-student-profile-submission", onClick: () => onViewProfile(item), className: clsx("tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-text-nowrap", item.profile_status?.status === "pending"
                        ? "tw-bg-yellow-300 hover:tw-bg-yellow-200"
                        : item.profile_status?.status === "rejected"
                            ? "tw-bg-red-300 hover:tw-bg-red-200"
                            : item.profile_status?.status === "completed"
                                ? "tw-bg-green-400 hover:tw-bg-green-200"
                                : "tw-bg-gray-300 hover:tw-bg-gray-200") },
                    React.createElement("i", { className: clsx("bx", item.profile_status?.status === "pending"
                            ? "bx-time-five"
                            : item.profile_status?.status === "rejected"
                                ? "bx-x"
                                : item.profile_status?.status === "completed"
                                    ? "bx-check"
                                    : "bx-question-mark") }),
                    "\u00A0",
                    React.createElement("span", null, "View Submitted"))),
            },
            summary: (React.createElement("button", { type: "button", onClick: () => onViewSummary(item), className: "tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-blue-400 hover:tw-bg-blue-200", "data-bs-toggle": "modal", "data-bs-target": "#view-student-summary-modal" }, "View Summary")),
            created_at: item.profile_status?.created_at
                ? displayDate(item.profile_status.created_at)
                : displayDate(item.student_info.profile.created_at),
        })) || [];
    }, [data, selectedDepartment, selectedProgramSection, selectedAssessScore]);
    const displayTitle = React.useCallback(() => education === Education.College
        ? gradeyear == 1
            ? "1st Year Student Profiles"
            : gradeyear == 2
                ? "2nd Year Student Profiles"
                : gradeyear == 3
                    ? "3rd Year Student Profiles"
                    : "4th Year Student Profiles"
        : "Grade " + gradeyear + " Student Profiles", [gradeyear, education]);
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
        return (React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading..."));
    }
    return (React.createElement("div", { className: "tw-container tw-mt-4" },
        React.createElement("h2", null, displayTitle()),
        React.createElement("div", null,
            React.createElement("label", null, "School Year: "),
            React.createElement("div", { className: "tw-max-w-[300px]" },
                React.createElement("div", { className: "select-wrapper" },
                    React.createElement("select", { className: "form-select", value: selectedSchoolYear, onChange: (e) => setSelectedSchoolYear(e.target.value) },
                        React.createElement("option", { value: "", disabled: true }, "School Year"),
                        school_years?.map((yr) => (React.createElement("option", { key: "year_" + yr.id, value: yr.year },
                            "S.Y ",
                            yr.year,
                            " - ",
                            Number.parseInt(yr.year) + 1))))))),
        React.createElement("br", null),
        React.createElement(Table, { columns: columns, items: items },
            education === "college" && (React.createElement("div", { className: "select-wrapper" },
                React.createElement("select", { className: "form-select", value: selectedDepartment, onChange: (e) => setSelectedDepartment(e.target.value) },
                    React.createElement("option", { value: "" }, "Department"),
                    departmentOptions.map((opt) => (React.createElement("option", { key: opt.value, value: opt.value }, opt.label)))))),
            (React.createElement("div", { className: "select-wrapper" },
                React.createElement("select", { className: "form-select", value: selectedProgramSection, onChange: (e) => setSelectedProgramSection(e.target.value) },
                    React.createElement("option", { value: "" }, education === "college" ? "Program/Course" : "Section"),
                    programSectionOptions.map((opt) => (React.createElement("option", { key: opt.value, value: opt.value }, opt.label)))))),
            (React.createElement("div", { className: "select-wrapper" },
                React.createElement("select", { className: "form-select", value: selectedAssessScore, onChange: (e) => setSelectedAssessScore(e.target.value) },
                    React.createElement("option", { value: "" }, "Assessment Score"),
                    assessmentScoreOptions.map((opt) => (React.createElement("option", { key: opt.value, value: opt.value }, opt.label)))))))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(ProfilesSubmitted));
