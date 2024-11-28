// @ts-ignore
import { React, ReactDOM, pathname, usePageData } from "./imports.mjs";

// @ts-ignore
import { CellAlign, Table, TableCellType, TableColumn } from "./table.mjs";

const $pageRoot = $("#page-root");

const columns: TableColumn[] = [
  { label: "#", key: "index", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Date Submitted", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Feedback Form", key: "feedback", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];

function displayDate(date: string, defaultString: string = "") {
  if (!date) return defaultString;
  const dateObj = new Date(date);
  // format date in MMMM d, YYYY
  return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}

function FeedbackPage() {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { school_years, all_feedbacks } = usePageData(setIsLoading);
  const [selectedSchoolYear, setSelectedSchoolYear] = React.useState<string>((new Date()).getFullYear().toString());
  const { feedbacks, sy } = React.useMemo(() => {
    const selSy = Array.isArray(school_years) ? school_years.find((yr: any) => yr?.year?.toString() === selectedSchoolYear.toString()) : undefined;
    let fbacks = Array.isArray(all_feedbacks) ? all_feedbacks.find((fbs: any) => fbs.sy.toString() === selSy?.year?.toString()) : undefined;
    fbacks = !!fbacks?.feedbacks ? [...(fbacks.feedbacks)] : [];
    return {
      feedbacks: fbacks,
      sy: selSy?.year,
    }
  }, [school_years, all_feedbacks, selectedSchoolYear]);

  const data = React.useMemo(() => [...(feedbacks || [])].map((v, index: number) => ({
    index: index + 1,
    created_at: v.created_at,
    feedback: <button type="button" className="tw-text-[#6923D0] hover:tw-text-[#9c73d8]" onClick={() => onViewFeedback(v)}><i className="bx bxs-comment-dots tw-text-[14pt]"></i></button>
  })), [feedbacks]);

  const onViewFeedback = React.useCallback((item: any) => {
    const printUrl = new URL(pathname("/print"), window.location.origin)
    printUrl.searchParams.append('form', 'student_feedback');
    printUrl.searchParams.append('id', item?.id || "");
    window.open(printUrl.toString(), '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=800,height=600,noopener,noreferrer');
  }, []);

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  return (
    <div>
      <h1>Counseling Feedbacks</h1>
      <p>Counseling Records of A.Y. {sy} - {Number.parseInt(sy) + 1}</p>
      <div className="tw-max-w-64">
        <select className="tw-w-full tw-border tw-border-gray-300 tw-py-2 tw-px-4 tw-rounded-md tw-text-gray-700 tw-bg-white tw-text-sm" value={selectedSchoolYear} onChange={(e) => setSelectedSchoolYear(e.target.value)}>
          {school_years?.map((yr: any) => (
            <option key={yr.year} value={yr.year}>A.Y {yr.year} - {Number.parseInt(yr.year) + 1}</option>
          ))}
        </select>
      </div>
      <Table columns={columns} items={data} />
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(FeedbackPage));