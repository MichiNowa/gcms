// @ts-ignore
import { pathname, React, ReactDOM, Swal, usePageData } from "./imports.mjs";
// @ts-ignore
import { CellAlign, Table, TableCellType } from "./table.mjs";
// @ts-ignore
import { AddIcon, EditIcon } from "./icons.mjs";
const $pageRoot = $("#page-root");
const columns = [
    { label: "Photo", key: "profile_pic", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
    { label: "Admin ID", key: "username", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "First Name", key: "first_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Middle Initial", key: "middle_initial", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Last Name", key: "last_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Gender", key: "gender", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Email Address", key: "email", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
    { label: "Status", key: "status", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
    { label: "Created Date", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
    { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];
function AllAdminPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { admins } = usePageData(setIsLoading);
    const onSetActive = React.useCallback((row) => {
        Swal.fire({
            icon: "question",
            title: "Set Active?",
            text: "Are you sure you want to set this admin account as active?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, set active",
            cancelButtonText: "No, cancel",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                $.post(pathname("/api/set/admin/active"), { id: row.id })
                    .done(function ({ error, success }) {
                    if (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error,
                            footer: 'Please try again later.'
                        });
                    }
                    else if (success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Admin account set as active successfully.",
                        });
                        window.location.reload();
                    }
                })
                    .fail(function (e, statusText) {
                    console.log(e, statusText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: statusText,
                        footer: 'Please try again later.'
                    });
                });
            }
        });
    }, []);
    const onSetInactive = React.useCallback((row) => {
        Swal.fire({
            icon: "question",
            title: "Set Inactive?",
            text: "Are you sure you want to set this admin account as inactive?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, set inactive",
            cancelButtonText: "No, cancel",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                $.post(pathname("/api/set/admin/inactive"), { id: row.id })
                    .done(function ({ error, success }) {
                    if (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error,
                            footer: 'Please try again later.'
                        });
                    }
                    else if (success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Admin account set as inactive successfully.",
                        });
                        window.location.reload();
                    }
                })
                    .fail(function (e, statusText) {
                    console.log(e, statusText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: statusText,
                        footer: 'Please try again later.'
                    });
                });
            }
        });
    }, []);
    const onEditAccount = React.useCallback((row) => {
        Object.keys(row).forEach(key => {
            $('#edit-admin-form').find('#edit_' + key).val(row[key]);
        });
    }, []);
    const items = React.useMemo(() => admins?.map((admin) => ({
        id: admin.id,
        profile_pic: {
            value: admin.profile_pic || 'none',
            content: React.createElement("img", { src: new URL(pathname("/" + admin.profile_pic || '/images/default-user.png')).toString(), alt: "Profile Pic", width: "30", height: "30", className: "tw-mx-auto tw-w-[30px] tw-h-[30px]" })
        },
        username: admin.username,
        first_name: admin.first_name,
        middle_initial: admin.middle_initial,
        last_name: admin.last_name,
        gender: admin.gender,
        email: admin.email,
        status: {
            value: !admin.status ? 'inactive' : 'active',
            content: !admin.status
                ? React.createElement("div", null,
                    React.createElement("button", { type: "button", onClick: () => onSetActive(admin), className: "tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-red-500 hover:tw-bg-red-200" }, "Inactive"))
                : React.createElement("div", null,
                    React.createElement("button", { type: "button", onClick: () => onSetInactive(admin), className: "tw-px-3 tw-py-2 tw-rounded-full tw-shadow tw-bg-green-500 hover:tw-bg-green-200" }, "Active")),
        },
        created_at: admin.created_at,
        action: React.createElement("button", { type: "button", onClick: () => onEditAccount(admin), "data-bs-toggle": "modal", "data-bs-target": "#edit-admin-account-modal" },
            React.createElement(EditIcon, { className: "tw-inline tw-size-4" }),
            React.createElement("span", { className: "tw-inline tw-ml-1" }, "Edit")),
    })) || [], [admins]);
    React.useEffect(() => {
        $("#add-admin-form").on("submit", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = new FormData(this);
            const body = {
                ...Object.fromEntries(formData),
                role: 'admin'
            };
            $.post(pathname("/api/post/add/admin"), body)
                .done(function ({ success, error }) {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error,
                        footer: 'Please try again later.'
                    });
                }
                else if (success) {
                    $("#add-admin-account-modal").trigger("reset");
                    Swal.fire({
                        icon: 'success',
                        title: 'Admin Account Added!',
                        text: 'Successfully added new admin account.',
                    });
                    setTimeout(() => window.location.reload(), 500);
                }
            })
                .fail(function (e, statusText) {
                console.log(`Error:`, e);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: statusText,
                    footer: 'Please try again later.'
                });
            });
        });
        $("#edit-admin-form").on("submit", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const formData = new FormData(this);
            const body = {
                ...Object.fromEntries(formData),
                role: 'admin'
            };
            $.post(pathname("/api/post/edit/admin"), body)
                .done(function ({ success, error }) {
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error,
                        footer: 'Please try again later.'
                    });
                }
                else if (success) {
                    $("#edit-admin-account-modal").trigger("reset");
                    Swal.fire({
                        icon: 'success',
                        title: 'Admin Account Updated!',
                        text: 'Successfully updated admin account.',
                    });
                    setTimeout(() => window.location.reload(), 500);
                }
            })
                .fail(function (e, statusText) {
                console.log(`Error:`, e);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: statusText,
                    footer: 'Please try again later.'
                });
            });
        });
    }, []);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", { className: "tw-container tw-mt-4" },
        React.createElement("h2", null, "Admin Accounts"),
        React.createElement("p", null, "Manage all admin accounts."),
        React.createElement(Table, { columns: columns, items: items },
            React.createElement("div", null,
                React.createElement("button", { type: "button", className: "btn btn-primary", "data-bs-toggle": "modal", "data-bs-target": "#add-admin-account-modal" },
                    React.createElement(AddIcon, { className: "tw-inline" }),
                    React.createElement("span", { className: "tw-ml-1 tw-inline" }, "Add New"))))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(AllAdminPage));
