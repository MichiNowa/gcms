// @ts-ignore
import { React, ReactDOM, Swal, clsx, pathname, usePageData } from "./imports.mjs";
const $pageRoot = $("#page-root");
function displayDate(date, defaultString = "No Appointment Schedule") {
    if (!date)
        return defaultString;
    const dateObj = new Date(date);
    // format date in MMMM d, YYYY
    return dateObj.toLocaleDateString('en-PH', { month: "long", year: "numeric", day: "numeric" });
}
function displayTime(time, defaultString = "No Appointment Time") {
    if (!time)
        return defaultString;
    const timeObj = new Date(time);
    // format time in HH:mm AM/PM
    return timeObj.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "2-digit" });
}
function dateIsBeforeNow(dateTime) {
    if (!dateTime)
        return true;
    const scheduleDate = new Date(dateTime);
    return Date.now() > scheduleDate.getTime();
}
function numberToLetter(num) {
    if (num < 0) {
        return "";
    }
    const letter = String.fromCharCode((num % 26) + 65);
    return letter;
}
function AddFeedbackPage({ user, sy, setPage, pageProps }) {
    const [feedbackForm, setFeedbackForm] = React.useState([
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
    const [otherComments, setOtherComments] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        const feedbackData = {
            sy: sy,
            user_id: user?.id,
            guidance_id: pageProps?.guidance?.id,
            case_note_id: pageProps?.case_note?.id,
            ratings: [...feedbackForm],
            comments: otherComments,
        };
        const url = new URL(pathname("/api/post/feedback/submit"), window.location.origin);
        setSubmitting(true);
        $.post(url.toString(), feedbackData)
            .done(function ({ success, error }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error Submitting Feedback",
                    text: error,
                    confirmButtonText: "Close",
                });
            }
            else if (success) {
                Swal.fire({
                    icon: "success",
                    title: success,
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    setPage(0);
                });
            }
            setSubmitting(false);
        })
            .fail(function (_, statusText) {
            console.log("error: ", statusText);
            Swal.fire({
                icon: "error",
                title: "Error Submitting Feedback",
                text: "Error Submitting Feedback",
                confirmButtonText: "Close",
            });
            setSubmitting(false);
        });
    }, [feedbackForm, otherComments, sy, user, pageProps]);
    return (React.createElement("div", null,
        React.createElement("div", { className: "tw-bg-gray-200 tw-rounded-lg tw-px-4 tw-py-2" },
            React.createElement("div", { className: "tw-uppercase tw-tracking-wide tw-text-indigo-500 tw-font-semibold" },
                "Appointment Date: ",
                displayDate(pageProps?.schedule)),
            React.createElement("p", { className: "tw-block tw-mt-1 tw-leading-tight tw-font-medium tw-text-black" },
                "Time: ",
                displayTime(pageProps?.schedule)),
            React.createElement("p", { className: "tw-mt-2 tw-text-gray-500" },
                "Guidance Counselor: ",
                pageProps?.guidance?.first_name,
                " ",
                pageProps?.guidance?.middle_initial ? pageProps?.guidance?.middle_initial + ". " : "",
                pageProps?.guidance?.last_name)),
        React.createElement("div", { className: "row text-center" },
            React.createElement("div", { className: "col" },
                React.createElement("h4", { className: "mt-3 mb-3" }, "CLIENT'S COUNSELING FEEDBACK"))),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("p", null,
                "This form allows you an oppurnity to provide feedback to your counselor after your session/s have finished. This will help your counselor's professional development as well as helping to improve the service offered to others. ",
                React.createElement("strong", null, "YOU DO NOT need to identify yourself"),
                ". Please place a mark in the box which mostly closely corresponds how you feel about each statement"),
            React.createElement("div", { className: "container justify-content-center" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col" },
                        React.createElement("div", { className: "tw-mx-auto tw-max-w-fit" },
                            React.createElement("div", null,
                                React.createElement("b", null, "Rating Scale:")),
                            React.createElement("div", null, "4- Strongly Agree"),
                            React.createElement("div", null, "3- Somewhat Agree"),
                            React.createElement("div", null, "2- Somewhat Disagree"),
                            React.createElement("div", null, "1- Strongly Disagree"))))),
            React.createElement("div", { className: "row mt-4 justify-content-center tw-m-auto" },
                React.createElement("div", { className: "col table-responsive" },
                    React.createElement("table", { className: "table table-light align-middle" },
                        feedbackForm.map((feedbackCategory, ci) => (React.createElement(React.Fragment, { key: "feedbackcategory_" + ci },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("b", null,
                                        numberToLetter(ci),
                                        ". ",
                                        feedbackCategory.category_name)),
                                React.createElement("td", null, ci === 0 && React.createElement("b", null, "Rating"))),
                            feedbackCategory.items.map((feedbackItem, index) => (React.createElement("tr", { key: "feedbackitem_" + ci + "_" + index },
                                React.createElement("td", null,
                                    feedbackForm.filter((_, ii) => ii < ci).reduce((init, v) => init + v.items.length, 0) + (index + 1),
                                    ". ",
                                    feedbackItem.item),
                                React.createElement("td", null,
                                    feedbackItem.type === "number" && (React.createElement("div", { className: "select-wrapper tw-min-w-[150px]" },
                                        React.createElement("select", { className: "form-control", value: feedbackItem.rating, onChange: (e) => setFeedbackForm((prev) => {
                                                const newFeedbackCategory = [...prev];
                                                newFeedbackCategory[ci].items[index].rating = e.target.value;
                                                return newFeedbackCategory;
                                            }), required: true },
                                            React.createElement("option", { value: "", selected: true, disabled: true }, "Rate"),
                                            React.createElement("option", { value: "4" }, "4"),
                                            React.createElement("option", { value: "3" }, "3"),
                                            React.createElement("option", { value: "2" }, "2"),
                                            React.createElement("option", { value: "1" }, "1")))),
                                    feedbackItem.type === "string" && (React.createElement("div", { className: "select-wrapper tw-min-w-[150px]" },
                                        React.createElement("select", { className: "form-control", value: feedbackItem.rating, onChange: (e) => setFeedbackForm((prev) => {
                                                const newFeedbackCategory = [...prev];
                                                newFeedbackCategory[ci].items[index].rating = e.target.value;
                                                return newFeedbackCategory;
                                            }), required: true },
                                            React.createElement("option", { value: "", selected: true, disabled: true }, "Rate"),
                                            React.createElement("option", { value: "4" }, "Very Satisfied"),
                                            React.createElement("option", { value: "3" }, "Somewhat Satisfied"),
                                            React.createElement("option", { value: "2" }, "Somewhat Dissatisfied"),
                                            React.createElement("option", { value: "1" }, "Strongly Dissatisfied")))),
                                    feedbackItem.type === "boolean" && (React.createElement(React.Fragment, null,
                                        React.createElement("div", { className: "select-wrapper" },
                                            React.createElement("select", { className: "form-control", value: feedbackItem.rating ? "Yes" : "No", onChange: (e) => setFeedbackForm((prev) => {
                                                    const newFeedbackCategory = [...prev];
                                                    newFeedbackCategory[ci].items[index].rating = e.target.value === "Yes";
                                                    return newFeedbackCategory;
                                                }), required: true },
                                                React.createElement("option", { value: "Yes" }, "Yes"),
                                                React.createElement("option", { value: "No" }, "No")))))))))))),
                        React.createElement("tr", null,
                            React.createElement("th", { colSpan: 2 }, "D. Other Comments")),
                        React.createElement("tr", null,
                            React.createElement("td", { colSpan: 2, className: "tw-text-justify" },
                                React.createElement("p", null,
                                    "Please use the space below for any other comments you would like to bring to your counselor's attention. (If there are any matter which you specifically would not have wanted to discuss with your counselor in person your counselor would be especially glad to know of these). If you include your name in this section, it will be treated as\u00A0",
                                    React.createElement("strong", null, "CONFIDENTIAL"),
                                    "."),
                                React.createElement("br", null),
                                React.createElement("textarea", { className: "form-control", rows: 3, value: otherComments, onChange: (e) => setOtherComments(e.target.value) })))))),
            React.createElement("br", null),
            React.createElement("div", { className: "row text-center" },
                React.createElement("div", { className: "col" },
                    React.createElement("button", { type: "reset", className: "btn btn-primary", onClick: () => setPage(0) }, "Cancel")),
                React.createElement("div", { className: "col" },
                    React.createElement("button", { type: "submit", className: "btn btn-primary", disabled: submitting }, "Submit"))),
            React.createElement("br", null))));
}
function Schedules({ user, sy, setPage, setPageProps }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState({});
    const schedules = React.useMemo(() => [...(data?.called_in || []), ...(data?.walked_in || [])], [data]);
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
        });
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    const onGiveFeedback = React.useCallback((item) => {
        setPageProps({ ...item });
        setPage(1);
    }, [setPageProps, setPage]);
    return (React.createElement("div", { className: "tw-p-4" },
        React.createElement("h2", null, "Your Counseling Appointments"),
        React.createElement("div", { className: "tw-flex tw-flex-wrap tw-justify-evenly tw-gap-4" },
            schedules.length === 0 && (React.createElement("div", { className: "tw-text-xl tw-text-gray-400 tw-italic tw-text-center tw-w-full tw-mt-8" }, !isLoading ? React.createElement(React.Fragment, null, "No Appointments") : React.createElement(React.Fragment, null, "Loading..."))),
            !isLoading && schedules.length > 0 && schedules.map((ap, index) => (React.createElement("div", { key: `appointment_${index}`, className: clsx(!dateIsBeforeNow(ap?.schedule) ? "tw-bg-white" : (!ap.case_note ? "tw-bg-red-200" : "tw-bg-green-200"), "tw-max-w-md tw-mx-auto tw-rounded-xl tw-shadow-md tw-overflow-hidden md:tw-max-w-2xl tw-m-3") },
                React.createElement("div", { className: "md:tw-flex" },
                    React.createElement("div", { className: "tw-p-8" },
                        React.createElement("div", { className: "tw-uppercase tw-tracking-wide tw-text-indigo-500 tw-font-semibold" },
                            "Appointment Date: ",
                            displayDate(ap?.schedule)),
                        React.createElement("p", { className: "tw-block tw-mt-1 tw-leading-tight tw-font-medium tw-text-black" },
                            "Time: ",
                            displayTime(ap?.schedule)),
                        React.createElement("p", { className: "tw-mt-2 tw-text-gray-500" },
                            "Guidance Counselor: ",
                            ap?.guidance?.first_name,
                            " ",
                            ap?.guidance?.middle_initial ? ap?.guidance?.middle_initial + ". " : "",
                            ap?.guidance?.last_name),
                        React.createElement("button", { onClick: () => onGiveFeedback(ap), disabled: !ap.case_note || !!ap.feedback, className: "tw-mt-5 tw-ml-3 tw-px-4 tw-py-2 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-md tw-bg-blue-700 tw-text-white bg-red-600 hover:tw-bg-blue-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-red-500 disabled:tw-bg-blue-300" }, "Give Feedback")))))))));
}
function Main() {
    const [isLoading, setLoading] = React.useState(true);
    const pageData = usePageData(setLoading);
    const pages = React.useMemo(() => [Schedules, AddFeedbackPage], []);
    const [pageProps, setPageProps] = React.useState({});
    const [page, setPage] = React.useState(0);
    const CurrentPage = React.useMemo(() => pages[page], [pages, page]);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", { className: "container justify-content-center box tw-p-3" },
        React.createElement(CurrentPage, { setPage: setPage, setPageProps: setPageProps, pageProps: pageProps, ...pageData })));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(Main));
