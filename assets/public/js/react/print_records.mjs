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
    const [data, setData] = React.useState();
    const userId = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('uid');
    }, []);
    const sy = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('sy');
    }, []);
    const year = React.useMemo(() => {
        const depQuery = new URL(window.location.pathname + window.location.search, window.location.origin);
        return depQuery.searchParams.get('year');
    }, []);
    React.useEffect(() => {
        fetch(pathname(`/api/get/summaryrecords?sy=${sy}&uid=${userId}`))
            .then((response) => response.json())
            .then(({ data }) => {
            console.log(data);
            setData(data);
        });
    }, [sy, userId]);
    return (React.createElement("div", null,
        React.createElement("h4", { className: "tw-text-center" },
            "S.Y. ",
            year,
            " - ",
            Number.parseInt(year) + 1),
        React.createElement("div", null,
            React.createElement("div", { className: "tw-font-bold tw-text-lg" }, data?.profile?.name),
            React.createElement("div", { className: "tw-text" },
                data?.profile?.level,
                " - ",
                data?.profile?.program),
            React.createElement("div", { className: "tw-text" }, data?.profile?.department)),
        React.createElement("hr", null),
        React.createElement("h5", null, "Case Notes"),
        React.createElement("table", { className: "table table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "No."),
                    React.createElement("td", null, "Schedule"),
                    React.createElement("td", null, "Interaction Type"),
                    React.createElement("td", null, "Guidance Counselor"))),
            React.createElement("tbody", null, data?.case_notes?.map((note, index) => (React.createElement("tr", { key: index },
                React.createElement("td", null, index + 1),
                React.createElement("td", null, displayDateTime(note.schedule)),
                React.createElement("td", null, note.interaction_type),
                React.createElement("td", null, note.guidance_name)))))),
        React.createElement("hr", null),
        React.createElement("h5", null, "Called-In Slip"),
        React.createElement("table", { className: "table table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "No."),
                    React.createElement("td", null, "Schedule"),
                    React.createElement("td", null, "Guidance Counselor"))),
            React.createElement("tbody", null, data?.called_slip?.map((note, index) => (React.createElement("tr", { key: index },
                React.createElement("td", null, index + 1),
                React.createElement("td", null, displayDateTime(note.schedule)),
                React.createElement("td", null, note.guidance_name)))))),
        React.createElement("hr", null),
        React.createElement("h5", null, "Agreement Form"),
        React.createElement("table", { className: "table table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "No."),
                    React.createElement("td", null, "Schedule"),
                    React.createElement("td", null, "Guidance Counselor"))),
            React.createElement("tbody", null, data?.agreement_forms?.map((note, index) => (React.createElement("tr", { key: index },
                React.createElement("td", null, index + 1),
                React.createElement("td", null, displayDateTime(note.schedule)),
                React.createElement("td", null, note.guidance_name))))))));
}
const urlWindow = new URL(window.location.href + window.location.search, window.location.origin);
if (urlWindow.searchParams.get("form") == "summary_records") {
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
