// @ts-ignore
import { React, ReactDOM, Swal, clsx, pathname, usePageData } from "./imports.mjs";

const $pageRoot = $("#page-root");


function displayDate(date: string, defaultString: string = "No Appointment Schedule") {
  if (!date) return defaultString;
  const dateObj = new Date(date);
  // format date in MMMM d, YYYY
  return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}

function displayTime(time: string, defaultString: string = "No Appointment Time") {
  if (!time) return defaultString;
  const timeObj = new Date(time);
  // format time in HH:mm AM/PM
  return timeObj.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "2-digit" });
}

function dateIsBeforeNow(dateTime: string) {
  if (!dateTime) return true;
  const scheduleDate = new Date(dateTime);
  return Date.now() > scheduleDate.getTime();
}

function numberToLetter(num: number) {
  if (num < 0) {
    return ""
  }

  const letter = String.fromCharCode((num % 26) + 65);

  return letter;
}

interface FeedbackItem {
  item: string;
  type: "number"|"boolean"|"string";
  rating: "1"|"2"|"3"|"4"|boolean|undefined;
}

interface FeedbackFormCategory {
  category_name: string;
  items: FeedbackItem[];
}

function AddFeedbackPage({ user, sy, setPage, pageProps }: any) {
  const [feedbackForm, setFeedbackForm] = React.useState<FeedbackFormCategory[]>([
    {
      category_name: 'Working Relationship With Your Counselor',
      items: [
        { item: 'My counselor listened to me effectively.', type: 'number' },
        { item: 'My counselor understood things from my point of view.', type: 'number' },
        { item: 'My counselor focused on what was important to me.', type: 'number' },
        { item: 'My counselor accepted what i said without judging me.', type: 'number' },
        { item: 'My counselor showed warmth toward me.', type: 'number' },
        { item: 'My counselor fostered a safe and trusting environment.', type: 'number' },
        { item: 'My counselor began and finished our session/s on time.', type: 'number' },
        { item: 'My counselor followed my lead during our session/s whenever that was appropriate.', type: 'number' },
        { item: 'My counselor provided leadership during our session/s when if that was appropriate.', type: 'number' },
        { item: 'My counselor challenge me when/if that was appropriate.', type: 'number' },
      ],
    },
    {
      category_name: 'Result of Working With Your Counselor',
      items: [
        { item: 'The session/s with my counselor helped me with whatever originally led me to seek.', type: 'number' },
        { item: 'Any changes which might have occurred in me as a result of my counseling have been positive and welcome.', type: 'number' },
      ]
    },
    {
      category_name: 'Overall Satisfaction',
      items: [
        { item: 'My overall level of satisfaction with the service provided by my counselor is:', type: 'string' },
        { item: 'Any changes which might have occurred in me as a result of my counseling have been positive and welcome.', type: 'boolean' },
      ]
    }
  ]);
  const [otherComments, setOtherComments] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback((e: any) => {
    e.preventDefault();
    const feedbackData = {
      sy: sy,
      user_id: user?.id,
      guidance_id: pageProps?.guidance?.id,
      case_note_id: pageProps?.case_note?.id,
      ratings: [...feedbackForm],
      comments: otherComments,
    }
    const url = new URL(pathname("/api/post/feedback/submit"), window.location.origin);
    setSubmitting(true);
    $.post(url.toString(), feedbackData)
      .done(function({ success, error }: any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error Submitting Feedback",
            text: error,
            confirmButtonText: "Close",
          })
        } else if (success) {
          Swal.fire({
            icon: "success",
            title: success,
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setPage(0);
          })
        }
        setSubmitting(false);
      })
      .fail(function(_: any, statusText: any) {
        console.log("error: ", statusText);
        Swal.fire({
          icon: "error",
          title: "Error Submitting Feedback",
          text: "Error Submitting Feedback",
          confirmButtonText: "Close",
        })
        setSubmitting(false);
      })
  }, [feedbackForm, otherComments, sy, user, pageProps]);

  return (<div>
    <div className="tw-bg-gray-200 tw-rounded-lg tw-px-4 tw-py-2">
      <div className="tw-uppercase tw-tracking-wide tw-text-indigo-500 tw-font-semibold">Appointment Date: {displayDate(pageProps?.schedule)}</div>
      <p className="tw-block tw-mt-1 tw-leading-tight tw-font-medium tw-text-black">Time: {displayTime(pageProps?.schedule)}</p>
      <p className="tw-mt-2 tw-text-gray-500">Guidance Counselor: {pageProps?.guidance?.first_name} {pageProps?.guidance?.middle_initial ? pageProps?.guidance?.middle_initial + ". " : ""}{pageProps?.guidance?.last_name}</p>
    </div>
    <div className="row text-center">
      <div className="col">
        <h4 className="mt-3 mb-3">CLIENT'S COUNSELING FEEDBACK</h4>
      </div>
    </div>
    <form onSubmit={handleSubmit}>
      <p>
        This form allows you an oppurnity to provide feedback to your counselor after your session/s have finished.
        This will help your counselor's professional development as well as helping to improve the service offered
        to others. <strong>YOU DO NOT need to identify yourself</strong>. Please place a mark in the box which
        mostly closely corresponds how you feel about each statement
      </p>
      <div className="container justify-content-center">
        <div className="row">
          <div className="col">
            <div className="tw-mx-auto tw-max-w-fit">
                <div><b>Rating Scale:</b></div>
                <div>4- Strongly Agree</div>
                <div>3- Somewhat Agree</div>
                <div>2- Somewhat Disagree</div>
                <div>1- Strongly Disagree</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 justify-content-center tw-m-auto">
        <div className="col table-responsive">
          <table className="table table-light align-middle">
            {feedbackForm.map((feedbackCategory: FeedbackFormCategory, ci: number) => (
              <React.Fragment key={"feedbackcategory_" + ci}>
                <tr>
                  <td><b>{numberToLetter(ci)}. {feedbackCategory.category_name}</b></td>
                  <td>{ci === 0 && <b>Rating</b>}</td>
                </tr>
                {feedbackCategory.items.map((feedbackItem: FeedbackItem, index: number) => (
                  <tr key={"feedbackitem_" + ci + "_" + index}>
                    <td>
                      {feedbackForm.filter((_: any, ii: number) => ii < ci).reduce((init: number, v: FeedbackFormCategory) => init + v.items.length, 0) + (index + 1)}. {feedbackItem.item}
                    </td>
                    <td>
                      {feedbackItem.type === "number" && (
                        <div className="select-wrapper tw-min-w-[150px]">
                          <select
                            className="form-control"
                            value={feedbackItem.rating as "1"|"2"|"3"|"4"|undefined}
                            onChange={(e: any) => setFeedbackForm((prev: FeedbackFormCategory[]) => {
                              const newFeedbackCategory = [...prev];
                              newFeedbackCategory[ci].items[index].rating = e.target.value;
                              return newFeedbackCategory;
                            })}
                            required
                          >
                            <option value="" selected disabled>Rate</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                          </select>
                        </div>
                      )}
                      {feedbackItem.type === "string" && (
                        <div className="select-wrapper tw-min-w-[150px]">
                          <select
                            className="form-control"
                            value={feedbackItem.rating as "1"|"2"|"3"|"4"|undefined}
                            onChange={(e: any) => setFeedbackForm((prev: FeedbackFormCategory[]) => {
                              const newFeedbackCategory = [...prev];
                              newFeedbackCategory[ci].items[index].rating = e.target.value;
                              return newFeedbackCategory;
                            })}
                            required
                          >
                            <option value="" selected disabled>Rate</option>
                            <option value="4">Very Satisfied</option>
                            <option value="3">Somewhat Satisfied</option>
                            <option value="2">Somewhat Dissatisfied</option>
                            <option value="1">Strongly Dissatisfied</option>
                          </select>
                        </div>
                      )}
                      {feedbackItem.type === "boolean" && (<>
                        <div className="select-wrapper">
                          <select
                            className="form-control"
                            value={feedbackItem.rating as boolean|undefined ? "Yes" : "No"}
                            onChange={(e: any) => setFeedbackForm((prev: FeedbackFormCategory[]) => {
                              const newFeedbackCategory = [...prev];
                              newFeedbackCategory[ci].items[index].rating = e.target.value === "Yes";
                              return newFeedbackCategory;
                            })}
                            required
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </>)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr>
              <th colSpan={2}>
                D. Other Comments
              </th>
            </tr>
            <tr>
              <td colSpan={2} className="tw-text-justify">
                <p>Please use the space below for any other comments you would like to bring to your
                  counselor's attention. (If there are any matter which you specifically would not have
                  wanted to discuss with your counselor in person your counselor would be especially glad
                  to know of these). If you include your name in this section, it will be treated as&nbsp;
                  <strong>CONFIDENTIAL</strong>.
                </p>
                <br />
                <textarea className="form-control" rows={3} value={otherComments} onChange={(e: any) => setOtherComments(e.target.value)} />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <br />
      <div className="row text-center">
        <div className="col">
          <button type="reset" className="btn btn-primary" onClick={() => setPage(0)}>Cancel</button>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
        </div>
      </div>
      <br />
    </form>
  </div>);
}

function Schedules({ user, sy, setPage, setPageProps }: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState({});
  const schedules = React.useMemo(() => [...(data?.called_in || []), ...(data?.walked_in || [])], [data])
  const fetchData = () => {
    const url = new URL(pathname("/api/get/myappointments"), window.location.origin);
    url.searchParams.append("id", user?.id);
    url.searchParams.append("sy", sy);
    $.get(url.toString())
      .done(function ({ data }) {
        setData(data);
        setIsLoading(false);
      })
      .fail(function (_, statusText) {
        console.log("Error: " + statusText);
        setIsLoading(false);
      })
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const onGiveFeedback = React.useCallback((item: any) => {
    setPageProps({...item});
    setPage(1);
  }, [setPageProps, setPage]);

  return (
    <div className="tw-p-4">
      <h2>Your Counseling Appointments</h2>
      <div className="tw-flex tw-flex-wrap tw-justify-evenly tw-gap-4">
        {schedules.length === 0 && (
          <div className="tw-text-xl tw-text-gray-400 tw-italic tw-text-center tw-w-full tw-mt-8">{!isLoading ? <>No Appointments</> : <>Loading...</>}</div>
        )}
        {!isLoading && schedules.length > 0 && schedules.map((ap: any, index: number) => (
          <div key={`appointment_${index}`} className={clsx(!dateIsBeforeNow(ap?.schedule) ? "tw-bg-white" : (!ap.case_note ? "tw-bg-red-200" : "tw-bg-green-200"), "tw-max-w-md tw-mx-auto tw-rounded-xl tw-shadow-md tw-overflow-hidden md:tw-max-w-2xl tw-m-3")}>
            <div className="md:tw-flex">
              <div className="tw-p-8">
                <div className="tw-uppercase tw-tracking-wide tw-text-indigo-500 tw-font-semibold">Appointment Date: {displayDate(ap?.schedule)}</div>
                <p className="tw-block tw-mt-1 tw-leading-tight tw-font-medium tw-text-black">Time: {displayTime(ap?.schedule)}</p>
                <p className="tw-mt-2 tw-text-gray-500">Guidance Counselor: {ap?.guidance?.first_name} {ap?.guidance?.middle_initial ? ap?.guidance?.middle_initial + ". " : ""}{ap?.guidance?.last_name}</p>
                <button onClick={() => onGiveFeedback(ap)} disabled={!ap.case_note || !!ap.feedback} className="tw-mt-5 tw-ml-3 tw-px-4 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-md tw-bg-blue-700 tw-text-white bg-red-600 hover:tw-bg-blue-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-red-500 disabled:tw-bg-blue-300">
                    Give Feedback
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function Main() {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const pageData = usePageData(setLoading);
  const pages = React.useMemo(() => [Schedules, AddFeedbackPage], []);
  const [pageProps, setPageProps] = React.useState({});
  const [page, setPage] = React.useState<number>(0);
  const CurrentPage = React.useMemo(() => pages[page], [pages, page])

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }
  return (
    <div className="container justify-content-center box tw-p-3">
      <CurrentPage setPage={setPage} setPageProps={setPageProps} pageProps={pageProps} {...pageData} />
    </div>
  );
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(Main));