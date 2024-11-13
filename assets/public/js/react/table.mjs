// @ts-ignore
import { React, clsx } from "./imports.mjs";
// @ts-ignore
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, DeleteIcon, DownloadIcon, EditIcon, MagnifyingGlassIcon, SortIcon, ViewIcon } from "./icons.mjs";
export var TableCellType;
(function (TableCellType) {
    TableCellType["Number"] = "number";
    TableCellType["Date"] = "date";
    TableCellType["String"] = "string";
    TableCellType["Custom"] = "custom";
})(TableCellType || (TableCellType = {}));
export var CellAlign;
(function (CellAlign) {
    CellAlign["Left"] = "left";
    CellAlign["Center"] = "center";
    CellAlign["Right"] = "right";
})(CellAlign || (CellAlign = {}));
export var SortOrder;
(function (SortOrder) {
    SortOrder["Ascending"] = "asc";
    SortOrder["Descending"] = "desc";
})(SortOrder || (SortOrder = {}));
export function TableRowAction({ id, onView, onEdit, onDelete, onDownload }) {
    return (React.createElement("div", { className: "tw-grid tw-grid-cols-2 tw-gap-x-1 tw-max-w-[80px] tw-mx-auto tw-items-center" },
        onView && (React.createElement("button", { type: "button", className: "tw-p-1 tw-text-white hover:tw-text-green-500", title: "Preview", onClick: () => onView(id) },
            React.createElement(ViewIcon, null))),
        onEdit && (React.createElement("button", { type: "button", className: "tw-p-1 tw-text-sky-500 hover:tw-text-white", title: "Delete", onClick: () => onEdit(id) },
            React.createElement(EditIcon, null))),
        onDownload && (React.createElement("button", { type: "button", className: "tw-p-1 tw-text-white hover:tw-text-green-500", title: "Preview", onClick: () => onDownload(id) },
            React.createElement(DownloadIcon, null))),
        onDelete && (React.createElement("button", { type: "button", className: "tw-p-1 tw-text-red-500 hover:tw-text-red-300", title: "Delete", onClick: () => onDelete(id) },
            React.createElement(DeleteIcon, null)))));
}
const EntriesList = [5, 10, 25, 50, 100, 200, 500, 1000];
export function Table({ columns, items, search, children, defaultSortOrder, defaultSortColumn, onShowEntries = (entries) => { }, onSortColumn = (column) => { }, onSortOrder = (order) => { }, onSearch = (search) => { }, ...props }) {
    const [searchString, setSearch] = React.useState(search || "");
    const [showEntries, setShowEntries] = React.useState(5);
    const [sortColumn, setSortColumn] = React.useState(defaultSortColumn || (columns?.[0].sortable ? columns[0].key : ""));
    const [sortOrder, setSortOrder] = React.useState(defaultSortOrder || SortOrder.Ascending);
    const [page, setPage] = React.useState(items?.length > 0 ? 1 : 0);
    const [editPageNumber, setEditPageNumber] = React.useState(false);
    const finalItems = React.useMemo(() => {
        const sortedItems = ([...items]
            .slice(Math.max(Math.ceil((page - 1) * showEntries)), Math.max(showEntries, Math.ceil((page - 1) * showEntries) + showEntries))
            .sort((a, b) => {
            const col = columns.find((column) => column.key === sortColumn);
            if (col?.cellType === TableCellType.Number) {
                if (Number(a[sortColumn]) < Number(b[sortColumn])) {
                    return sortOrder === SortOrder.Ascending ? -1 : 1;
                }
                else if (Number(a[sortColumn]) > Number(b[sortColumn])) {
                    return sortOrder === SortOrder.Ascending ? 1 : -1;
                }
            }
            else if (col?.cellType === TableCellType.Date) {
                if ((new Date(a[sortColumn])).getTime() < (new Date(b[sortColumn])).getTime()) {
                    return sortOrder === SortOrder.Ascending ? -1 : 1;
                }
                else if ((new Date(a[sortColumn])).getTime() > (new Date(b[sortColumn])).getTime()) {
                    return sortOrder === SortOrder.Ascending ? 1 : -1;
                }
            }
            else if (col?.cellType === TableCellType.Custom && col.sortable && !!a[sortColumn]?.content && !!b[sortColumn]?.content) {
                if (a[sortColumn].value.toString().localeCompare(b[sortColumn].value) < 0) {
                    return sortOrder === SortOrder.Ascending ? -1 : 1;
                }
                else if (a[sortColumn].value.toString().localeCompare(b[sortColumn].value) > 0) {
                    return sortOrder === SortOrder.Ascending ? 1 : -1;
                }
            }
            else {
                if (a[sortColumn].toString().localeCompare(b[sortColumn]) < 0) {
                    return sortOrder === SortOrder.Ascending ? -1 : 1;
                }
                else if (a[sortColumn].toString().localeCompare(b[sortColumn]) > 0) {
                    return sortOrder === SortOrder.Ascending ? 1 : -1;
                }
            }
            return 0;
        }));
        if (page === 0 && sortedItems?.length > 0) {
            setPage(1);
        }
        if (!!searchString) {
            const result = sortedItems.filter((item) => Object.entries(item).some(([key, value]) => {
                const col = columns.find((column) => column.key === key);
                if (col?.cellType === TableCellType.Number || col?.cellType === TableCellType.String) {
                    return value.toString().toLowerCase().includes(searchString.toLowerCase());
                }
                else if (col?.cellType === TableCellType.Date) {
                    return new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toLowerCase().includes(searchString.toLowerCase());
                }
                else if (col?.cellType === TableCellType.Custom && col.sortable && !!value?.content) {
                    return value?.value.toString().toLowerCase().includes(searchString.toLowerCase()) || false;
                }
                return false;
            }));
            if (result?.length === 0) {
                setPage(0);
            }
            return result;
        }
        if (sortedItems?.length === 0) {
            setPage(0);
        }
        return sortedItems;
    }, [items, searchString, sortColumn, sortOrder, columns, page, showEntries]);
    const totalPages = React.useMemo(() => finalItems?.length > 0 ? Math.ceil(finalItems?.length / showEntries) : 0, [finalItems, showEntries]);
    React.useEffect(() => {
        onShowEntries && onShowEntries(showEntries);
    }, [showEntries]);
    React.useEffect(() => {
        onSortColumn && onSortColumn(sortColumn);
    }, [sortColumn]);
    React.useEffect(() => {
        onSortOrder && onSortOrder(sortOrder);
    }, [sortOrder]);
    React.useEffect(() => {
        if (search !== undefined) {
            setSearch(search);
            onSearch && onSearch(search);
        }
    }, [search]);
    const onSetSearch = React.useCallback((search) => {
        setSearch(search);
        onSearch && onSearch(search);
    }, [onSearch]);
    const toggleSort = React.useCallback((sortable, columnKey) => {
        if (sortable === true) {
            if (sortColumn === columnKey) {
                if (sortOrder === SortOrder.Ascending) {
                    setSortOrder(SortOrder.Descending);
                }
                else {
                    setSortOrder(SortOrder.Ascending);
                }
            }
            else {
                setSortColumn(columnKey);
                setSortOrder(SortOrder.Ascending);
            }
        }
    }, [sortOrder, sortColumn]);
    const onChangePage = React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!(page < totalPages && page > 0)) {
            setPage(totalPages > 0 ? 1 : 0);
        }
        setEditPageNumber(false);
    }, []);
    const onPageInputChange = React.useCallback((e) => Number(e.target.value) >= page && Number(e.target.value) <= totalPages && !Number.isNaN(Number.parseInt(e.target.value)) ? setPage(Number.parseInt(e.target.value)) : setPage(0), [page]);
    return (React.createElement("table", { className: "tw-w-full tw-h-full tw-border-collapse tw-bg-[#f0f7ff] tw-font-[500] tw-text-[14px] tw-leading-[17.07px]", ...props },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("td", { colSpan: columns?.length },
                    React.createElement("div", { className: "tw-flex tw-flex-row tw-justify-between tw-items-center tw-gap-x-2 tw-text-black tw-relative tw-bg-[#ffffff] tw-p-4 tw-w-full" },
                        React.createElement("div", { className: "tw-flex tw-flex-row tw-flex-nowrap tw-w-fit tw-max-w-fit tw-gap-x-2 tw-flex-shrink tw-px-4 tw-items-center" },
                            React.createElement("span", null, "Show"),
                            React.createElement("select", { className: "tw-bg-[#eceefb] tw-rounded-[8px] tw-text-[#2d3199] tw-p-1 tw-text-[12px]", value: showEntries, onChange: (e) => setShowEntries(Number.parseInt(e.target.value)), title: "Show Entries" }, EntriesList.map((option) => (React.createElement("option", { key: "entry_" + option, value: option }, option)))),
                            React.createElement("span", null, "entries")),
                        React.createElement("div", { className: "tw-flex tw-flex-nowrap tw-pr-4" },
                            React.createElement("button", { type: "button", onClick: () => setPage(totalPages > 0 ? 1 : 0), className: "hover:tw-text-yellow-500" },
                                React.createElement(ChevronDoubleLeftIcon, null)),
                            React.createElement("button", { type: "button", onClick: () => setPage(Math.max(totalPages > 0 ? 1 : 0, Math.min(totalPages, page - 1))), className: "hover:tw-text-yellow-500" },
                                React.createElement(ChevronLeftIcon, null)),
                            !editPageNumber && React.createElement("button", { type: "button", onClick: () => setEditPageNumber(true), className: "tw-px-2 tw-text-yellow-900" },
                                "Page ",
                                page,
                                " / ",
                                totalPages),
                            editPageNumber && React.createElement("div", { className: "tw-px-2 tw-text-yellow-700 tw-flex flex-nowrap tw-items-center" },
                                "Page ",
                                React.createElement("form", { onSubmit: onChangePage, className: "tw-flex tw-items-end tw-h-full" },
                                    React.createElement("input", { type: "number", name: "page", onChange: onPageInputChange, onBlur: (e) => { onPageInputChange(e); setEditPageNumber(false); }, className: "tw-max-w-[50px] tw-outline-none tw-text-center tw-rounded tw-bg-white tw-text-black tw-mx-1 tw-hide-spinner placeholder:tw-text-gray-500", min: totalPages > 0 ? 1 : 0, max: totalPages, placeholder: page }),
                                    React.createElement("button", { type: "submit", className: "tw-hidden" }, "Change")),
                                " / ",
                                totalPages),
                            React.createElement("button", { type: "button", onClick: () => setPage(Math.max(totalPages > 0 ? 1 : 0, Math.min(totalPages, page + 1))), className: "hover:tw-text-yellow-500" },
                                React.createElement(ChevronRightIcon, null)),
                            React.createElement("button", { type: "button", onClick: () => setPage(totalPages), className: "hover:tw-text-yellow-500" },
                                React.createElement(ChevronDoubleRightIcon, null))),
                        React.createElement("div", { className: "tw-flex-grow" },
                            React.createElement("div", { className: "tw-relative" },
                                React.createElement("label", { className: "tw-absolute tw-left-1 tw-top-0 tw-h-full tw-aspect-square tw-flex tw-items-center tw-justify-center tw-text-[18px]" },
                                    React.createElement(MagnifyingGlassIcon, null)),
                                React.createElement("input", { type: "search", placeholder: "Search...", value: searchString, onChange: (e) => onSetSearch(e.target.value), className: "tw-text-black tw-outline-none tw-border tw-border-gray-500 tw-pl-10 tw-pr-2 tw-py-1.5 tw-rounded placeholder:tw-text-gray-300 tw-bg-[#ffffff] tw-w-full tw-h-full" }))),
                        children))),
            React.createElement("tr", { className: "tw-bg-sky-100 tw-h-[50px]" }, columns.map((column) => (React.createElement("th", { key: column.key, className: clsx("tw-text-gray-900 tw-text-xs tw-px-6 tw-py-2", column.sortable ? "tw-cursor-pointer tw-relative hover:tw-bg-sky-300" : ""), onClick: () => toggleSort(column.sortable, column.key) },
                column.label,
                column.sortable && React.createElement("div", { className: "tw-absolute tw-right-1 tw-top-0 tw-h-full tw-w-fit tw-flex tw-justify-end tw-items-center" },
                    React.createElement(SortIcon, { className: clsx(column.key === sortColumn ? sortOrder === SortOrder.Ascending ? "tw-rotate-[180deg]" : "" : "tw-opacity-20 hover:tw-opacity-50") }))))))),
        React.createElement("tbody", null,
            finalItems.map((row, index) => (React.createElement("tr", { key: "rowtable_" + index, className: "tw-h-[65px]" }, columns.map((column) => (React.createElement("td", { key: column.key, className: `tw-text-black tw-text-xs tw-px-4 tw-py-2 ${column.align === CellAlign.Center ? "tw-text-center" : column.align === CellAlign.Right ? "tw-text-right" : "tw-text-left"}` },
                column.cellType === TableCellType.Number && Number.parseFloat(row[column.key]),
                column.cellType === TableCellType.Date && new Date(row[column.key]).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                column.cellType === TableCellType.Custom && typeof row[column.key] === "object" && column.sortable && !!row[column.key].value && React.createElement(React.Fragment, null, row[column.key]?.content),
                column.cellType === TableCellType.Custom && typeof row[column.key] === "object" && !column.sortable && !!row[column.key]?.content && React.createElement(React.Fragment, null, row[column.key]?.content),
                column.cellType === TableCellType.Custom && typeof row[column.key] === "object" && !column.sortable && !row[column.key]?.content && React.createElement(React.Fragment, null, row[column.key]),
                column.cellType === TableCellType.String && typeof row[column.key] === "string" && row[column.key].toString())))))),
            finalItems?.length === 0 && (React.createElement("tr", { className: "tw-h-[65px]" },
                React.createElement("td", { className: "tw-text-gray-600 tw-text-center", colSpan: columns?.length }, "NOTHING TO SHOW HERE"))))));
}
