// @ts-ignore
import { clsx, pathname, React, ReactDOM, ReactDOMServer, Swal, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType, SortOrder } from "./table.mjs";
const $pageRoot = $("#page-root");
const abb = {
    'College of Arts and Sciences': 'CAS',
    'College of Business Management and Accountancy': 'CBMA',
    'College of Computing and Information Sciences': 'CCIS',
    'College of Criminal Justice Education': 'CCJE',
    'College of Teacher Education': 'CTE',
    'College of Tourism and Hospitality Management': 'CTHM',
    'Basic Education': 'BasicEd',
};
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
var InteractionType;
(function (InteractionType) {
    InteractionType["Individual"] = "Individual";
    InteractionType["Group"] = "Group";
    InteractionType["CalledIn"] = "Called-in";
    InteractionType["WalkedIn"] = "Walked-in";
    InteractionType["Referred"] = "Referred";
    InteractionType["FollowUp"] = "Follow-up";
})(InteractionType || (InteractionType = {}));
const columns = [
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
];
function getNominal(n) {
    return n.toString().endsWith("1")
        ? n + 'st'
        : n.toString().endsWith("2")
            ? n + 'nd'
            : n.toString().endsWith("3")
                ? n + 'rd'
                : n + 'th';
}
function displayLevel(level) {
    if (!level)
        return "";
    return level < 5 ? getNominal(level) + " Year" : "Grade " + (level?.toString() || "");
}
function displayDateTime(dateTime, defaultString) {
    if (!dateTime)
        return defaultString;
    const scheduleDate = new Date(dateTime);
    return scheduleDate.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" }) + ' @ ' + scheduleDate.toLocaleTimeString('en-PH', { hour12: true });
}
function dateIsBeforeNow(dateTime) {
    if (!dateTime)
        return true;
    const scheduleDate = new Date(dateTime);
    return Date.now() > scheduleDate.getTime();
}
function displayDate(date, defaultString = "") {
    if (!date)
        return defaultString;
    const dateObj = new Date(date);
    // format date in MMMM d, YYYY
    return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}
function UploadDragAndDropImage({ onSelectedFile, filesToUpload = 1, }) {
    const [file, setFile] = React.useState([]);
    const [dragging, setDragging] = React.useState(false);
    const dropzoneRef = React.useRef(null);
    // Handle file drop event
    const handleDrop = React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const selectedFile = [...droppedFiles];
            let count = file.length;
            if (file.length === filesToUpload)
                return;
            const filed = [...file];
            for (let i = 0; i < Math.min(selectedFile.length, filesToUpload); i++) {
                if (count > filesToUpload)
                    break;
                filed.push(selectedFile[i]);
                count++;
            }
            setFile(filed);
        }
        setDragging(false); // Reset dragging state
    }, [filesToUpload]);
    // Handle file drag over event
    const handleDragOver = React.useCallback((e) => {
        e.preventDefault();
        setDragging(true);
    }, []);
    // Handle drag leave event
    const handleDragLeave = React.useCallback(() => {
        setDragging(false);
    }, []);
    // Handle file input change
    const handleFileInputChange = React.useCallback((e) => {
        const selectedFile = [...e.target.files];
        let count = file.length;
        if (file.length === filesToUpload)
            return;
        const filed = [...file];
        for (let i = 0; i < Math.min(selectedFile.length, filesToUpload); i++) {
            if (count > filesToUpload)
                break;
            filed.push(selectedFile[i]);
            count++;
        }
        setFile(filed);
    }, [file]);
    const handleRemoveFile = (index) => {
        const filed = [...file];
        filed.splice(index, 1);
        setFile(filed);
    };
    const [fileUrls, setFileUrls] = React.useState([]);
    React.useEffect(() => {
        onSelectedFile(file);
        const furls = file.map((fl) => URL.createObjectURL(fl));
        setFileUrls(furls);
        return () => {
            furls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [file]);
    return (React.createElement("div", { className: "tw-block" },
        React.createElement("div", { className: "tw-flex items-center tw-justify-center tw-w-full" }, file.length < filesToUpload && (React.createElement("label", { ref: dropzoneRef, onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, htmlFor: "form-dropzone-file", className: `tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-64 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 ${dragging ? 'tw-bg-gray-100' : 'hover:tw-bg-gray-100'}` },
            React.createElement("div", { className: "tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6" },
                React.createElement("svg", { className: "tw-w-8 tw-h-8 tw-mb-4 tw-text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 16" },
                    React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" })),
                React.createElement("p", { className: "tw-mb-2 tw-text-sm tw-text-gray-500" },
                    React.createElement("span", { className: "tw-font-semibold" }, "Click to upload"),
                    " or drag and drop"),
                React.createElement("p", { className: "tw-text-xs tw-text-gray-500" }, "PNG or JPG: MAX 5MB")),
            React.createElement("input", { id: "form-dropzone-file", type: "file", className: "tw-hidden", accept: ".png,.jpg,.jpeg", "aria-describedby": "file-help", multiple: filesToUpload > 1, onChange: handleFileInputChange })))),
        file.length > 0 && (React.createElement("div", { className: "tw-mt-4 tw-flex tw-gap-4 tw-flex-wrap" }, file.map((fl, index) => (React.createElement("div", { key: "files-" + index, className: "tw-flex tw-flex-col tw-items-center tw-relative" },
            React.createElement("button", { type: "button", onClick: () => handleRemoveFile(index), className: "tw-absolute tw-right-1 tw-top-1 tw-text-red-500 tw-w-[30px] tw-h-[30px]" },
                React.createElement("i", { className: "bx bxs-trash-alt tw-text-[30px]" })),
            React.createElement("p", { className: "tw-text-sm tw-text-gray-700" },
                "Selected file (",
                index + 1,
                "):"),
            React.createElement("img", { src: fileUrls?.[index] || "", alt: "Preview", className: "tw-h-32 tw-w-auto tw-rounded-md" }),
            React.createElement("p", { className: "tw-text-xs tw-text-gray-500" }, fl.name))))))));
}
function sendReminderNotification(syid, student_id, schedule, onSuccess, onError) {
    try {
        const broadcastUrl = new URL(pathname("/api/post/send/notification"), window.location.origin);
        const homepage = (new URL(pathname('/'), window.location.origin)).toString();
        const bodyHTMLString = ReactDOMServer.renderToString(React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 } },
                React.createElement("table", { style: { width: '100%', border: 0, borderCollapse: "collapse" } },
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '20px' }, align: "center" },
                            React.createElement("table", { style: { width: '600px', border: '1px solid #cccccc' } },
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            backgroundColor: '#4CAF50',
                                            padding: '20px',
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: '24px',
                                        } }, "Guidance Office (SMCC)")),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            padding: '20px',
                                            textAlign: 'left',
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                        } },
                                        React.createElement("p", null,
                                            "We would like to remind you of your counseling appointment on ",
                                            schedule,
                                            ". Please be there at the scheduled time. Thank you."))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            backgroundColor: '#f1f1f1',
                                            padding: '10px',
                                            textAlign: 'center',
                                            fontSize: '12px',
                                            color: '#555555',
                                        } },
                                        React.createElement("a", { href: "https://www.smccnasipit.edu.ph", style: { color: '#555555' } }, "Saint Michael College of Caraga"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: {
                                            backgroundColor: '#f1f1f1',
                                            padding: '10px',
                                            textAlign: 'center',
                                            fontSize: '12px',
                                            color: '#555555',
                                        } },
                                        React.createElement("a", { href: homepage, style: { color: '#555555' } }, "Guidance Office (SMCC)"))))))))));
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
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // This makes it display am/pm
    };
    return date.toLocaleString('en-US', options).replace(",", " @");
}
;
function SelectedCheckbox({ checked, title, id }) {
    return (React.createElement("div", { className: "tw-flex tw-items-center" },
        React.createElement("input", { type: "checkbox", id: id + "__checkbox", className: "tw-peer tw-hidden disabled:tw-cursor-default", checked: checked, title: title, disabled: true }),
        React.createElement("label", { htmlFor: id + "__checkbox", className: "tw-flex tw-items-center", title: title },
            React.createElement("span", { className: 'tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-lg' },
                checked && React.createElement("i", { className: "bx bxs-check-square" }),
                !checked && React.createElement("i", { className: "bx bx-checkbox" })))));
}
;
function ViewAssessmentComponent({ assessmentForms, assessmentResponses, assessmentScore, student }) {
    const getAssessmentResponseCheck = React.useCallback((item) => assessmentResponses.reduce((init, val) => !!init || !!val.assessment_response.reduce((res, ar) => res || (item.id.toString() === ar.id.toString() && !!ar.response), false), false), []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "tw-flex tw-gap-x-4" },
            React.createElement("div", null,
                "Name: ",
                student.name),
            React.createElement("div", null, student.education === Education.Basic ? "Grade Level: " + student.level : "Year Level: " + student.level),
            React.createElement("div", null, student.education === Education.College ? "Course: " + student.course : "")),
        React.createElement("h3", { className: clsx(assessmentScore < 25 ? "tw-text-green-600" : (assessmentScore < 50 ? "tw-text-yellow-600" : (assessmentScore < 75 ? "tw-text-orange-600" : "tw-text-red-600"))) },
            "Assessment Result: ",
            assessmentScore < 25 ? "Strongly Positive" : (assessmentScore < 50 ? "Somewhat Negative" : (assessmentScore < 75 ? "Strongly Negative" : "Urgent Attention Needed"))),
        React.createElement("div", { className: "tw-flex tw-gap-3 tw-items-start tw-flex-wrap tw-justify-center" }, assessmentForms?.map((forms) => (React.createElement("div", { className: "tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600 tw-items-start" },
            React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200" },
                React.createElement("div", { className: "tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase" }, forms?.category_name)),
            React.createElement("div", { className: "tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right" }, forms?.items?.map((item) => (React.createElement("div", { className: clsx("tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm", !!item.alarming ? "tw-text-red-600" : "tw-text-gray-600") },
                React.createElement("div", { className: "tw-flex tw-flex-shrink tw-items-center tw-text-right tw-text-[40pt]" },
                    React.createElement(SelectedCheckbox, { checked: getAssessmentResponseCheck(item), id: item.id, title: item.item })),
                React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-start" },
                    React.createElement("div", { className: "tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px] tw-text-left" }, item.item)))))))))),
        React.createElement("div", { className: "tw-flex tw-justify-between tw-items-start" },
            React.createElement("button", { type: "button", className: "btn btn-primary", onClick: () => window.open((new URL(pathname(`/print?form=student_assessment&id=${student.student_id}&assessments=${assessmentForms.map((v) => v.id).join("-")}`), window.location.origin))) },
                React.createElement("i", { className: "bx bxs-printer" }),
                " Print"))));
}
function CounselingRecords() {
    const [isLoading, setIsLoading] = React.useState(false);
    // const { called_in, walked_in, sy, syid, students, guidance } = usePageData(setIsLoading);
    const [itemSchedule, setItemSchedule] = React.useState(null);
    const { school_years, all_data, guidance } = usePageData(setIsLoading);
    const [selectedSchoolYear, setSelectedSchoolYear] = React.useState((new Date()).getFullYear());
    const [selectedDepartment, setSelectedDepartment] = React.useState("");
    const [selectedProgramSection, setSelectedProgramSection] = React.useState("");
    const { called_in, walked_in, sy, syid, students } = React.useMemo(() => {
        const selSy = Array.isArray(school_years) ? school_years.find((yr) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
        let alldata = Array.isArray(all_data) ? all_data.find((c) => c.sy.toString() === selSy?.year?.toString()) : undefined;
        let called = !!alldata?.called_in ? [...(alldata.called_in)] : [];
        let walked = !!alldata?.walked_in ? [...(alldata.walked_in)] : [];
        let studs = !!alldata?.students ? [...(alldata.students)] : [];
        return {
            called_in: called,
            walked_in: walked,
            students: studs,
            sy: selSy?.year,
            syid: selSy?.id
        };
    }, [school_years, all_data, selectedSchoolYear]);
    const education = React.useMemo(() => !!selectedDepartment ? Education.College : (!!selectedProgramSection ? Education.Basic : Education.None), [selectedDepartment, selectedProgramSection]);
    const departmentOptions = React.useMemo(() => {
        const result = [];
        const currentData = all_data?.find((d) => d.sy.toString() === selectedSchoolYear.toString());
        const departments = currentData?.students?.map((st) => st.education === Education.College ? st.student?.department : null)?.filter((v) => !!v) || [];
        departments.forEach((department) => {
            if (!!department) {
                if (!result.some(d => d.label === department)) {
                    result.push({ label: department, value: department });
                }
            }
        });
        return result;
    }, [all_data, selectedSchoolYear]);
    const programSectionOptions = React.useMemo(() => {
        const result = [];
        if (education === "basic") {
            const currentData = all_data?.find((d) => d.sy.toString() === selectedSchoolYear.toString());
            const sections = currentData?.students?.map((st) => st.education === Education.Basic ? st.student?.section : null)?.filter((v) => !!v) || [];
            sections.forEach((section) => {
                if (!!section) {
                    if (!result.some(d => d.label === section)) {
                        result.push({ label: section, value: section });
                    }
                }
            });
        }
        else if (education === "college") {
            const currentData = all_data?.find((d) => d.sy.toString() === selectedSchoolYear.toString());
            const courses = currentData?.students
                ?.filter((st) => st?.student?.department?.toString() === selectedDepartment)
                ?.map((st) => st.education === Education.College ? st?.student?.course : null)
                ?.filter((v) => !!v) || [];
            courses.forEach((course) => {
                if (!!course) {
                    if (!result.some(d => d.label === course)) {
                        result.push({ label: course, value: course });
                    }
                }
            });
        }
        return result;
    }, [selectedDepartment, education, all_data, selectedSchoolYear]);
    const data = React.useMemo(() => [...(called_in || []), ...(walked_in || [])], [called_in, walked_in]);
    const [filterByMonth, setFilterByMonth] = React.useState("");
    const [filterByInteractionType, setFilterByInteractionType] = React.useState("");
    const onPrintCalledSlip = (item) => {
        const printUrl = new URL(pathname("/print"), window.location.origin);
        printUrl.searchParams.append('form', 'called_slip');
        printUrl.searchParams.append('id', item?.id || "");
        const win = window.open(printUrl.toString(), '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=800,height=600');
        if (win) {
            win.onafterprint = () => {
                win.close();
            };
            win.print();
        }
        else {
            console.error('Failed to open print window');
        }
    };
    const onReScheduleOrPrint = React.useCallback((item) => {
        Swal.fire({
            title: "Counseling Appointment on " + displayDateTime(item.schedule),
            html: ReactDOMServer.renderToString(React.createElement(React.Fragment, null,
                React.createElement("div", { className: "tw-flex tw-flex-nowrap tw-justify-evenly tw-items-center tw-gap-4" },
                    React.createElement("button", { type: "button", id: "print-appointment", className: "btn btn-primary tw-text-nowrap tw-relative hover:after:tw-content-['Print'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0", title: "Print" },
                        React.createElement("i", { className: "bx bxs-printer" })),
                    React.createElement("button", { type: "button", id: "re-schedule-appointment", className: "btn btn-warning tw-text-nowrap tw-relative hover:after:tw-content-['Re-schedule'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0", title: "Re-schedule Appointment" },
                        React.createElement("i", { className: "bx bx-time-five" }))))),
            showConfirmButton: false,
        }).then(() => {
            $("button#re-print-appointment").off("click");
            $("button#re-schedule-appointment").off("click");
        });
        setItemSchedule(item);
    }, []);
    const onSendReminder = React.useCallback((item) => {
        Swal.fire({
            title: "Counseling Appointment on " + displayDateTime(item.schedule),
            html: ReactDOMServer.renderToString(React.createElement(React.Fragment, null,
                React.createElement("div", { className: "tw-flex tw-flex-nowrap tw-justify-evenly tw-items-center tw-gap-4" },
                    React.createElement("button", { type: "button", id: "print-appointment", className: "btn btn-primary tw-text-nowrap tw-relative hover:after:tw-content-['Print'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0", title: "Print" },
                        React.createElement("i", { className: "bx bxs-printer" })),
                    React.createElement("button", { type: "button", id: "remind-schedule-appointment", className: "btn btn-warning tw-text-nowrap tw-relative hover:after:tw-content-['Remind'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0", title: "Re-schedule Appointment" },
                        React.createElement("i", { className: "bx bxs-bell-ring" })),
                    React.createElement("button", { type: "button", id: "re-schedule-appointment", className: "btn btn-danger tw-text-nowrap tw-relative hover:after:tw-content-['Re-schedule'] after:tw-contents after:tw-w-full after:tw-h-full after:tw-absolute after:-tw-top-0 after:tw-left-0", title: "Re-schedule Appointment" },
                        React.createElement("i", { className: "bx bx-time-five" }))))),
            showConfirmButton: false,
        }).then(() => {
            $("button#re-print-appointment").off("click");
            $("button#remind-schedule-appointment").off("click");
            $("button#re-schedule-appointment").off("click");
        });
        setItemSchedule(item);
    }, [syid]);
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
                }).then(({ isConfirmed }) => {
                    if (isConfirmed) {
                        const url = new URL(pathname(`/assessment/make/calledslip?id=${item.id}&educ=${item.education}`), window.location.origin);
                        window.open(url.toString(), '_blank', 'toolbar=no,menubar=no,location=no,status=no,referrer=no');
                    }
                    else {
                        onReScheduleOrPrint(item);
                    }
                });
            });
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
                }).then(({ isConfirmed }) => {
                    if (isConfirmed) {
                        // send email and notification to the specified student
                        // send notification to the specified student's guidance
                        const url = new URL(pathname('/api/post/send/notification'), window.location.origin);
                        sendReminderNotification(syid, item.user?.id, formatDate(new Date(item.schedule)), (success) => {
                            Swal.fire({
                                icon: "success",
                                title: "Reminder sent successfully.",
                                timer: 2000,
                            });
                        }, (error) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error sending reminder",
                                text: error,
                                timer: 3000,
                            });
                        });
                    }
                });
            });
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
    `;
        const mappedStudents = [...students].map((s) => s.user?.username.toLowerCase());
        const $studentSelection = $("<input>")
            .addClass("form-control")
            .attr({
            type: "text",
            id: "studentIdSelection",
            list: "datalistOptions",
            maxLength: Math.max(...mappedStudents.map((s) => s.length)),
            minLength: Math.min(...mappedStudents.map((s) => s.length)),
            placeholder: "Enter Student ID",
            pattern: "^\\d{4}\\d{5}$",
        })
            .css({
            'background-color': '#fbfae3',
            'display': 'inline-block'
        })
            .prop("required", true);
        const $studentOptions = [...students].map((student) => $("<option>").attr("value", student.user?.username).text(student.user?.first_name + " " + (student.user?.middle_initial ? student.user.middle_initial + ". " : "") + student.user?.last_name));
        const $datalistOption = $('<datalist>').attr("id", "datalistOptions");
        $datalistOption.append($studentOptions);
        const $studentIdHiddenValue = $('<input>').attr({
            type: "hidden",
            id: "studentIdHiddenValue",
            name: "student_id",
            value: "",
        }).prop('required', true);
        $studentSelection.on('change', function (e) {
            const currentValue = $(this).val();
            if (!mappedStudents.includes(currentValue?.toLowerCase())) {
                $(this).css('background-color', '#f5a4a4');
            }
            else {
                if (currentValue.length < 9) {
                    $(this).css('background-color', '#fbfae3');
                }
                else {
                    $(this).css('background-color', 'white');
                    const stdid = students.find((st) => st.user?.username?.toLowerCase() === currentValue.toLowerCase())?.user?.id;
                    $studentIdHiddenValue.val(stdid).trigger("change");
                }
            }
        });
        $vmodal.find("#create-student-id").empty().append($studentSelection).append($datalistOption).append($studentIdHiddenValue);
        $studentIdHiddenValue.on("change", function () {
            if (!$(this).val())
                return;
            const selectedStudentId = $(this).val();
            if (!selectedStudentId) {
                $vmodal.find("#create-photo").attr("src", (new URL(pathname('/images/default-user.png'), window.location.origin)).toString());
                $vmodal.find("#create-full-name").text("");
                $vmodal.find("#create-department-level").text("");
                $vmodal.find("#create-year-grade-level").text("");
                $vmodal.find("#create-course-section").text("");
                $vmodal.find("#create-guidance-name").text("");
                return;
            }
            const student = students.find(({ user: stud }) => stud?.id === parseInt(selectedStudentId));
            if (student) {
                $vmodal.find("#create-photo").attr("src", (new URL(pathname(student.student_profile?.profile_pic || student.user?.profile_pic || '/images/default-user.png'), window.location.origin)).toString());
                $vmodal.find("#create-full-name").text((student.user?.last_name + ', ' + student.user?.first_name + ' ' + (student.user?.middle_initial ? student.user.middle_initial + ". " : "") + (student.student_profile?.suffix_name || "")).trim());
                $vmodal.find("#create-department-level").text(!student.student ? "[No Profile]" : student.student?.yearlevel ? student.student?.department : (student.student?.gradelevel ? (student.student?.gradelevel < 11 ? "Junior High" : "Senior High") : ""));
                $vmodal.find("#create-year-grade-level").text(displayLevel(student.student?.gradelevel || student.student?.yearlevel || ""));
                $vmodal.find("#create-course-section").text(student.student?.section || student.student?.course || "");
                $vmodal.find("#create-guidance-name").text(guidance?.first_name + " " + (guidance?.middle_initial ? (guidance.middle_initial + ". ").replace("..", ".") : "") + guidance?.last_name);
            }
            else {
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
        var selectedFiles = [];
        const onSelectedFile = (selfile) => {
            selectedFiles = selfile;
        };
        afroot.render(React.createElement(UploadDragAndDropImage, { onSelectedFile: onSelectedFile, filesToUpload: 1 }));
        $vmodal.find("form#form-create-case-note").on("submit", function (e) {
            e.preventDefault();
            const formData = {};
            $(this).find('input, select, textarea').each(function () {
                const name = $(this).attr('name');
                const value = $(this).val();
                if (name) {
                    if ($(this).attr('type') === "radio") {
                        if ($(this).prop('checked')) {
                            formData[name] = value;
                        }
                    }
                    else {
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
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((selected, ind) => {
                    postData.append('case_note_img_' + ind, selected, selected.name);
                    // console.log(ind, selected, selected.name);
                });
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
                    });
                },
                error: (_, statusText) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: statusText,
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            });
        });
        // @ts-ignore
        $vmodal.modal("show");
        $vmodal.on('hidden.bs.modal', function () {
            $vmodal.find("form#form-create-case-note").off("submit");
        });
    }, [students, guidance]);
    const onViewCaseNote = React.useCallback((item) => {
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
            var selectedFiles = [];
            const onSelectedFile = (selfile) => {
                selectedFiles = selfile;
            };
            afroot.render(React.createElement(UploadDragAndDropImage, { onSelectedFile: onSelectedFile, filesToUpload: 1 }));
            $vmodal.find("form#form-create-case-note").on("submit", function (e) {
                e.preventDefault();
                const formData = {};
                $(this).find('input, select, textarea').each(function () {
                    const name = $(this).attr('name');
                    const value = $(this).val();
                    if (name) {
                        if ($(this).attr('type') === "radio") {
                            if ($(this).prop('checked')) {
                                formData[name] = value;
                            }
                        }
                        else {
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
                if (selectedFiles.length > 0) {
                    selectedFiles.forEach((selected, ind) => {
                        postData.append('case_note_img_' + ind, selected, selected.name);
                        // console.log(ind, selected, selected.name);
                    });
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
                        });
                    },
                    error: (_, statusText) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: statusText,
                            timer: 3000,
                            showConfirmButton: false,
                        });
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
        }
        else {
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
                const printUrl = new URL(pathname("/print"), window.location.origin);
                printUrl.searchParams.append('form', 'case_notes');
                printUrl.searchParams.append('id', item.case_note?.id || "");
                const win = window.open(printUrl.toString(), '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=800,height=600');
                if (win) {
                    win.onafterprint = () => {
                        win.close();
                    };
                    win.print();
                }
                else {
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
    const onViewAgreementForm = React.useCallback((item) => {
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
            var selectedFile = null;
            const onSelectedFile = (selfile) => {
                if (selfile.length > 0) {
                    selectedFile = selfile[0];
                }
                else {
                    selectedFile = null;
                }
            };
            afroot.render(React.createElement(UploadDragAndDropImage, { onSelectedFile: onSelectedFile }));
            $vmodal.find("form#form-create-agreement-form").on("submit", function (e) {
                e.preventDefault();
                const formData = {};
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
                        });
                    },
                    error: (_, statusText) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: statusText,
                            timer: 3000,
                            showConfirmButton: false,
                        });
                    }
                });
            });
            // @ts-ignore
            $vmodal.modal("show");
            $vmodal.on('hidden.bs.modal', function () {
                $vmodal.find("form#form-create-agreement-form").off("submit");
                $agfroot.empty();
            });
        }
        else {
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
    const onUploadReferral = React.useCallback((item) => {
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
            var selectedFiles = [];
            const onSelectedFile = (selfile) => {
                selectedFiles = selfile;
            };
            afroot.render(React.createElement(UploadDragAndDropImage, { onSelectedFile: onSelectedFile, filesToUpload: 2 }));
            $vmodal.find("form#form-create-referral-form").on("submit", function (e) {
                e.preventDefault();
                const formData = {};
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
                        });
                    },
                    error: (_, statusText) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: statusText,
                            timer: 3000,
                            showConfirmButton: false,
                        });
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
    const onViewReferral = React.useCallback((it, photo) => {
        const viewContainerPhoto = (React.createElement("div", { className: "tw-flex tw-items-center tw-justify-center" },
            !photo && React.createElement(React.Fragment, null, "No Image"),
            !!photo && (React.createElement("img", { src: (new URL(pathname(photo))).toString(), alt: "Failed to Load Documentation Photo", width: "100%", height: "100%" }))));
        Swal.fire({
            title: 'Documentation',
            html: ReactDOMServer.renderToString(viewContainerPhoto),
        });
    }, []);
    const onViewAssessmentForm = React.useCallback((item) => {
        if (!item.assessment) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No Assessment Form Found',
                timer: 3000,
                showConfirmButton: false,
            });
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
        afroot.render(React.createElement(ViewAssessmentComponent, { student: {
                id: item.profile_status.id,
                student_id: item.user.id,
                name: `${item.user.first_name} ${item.user.middle_initial ? item.user.middle_initial + '. ' : ""}${item.user.last_name}`,
                level: item.education === Education.Basic ? item.student.gradelevel : item.student.yearlevel,
                course: item.student.course,
                education: item.education
            }, assessmentForms: assessmentForms, assessmentResponses: assessmentResponses, assessmentScore: assessmentScore }));
    }, []);
    const finalData = React.useMemo(() => {
        let d = !data ? [] : [...data];
        if (education === "college") {
            d = d.filter((item) => item.student?.department?.toString() === selectedDepartment.toString());
        }
        if (!!selectedProgramSection) {
            d = d.filter((item) => education === "basic"
                ? item.student?.section === selectedProgramSection
                : education === "college"
                    ? item.student?.course === selectedProgramSection
                    : item);
        }
        if (!Number.isNaN(Number.parseInt(filterByMonth.toString()))) {
            d = d.filter((item) => new Date(item.case_note?.created_at || item.schedule).getMonth().toString() === filterByMonth.toString());
        }
        if (!!filterByInteractionType) {
            d = d.filter((item) => (item.case_note?.interaction_type || InteractionType.CalledIn) === filterByInteractionType);
        }
        return d.map((v) => ({
            student_id: v.user.username,
            profile_pic: {
                value: v.student_profile?.profile_pic || v.user.profile_pic || 'none',
                content: React.createElement("img", { src: new URL(pathname(("/" + (v.student_profile?.profile_pic || v.user.profile_pic)) || '/images/default-user.png')).toString(), alt: "Profile Pic", width: "30", height: "30", className: "tw-mx-auto tw-w-[40px] tw-h-[40px]" })
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
                content: (React.createElement("button", { type: "button", onClick: () => onViewAssessmentForm(v), className: clsx("tw-w-[40px] tw-h-[40px]", !!v.assessment ? "tw-text-green-500 hover:tw-text-green-400" : "tw-text-[#6923D0] hover:tw-text-[#9c73d8]") },
                    React.createElement("i", { className: "bx bxs-file-pdf tw-text-[14pt]" }))),
            },
            schedule: {
                value: displayDateTime(v.schedule, displayDateTime(v.case_note?.created_at)),
                content: React.createElement("button", { type: "button", className: clsx("tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-whitespace-nowrap", !dateIsBeforeNow(v.schedule) ? "tw-bg-gray-300 hover:tw-bg-gray-100" : (!v.case_note ? "tw-bg-red-400 hover:tw-bg-red-200" : "tw-bg-green-400 hover:tw-bg-green-200")), onClick: () => !dateIsBeforeNow(v.schedule) ? onSendReminder(v) : (!v.case_note ? onReScheduleOrPrint(v) : onPrintCalledSlip(v)), disabled: !v.schedule }, displayDateTime(v.schedule, displayDateTime(v.case_note?.created_at))),
            },
            case_note: {
                value: !v.case_note ? "0" : "1",
                content: (React.createElement("button", { type: "button", onClick: () => onViewCaseNote(v), className: clsx("tw-w-[40px] tw-h-[40px]", !v.case_note ? "tw-text-[#6923D0] hover:tw-text-[#9c73d8]" : "tw-text-green-500 hover:tw-text-green-400") },
                    React.createElement("i", { className: "bx bxs-note tw-text-[14pt]" }))),
            },
            agreement_form: {
                value: !v.agreement_form ? "0" : "1",
                content: (React.createElement("button", { type: "button", onClick: () => onViewAgreementForm(v), className: clsx("tw-w-[40px] tw-h-[40px]", !v.agreement_form ? "tw-text-[#6923D0] hover:tw-text-[#9c73d8]" : "tw-text-green-500 hover:tw-text-green-400") },
                    React.createElement("i", { className: "bx bxs-message-alt-check tw-text-[14pt]" }))),
            },
            counselor: v.guidance?.first_name + " " + (v.guidance?.middle_initial ? (v.guidance?.middle_initial + ". ").replace("..", ".") : "") + v.guidance?.last_name,
            referral_form: {
                value: !v.referral_form ? "0" : "1",
                content: !v.referral_form
                    ? React.createElement("button", { type: "button", onClick: () => onUploadReferral(v), className: "tw-whitespace-nowrap tw-px-w tw-py-1 tw-text-blue-600 tw-w-[40px] tw-h-[40px] hover:tw-text-blue-400" },
                        React.createElement("i", { className: "bx bx-upload tw-text-[14pt]" }, "\u00A0"),
                        "Upload")
                    : (React.createElement("div", { className: "tw-flex tw-flex-nowrap tw-justify-center tw-gap-x-2" }, [v.referral_form.referral_a, v.referral_form.referral_b].filter((vimg) => !!vimg).map((item) => (React.createElement("button", { type: "button", onClick: () => onViewReferral(v, item), className: "tw-w-[40px] tw-h-[40px] tw-text-[#6923D0] hover:tw-text-[#9c73d8]" },
                        React.createElement("i", { className: "bx bxs-image tw-text-[14pt]" })))))),
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
        window.open((new URL(pathname(pathurl), window.location.origin)));
    }, [selectedDepartment, selectedProgramSection, sy, filterByMonth, filterByInteractionType]);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", { className: "tw-container tw-mt-4 tw-relative" },
        React.createElement("button", { className: "tw-absolute tw-right-0 tw-top-0 btn btn-primary", onClick: handlePrint }, "Print"),
        React.createElement("h2", null, "Counseling"),
        React.createElement("div", { className: "tw-flex tw-justify-between tw-w-full" },
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
            React.createElement("div", { className: "flex justify-end" },
                React.createElement("div", null,
                    React.createElement("label", null, "Filter By Month: "),
                    React.createElement("div", { className: "tw-max-w-[300px]" },
                        React.createElement("div", { className: "select-wrapper" },
                            React.createElement("select", { className: "form-select", value: filterByMonth, onChange: (e) => setFilterByMonth(e.target.value) },
                                React.createElement("option", { value: "" }, "-- Month --"),
                                monthList.map((month, index) => (React.createElement("option", { key: month, value: index }, month))))))),
                React.createElement("div", null,
                    React.createElement("label", null, "Filter By Interaction Type: "),
                    React.createElement("div", { className: "tw-max-w-[300px]" },
                        React.createElement("div", { className: "select-wrapper" },
                            React.createElement("select", { className: "form-select", value: filterByInteractionType, onChange: (e) => setFilterByInteractionType(e.target.value) },
                                React.createElement("option", { value: "" }, "-- Interaction Type --"),
                                Object.values(InteractionType).map((itype, index) => (React.createElement("option", { key: itype + index, value: itype }, itype))))))))),
        React.createElement("p", null,
            "Counseling Records of A.Y. ",
            sy,
            " - ",
            Number.parseInt(sy) + 1),
        React.createElement("br", null),
        React.createElement(Table, { defaultSortOrder: SortOrder.Descending, columns: columns, items: finalData },
            React.createElement("div", null,
                React.createElement("button", { type: "button", className: "btn btn-primary tw-max-w-[250px]", onClick: onWalkedIn },
                    React.createElement("i", { className: "bx bx-plus" }),
                    "\u00A0Case Note")),
            React.createElement("div", { className: "select-wrapper" },
                React.createElement("select", { className: "form-select", value: selectedDepartment, onChange: (e) => setSelectedDepartment(e.target.value) },
                    React.createElement("option", { value: "" }, "Department"),
                    departmentOptions.map((opt) => (React.createElement("option", { key: opt.value, value: opt.value }, opt.label))))),
            React.createElement("div", { className: "select-wrapper" },
                React.createElement("select", { className: "form-select", value: selectedProgramSection, onChange: (e) => setSelectedProgramSection(e.target.value) },
                    React.createElement("option", { value: "" }, education === "college" ? "Program/Course" : "Section"),
                    programSectionOptions.map((opt) => (React.createElement("option", { key: opt.value, value: opt.value }, opt.label))))))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(CounselingRecords));
