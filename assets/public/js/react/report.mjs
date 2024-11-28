// @ts-ignore
import { React, ReactDOM, pathname } from "./imports.mjs";
const abb = {
    'College of Arts and Sciences': 'CAS',
    'College of Business Management and Accountancy': 'CBMA',
    'College of Computing and Information Sciences': 'CCIS',
    'College of Criminal Justice Education': 'CCJE',
    'College of Teacher Education': 'CTE',
    'College of Tourism and Hospitality Management': 'CTHM',
    'Basic Education': 'BasicEd',
};
function displayDateTime(dateTime, defaultString) {
    if (!dateTime)
        return defaultString;
    const scheduleDate = new Date(dateTime);
    return scheduleDate.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" }) + ' @ ' + scheduleDate.toLocaleTimeString('en-PH', { hour12: true });
}
function PrintReport() {
    const [data, setData] = React.useState([]);
    const department = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('department');
    }, []);
    const section = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('section');
    }, []);
    const sy = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('sy');
    }, []);
    const month = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        const monthStr = depQuery.searchParams.get('month');
        if (!monthStr)
            return null;
        return Number.parseInt(monthStr);
    }, []);
    const interaction = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('interaction');
    }, []);
    React.useEffect(() => {
        fetch(pathname(!sy ? "/api/get/casenotelist" : `/api/get/casenotelist?sy=${sy}`))
            .then((response) => response.json())
            .then(({ data }) => {
            setData(data);
        });
    }, [sy]);
    const finalData = React.useMemo(() => {
        let filtered = [...data];
        if (!!department) {
            filtered = filtered.filter((d) => {
                return abb[d.profile.department] == department;
            });
        }
        if (!!section) {
            filtered = filtered.filter((d) => {
                return d.profile.program == section;
            });
        }
        if (!Number.isNaN(Number.parseInt(month?.toString()))) {
            filtered = filtered.filter((d) => {
                const scheduleDate = new Date(d.case_note.schedule);
                return scheduleDate.getMonth().toString() === month.toString();
            });
        }
        if (!!interaction) {
            filtered = filtered.filter((d) => {
                return d.case_note.interaction_type === interaction;
            });
        }
        return filtered;
    }, [data, section, department, month, interaction]);
    return (React.createElement("div", null,
        React.createElement("h4", { className: "tw-text-center" },
            "S.Y. ",
            sy,
            " - ",
            Number.parseInt(sy) + 1),
        React.createElement("table", { className: "table table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "No."),
                    React.createElement("td", null, "Stud. ID"),
                    React.createElement("td", null, "Name"),
                    React.createElement("td", null, "Department"),
                    React.createElement("td", null, "YearLevel"),
                    React.createElement("td", null, "Program/Section"),
                    React.createElement("td", null, "Schedule"),
                    React.createElement("td", null, "Type"))),
            React.createElement("tbody", null, finalData.map((student, i) => (React.createElement("tr", null, ["no", "student_id", "name", "department", "year_level", "program", "schedule", "type"].map((col) => (React.createElement("td", { className: "tw-text-sm" }, col === "student_id" ? student.student.username
                : col === "name" ? student.student.name
                    : col === "department" ? (student.profile.department === "Basic Education" ? student.profile.department : abb[student.profile.department])
                        : col === "year_level" ? student.profile.level
                            : col === "program" ? student.profile.program
                                : col === "schedule" ? displayDateTime(student.case_note.schedule)
                                    : col === "type" ? student.case_note.interaction_type
                                        : i + 1))))))))));
}
const urlWindow = new URL(window.location.href + window.location.search, window.location.origin);
if (urlWindow.searchParams.get("form") == "counseling_report") {
    const $stylesheetLink = $("<link>");
    $stylesheetLink.attr({
        rel: "stylesheet",
        href: pathname('/vendor/bootstrap/css/bootstrap.min.css'),
    });
    $("head").append($stylesheetLink);
    const root = ReactDOM.createRoot($('#print-content-root').get(0));
    root.render(React.createElement(PrintReport, null));
}
;
