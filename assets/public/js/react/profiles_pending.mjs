// @ts-ignore
import { pathname, React, ReactDOM, ReactDOMServer, Swal, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType } from "./table.mjs";
const $pageRoot = $("#page-root");
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
})(Gender || (Gender = {}));
const columns = [
    { label: "Photo", key: "profile_pic", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
    { label: "Student ID", key: "username", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "First Name", key: "first_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
    { label: "Middle Initial", key: "middle_initial", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Last Name", key: "last_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
    { label: "Gender", key: "gender", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Email", key: "email", sortable: true, cellType: TableCellType.String, align: CellAlign.Left },
    { label: "Remind Student", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];
function displayDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
function sendReminderNotification(sy, syid, student_id, onSuccess, onError) {
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
                                            "We would like to remind you to submit your ",
                                            React.createElement("a", { href: homepage + "profile" }, "Student Profile"),
                                            " for S.Y. ",
                                            sy,
                                            " on Guidance Counseling Management System (SMCC).",
                                            React.createElement("br", null),
                                            "Thank you."))),
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
            subject: `Reminder on Student Profile Submission | Guidance Office (SMCC)`,
            body: bodyHTMLString.replaceAll("\n", "").trim(),
            title: "Reminder on Student Profile Submission",
            message: `Reminding you to submit your <a href={homepage + "profile"}>Student Profile</a> for S.Y. ${sy}. Thank you.`,
            href: "/profile",
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
function broadcastNotification(sy, syid, onSuccess, onError) {
    try {
        const broadcastUrl = new URL(pathname("/api/post/broadcast/notification"), window.location.origin);
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
                                            "We would like to remind you to submit your ",
                                            React.createElement("a", { href: homepage + "profile" }, "Student Profile"),
                                            " for S.Y. ",
                                            sy,
                                            " on Guidance Counseling Management System (SMCC).",
                                            React.createElement("br", null),
                                            "Thank you."))),
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
            subject: `Reminder on Student Profile Submission | Guidance Office (SMCC)`,
            body: bodyHTMLString.replaceAll("\n", "").trim(),
            title: "Reminder on Student Profile Submission",
            message: `Reminding you to submit your <a href="${homepage + 'profile'}">Student Profile</a> for S.Y. ${sy}. Thank you.`,
            href: "/profile",
        };
        // Broadcast notification to all users
        $.post(broadcastUrl.toString(), postData)
            .done(function ({ success, error }) {
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
function AllAdminPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { school_years, all_data } = usePageData(setIsLoading);
    const [selectedSchoolYear, setSelectedSchoolYear] = React.useState((new Date()).getFullYear().toString());
    const { notsubmitted, sy, syid } = React.useMemo(() => {
        const selSy = Array.isArray(school_years) ? school_years.find((yr) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
        let notsub = Array.isArray(all_data) ? all_data.find((nots) => nots.sy.toString() === selSy?.year?.toString()) : undefined;
        notsub = !!notsub?.notsubmitted ? [...(notsub.notsubmitted)] : [];
        return {
            notsubmitted: notsub,
            sy: selSy?.year,
            syid: selSy?.id,
        };
    }, [school_years, all_data, selectedSchoolYear]);
    const data = React.useMemo(() => notsubmitted, [notsubmitted]);
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
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                broadcastNotification(sy, syid, (success) => {
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
    }, [data]);
    const onSendReminder = React.useCallback((student) => {
        Swal.fire({
            icon: "question",
            title: `Send Reminder to ${student?.first_name} ${student?.middle_initial} ${student?.last_name}?`,
            text: "Are you sure you want to send a reminder to this student?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send reminder",
            cancelButtonText: "No, cancel",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                sendReminderNotification(sy, syid, student?.id, (success) => {
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
    }, [sy, syid]);
    const items = React.useMemo(() => data?.map((item) => ({
        id: item?.id,
        profile_pic: {
            value: item.profile_pic || 'none',
            content: React.createElement("img", { src: new URL(pathname("/" + item.profile_pic || '/images/default-user.png')).toString(), alt: "Profile Pic", width: "30", height: "30", className: "tw-mx-auto tw-w-[30px] tw-h-[30px]" })
        },
        username: item.username,
        first_name: item.first_name,
        middle_initial: item.middle_initial ? item.middle_initial + ". " : "",
        last_name: item.last_name,
        gender: item.gender,
        email: item.email,
        action: React.createElement("button", { type: "button", className: "tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-blue-400 hover:tw-bg-blue-200", onClick: () => onSendReminder(item) }, "Send Reminder")
    })) || [], [data]);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", { className: "tw-container tw-mt-4" },
        React.createElement("h2", null, "No Profiles Submitted Yet"),
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
        React.createElement("p", null,
            "All not submitted student profiles of A.Y. ",
            sy,
            " - ",
            Number.parseInt(sy) + 1),
        React.createElement(Table, { columns: columns, items: items },
            React.createElement("div", null,
                React.createElement("button", { type: "button", className: "btn btn-primary", onClick: onSendReminderToAll }, "Send Reminder To All")))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(AllAdminPage));
