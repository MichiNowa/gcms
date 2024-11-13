// @ts-ignore
import { clsx, pathname, React, ReactDOM, Swal } from "./imports.mjs";

const $pageRoot = $("#page-root");

interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  href: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

interface NotificationList {
  [date: string]: Notification[]
}

function displayDate(dstr?: string)
{
  if (!dstr) return "INVALID DATE";
  const d = new Date(dstr);
  const today = new Date();
  if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
    return "TODAY"
  } else if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() + 1 === today.getDate()) {
    return "YESTERDAY"
  }
  return d.toLocaleDateString('en-PH', { month: "long", day: "numeric", year: "numeric" });
}

function NotificationPage() {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [notifications, setNotifications] = React.useState([]);

  const fetchNotifications = () => {
    const url = new URL(pathname('/api/get/notifications'), window.location.origin);
    $.get(url.toString())
      .done(function ({ data, error }) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error Fetching Notifications",
            text: error,
            confirmButtonText: "Close",
            timer: 3000,
            showConfirmButton: false,
          });
        } else {
          setNotifications(data);
        }
        setLoading(false);
      })
      .fail(function (_, statusText) {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Notifications",
          text: statusText,
          confirmButtonText: "Close",
          timer: 3000,
          showConfirmButton: false,
        });
        setLoading(false);
      })
  }

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const notificationData = React.useMemo(() => {
    if (!notifications) return {};
    const notifs = [...notifications];
    notifs.sort((a: Notification, b: Notification) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      // arrange by date from today to yesterday and beyond
      return bDate.getTime() - aDate.getTime();
    })
    return notifs.reduce((init: NotificationList, notif: Notification) => {
      const date = notif.created_at.split(" ")[0];
      if (!init[date]) {
        init[date] = [];
      }
      init[date].push(notif);
      return init;
    }, {})
  }, [notifications]);

  const notificationDates = React.useMemo(() => {
    const keys = Object.keys(notificationData);
    keys.sort((a: string, b: string) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      // arrange by date from today to yesterday and beyond
      return bDate.getTime() - aDate.getTime();
    })
    return keys;
  }, [notificationData]);

  const handleNotificationLink = React.useCallback((id: number|string, href: string, read: boolean) => {
    if (!read) {
      const url = new URL(pathname("/api/post/notification/read"), window.location.origin);
      $.post(url.toString(), { id })
        .done(function({ error }: any) {
          if (error) {
            console.log("Error: ", error);
          }
          window.location.href = pathname(href);
        })
        .fail(function (_: any, statusText: any) {
          console.log("ERROR:", statusText)
          window.location.href = pathname(href);
        });
    } else {
      window.location.href = pathname(href);
    }
  });

  return (
    <div className="tw-w-full tw-h-full">
      <div className="tw-bg-gray-50 tw-p-8">
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="focus:tw-outline-none tw-text-2xl tw-font-semibold tw-leading-6 tw-text-gray-800">Notifications</p>
        </div>
        {isLoading && (
          <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-center">
            <div className="tw-text-gray-600">Loading notifications...</div>
          </div>
        )}
        {!isLoading && notificationDates.length === 0 && (
          <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-center">
            <div className="tw-text-gray-600">No notifications.</div>
          </div>
        )}
        {!isLoading && notificationDates.map((d: string) => (
          <React.Fragment key={d}>
            <div className="focus:tw-outline-none tw-mt-2 tw-font-semibold tw-text-sm tw-leading-normal tw-pt-8 tw-border-b tw-pb-2 tw-border-gray-300 tw-text-gray-600">{displayDate(d)}</div>
            {notificationData[d]?.map((notif: Notification, index: number) => (
              <button onClick={() => handleNotificationLink(notif.id, notif.href, notif.is_read)} key={"notif_" + index + "_" + notif.id} type="button" className={clsx("tw-w-full tw-p-3 tw-mt-8 tw-rounded tw-flex tw-shadow", notif.is_read ? "tw-bg-white" : "tw-bg-blue-100")}>
                <div className="tw-pl-3">
                  <p className="focus:tw-outline-none tw-text-sm tw-leading-none tw-text-left">{notif.title}</p>
                  <p className="focus:tw-outline-none tw-text-xs tw-leading-3 tw-pt-1 tw-text-gray-500 tw-text-justify" dangerouslySetInnerHTML={{ __html: notif.message}}></p>
                </div>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(NotificationPage));