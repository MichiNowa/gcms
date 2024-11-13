// @ts-ignore
import { React, ReactDOM, pathname, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType } from "./table.mjs";
const $pageRoot = $("#page-root");
const columns = [
    { label: "#", key: "index", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
    { label: "Date Submitted", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
    { label: "Feedback Form", key: "feedback", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];
function displayDate(date, defaultString = "") {
    if (!date)
        return defaultString;
    const dateObj = new Date(date);
    // format date in MMMM d, YYYY
    return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}
function FeedbackPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { school_years, all_feedbacks } = usePageData(setIsLoading);
    const [selectedSchoolYear, setSelectedSchoolYear] = React.useState((new Date()).getFullYear().toString());
    const { feedbacks, sy } = React.useMemo(() => {
        const selSy = Array.isArray(school_years) ? school_years.find((yr) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
        let fbacks = Array.isArray(all_feedbacks) ? all_feedbacks.find((fbs) => fbs.sy.toString() === selSy?.year?.toString()) : undefined;
        fbacks = !!fbacks?.feedbacks ? [...(fbacks.feedbacks)] : [];
        return {
            feedbacks: fbacks,
            sy: selSy?.year,
        };
    }, [school_years, all_feedbacks, selectedSchoolYear]);
    const data = React.useMemo(() => [...(feedbacks || [])].map((v, index) => ({
        index: index + 1,
        created_at: v.created_at,
        feedback: React.createElement("button", { type: "button", className: "tw-text-[#6923D0] hover:tw-text-[#9c73d8]", onClick: () => onViewFeedback(v) },
            React.createElement("i", { className: "bx bxs-comment-dots tw-text-[14pt]" }))
    })), [feedbacks]);
    const onViewFeedback = React.useCallback((item) => {
        const printUrl = new URL(pathname("/print"), window.location.origin);
        printUrl.searchParams.append('form', 'student_feedback');
        printUrl.searchParams.append('id', item?.id || "");
        window.open(printUrl.toString(), '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=800,height=600,noopener,noreferrer');
    }, []);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", null,
        React.createElement("h1", null, "Counseling Feedbacks"),
        React.createElement("p", null,
            "Counseling Records of A.Y. ",
            sy,
            " - ",
            Number.parseInt(sy) + 1),
        React.createElement(Table, { columns: columns, items: data })));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(FeedbackPage));
