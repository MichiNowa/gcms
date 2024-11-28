// @ts-ignore
import { React, ReactDOM, pathname } from "./imports.mjs"
const abb: any = {
    'College of Arts and Sciences': 'CAS',

    'College of Business Management and Accountancy': 'CBMA',

    'College of Computing and Information Sciences': 'CCIS',

    'College of Criminal Justice Education': 'CCJE',

    'College of Teacher Education': 'CTE',

    'College of Tourism and Hospitality Management': 'CTHM',

    'Basic Education': 'BasicEd',
}
function displayDateTime(dateTime: string | undefined | null, defaultString?: string) {
    if (!dateTime) return defaultString;
    const scheduleDate = new Date(dateTime);
    return scheduleDate.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" }) + ' @ ' + scheduleDate.toLocaleTimeString('en-PH', { hour12: true });
}

interface CaseNoteProps {
    interaction_type: string;
    schedule: string;
    guidance_name: string;
}

interface OtherProps {
    schedule: string;
    guidance_name: string;
}

interface DataProps {
    profile: {
        name: string;
        photo: string;
        level: number | string;
        program: string;
        department: string;
    },
    case_notes: CaseNoteProps[],
    called_slip: OtherProps[]
    agreement_forms: OtherProps[]
}

function PrintReport() {
    const [data, setData] = React.useState<DataProps>()
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
                setData(data)
            })
    }, [sy, userId])

    return (
        <div>
            <h4 className="tw-text-center">S.Y. {year} - {Number.parseInt(year) + 1}</h4>
            <div>
                <div className="tw-font-bold tw-text-lg">{data?.profile?.name}</div>
                <div className="tw-text">{data?.profile?.level} - {data?.profile?.program}</div>
                <div className="tw-text">{data?.profile?.department}</div>
            </div>
            <hr />
            <h5>Case Notes</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>Schedule</td>
                        <td>Interaction Type</td>
                        <td>Guidance Counselor</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.case_notes?.map((note: CaseNoteProps, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{displayDateTime(note.schedule)}</td>
                                <td>{note.interaction_type}</td>
                                <td>{note.guidance_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <hr />
            <h5>Called-In Slip</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>Schedule</td>
                        <td>Guidance Counselor</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.called_slip?.map((note: OtherProps, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{displayDateTime(note.schedule)}</td>
                                <td>{note.guidance_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <hr />
            <h5>Agreement Form</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>Schedule</td>
                        <td>Guidance Counselor</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.agreement_forms?.map((note: OtherProps, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{displayDateTime(note.schedule)}</td>
                                <td>{note.guidance_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
const urlWindow = new URL(window.location.href + window.location.search, window.location.origin);
if (urlWindow.searchParams.get("form") == "summary_records") {
    const $stylesheetLink = $("<link>");
    $stylesheetLink.attr({
        rel: "stylesheet",
        href: pathname('/vendor/bootstrap/css/bootstrap.min.css'),
    })
    $("head").append($stylesheetLink);
    const root = ReactDOM.createRoot($('#print-content-root').get(0))
    root.render(<PrintReport />)
};