// @ts-ignore
import { clsx, generateRandomHex, pathname, React, ReactDOM, Swal, usePageData } from "./imports.mjs";
const $pageRoot = $("#page-root");
const AlarmingCheckbox = ({ checked, onChange, title, id, disabled }) => {
    return (React.createElement("div", { className: "tw-flex tw-items-center" },
        React.createElement("input", { type: "checkbox", id: id + "_alarming_checkbox", className: "tw-peer tw-hidden disabled:tw-cursor-default", checked: checked, onChange: onChange, title: title, disabled: disabled }),
        React.createElement("label", { htmlFor: id + "_alarming_checkbox", className: clsx("tw-flex tw-items-center", disabled ? "" : "tw-cursor-pointer"), title: title },
            React.createElement("span", { className: 'tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-red-500 tw-text-lg' },
                checked && React.createElement("i", { className: "bx bxs-check-square" }),
                !checked && React.createElement("i", { className: "bx bx-checkbox" })))));
};
function ManageAssessmentPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { all_sy, current_sy, assessment_forms } = usePageData(setIsLoading);
    const currentSY = React.useMemo(() => Number.parseInt(current_sy), [current_sy]);
    const allSY = React.useMemo(() => all_sy, [all_sy]);
    const assessmentForms = React.useMemo(() => assessment_forms?.map((v) => ({ ...v, items: JSON.parse(v.items) })), [assessment_forms]);
    const isEditable = React.useMemo(() => allSY?.some((csy) => csy.year.toString() === currentSY?.toString() && csy.editable) || false, [allSY, currentSY]);
    const [changingSY, setChangingSy] = React.useState(false);
    const [selectedSY, setSelectedSy] = React.useState(0);
    const currentSelectedAssessmentForm = React.useMemo(() => {
        const af = assessmentForms?.filter((form) => form.schoolyear_id.toString() === selectedSY.toString());
        return af?.reduce((init, val) => [...init, { id: val.id, category: val.category_name, items: [...val.items].map((v) => ({ ...v })) }], []) || [];
    }, [selectedSY, assessmentForms]);
    React.useEffect(() => {
        if (!Number.isNaN(currentSY)) {
            setSelectedSy(allSY.reduce((init, val) => val.year.toString() === currentSY.toString() ? val.id : init, 0));
        }
    }, [currentSY]);
    const [editableAssessmentForm, setEditableAssessmentForm] = React.useState([]);
    const onSelectYear = React.useCallback((val) => {
        setSelectedSy(val);
        setChangingSy(false);
    }, []);
    React.useEffect(() => {
        if (isEditable) {
            setEditableAssessmentForm([...currentSelectedAssessmentForm].map((af) => ({ ...af, items: [...af.items].map((item) => ({ ...item })) })));
        }
    }, [isEditable, currentSelectedAssessmentForm]);
    const [addCategoryButtonDisabled, setAddCategoryButtonDisabled] = React.useState(false);
    const onAddCategory = React.useCallback(() => {
        const index = editableAssessmentForm.length;
        setEditableAssessmentForm([...editableAssessmentForm, { category: "", items: [] }]);
        setTimeout(() => {
            $(`input#category_input_${index}`).get(0)?.focus();
        }, 100);
    }, [editableAssessmentForm]);
    const [editingCategoryIndex, setEditingCategoryIndex] = React.useState(-1);
    const [editCategory, setEditCategory] = React.useState("");
    const onDeleteCategory = React.useCallback((index) => {
        const newEditableAssessmentForm = editableAssessmentForm.filter((_, i) => i !== index);
        setEditableAssessmentForm(newEditableAssessmentForm);
        setEditingCategoryIndex(-1);
        setEditCategory("");
        setAddCategoryButtonDisabled(false);
    }, [editableAssessmentForm]);
    const onCategoryInputChange = React.useCallback((index, target) => {
        const val = target.value;
        if (editableAssessmentForm[index].category === val)
            return;
        setEditingCategoryIndex(index);
        setEditCategory(val);
    }, [editableAssessmentForm]);
    const onCategoryInputBlur = React.useCallback((index) => {
        if (!editCategory)
            return setAddCategoryButtonDisabled(!editCategory && !editableAssessmentForm[index].category);
        const newEditableAssessmentForm = [...editableAssessmentForm];
        newEditableAssessmentForm[index].category = editCategory.toUpperCase().trim();
        setEditableAssessmentForm(newEditableAssessmentForm);
        setEditingCategoryIndex(-1);
        setEditCategory("");
        setAddCategoryButtonDisabled(false);
    }, [editableAssessmentForm, editCategory]);
    const onAddAssessmentItem = React.useCallback((index) => {
        const newEditableAssessmentForm = [...editableAssessmentForm];
        newEditableAssessmentForm[index].items.push({
            id: "item_" + generateRandomHex(),
            item: "",
            alarming: false,
        });
        setEditableAssessmentForm(newEditableAssessmentForm);
    }, [editableAssessmentForm]);
    const onDeleteItem = React.useCallback((id, index) => {
        const newEditableAssessmentForm = [...editableAssessmentForm];
        newEditableAssessmentForm[index].items = newEditableAssessmentForm[index].items.filter((item) => item.id.toString() !== id.toString());
        setEditableAssessmentForm(newEditableAssessmentForm);
    }, [editableAssessmentForm]);
    const onSetAlarmingItem = React.useCallback((id, index, target) => {
        const newEditableAssessmentForm = [...editableAssessmentForm];
        const itemIndex = newEditableAssessmentForm[index].items.reduce((i, v, ind) => v.id.toString() === id.toString() ? ind : i, -1);
        const checked = target.checked;
        newEditableAssessmentForm[index].items[itemIndex].alarming = checked;
        setEditableAssessmentForm(newEditableAssessmentForm);
    }, [editableAssessmentForm]);
    const [editingItemIndex, setEditingItemIndex] = React.useState([-1, -1]);
    const [editItem, setEditItem] = React.useState("");
    const onItemInputChange = React.useCallback((id, index, target) => {
        const val = target.value;
        if (editableAssessmentForm[index].items.find((v) => v.id.toString() === id.toString())?.item === val)
            return;
        setEditingItemIndex([index, id]);
        setEditItem(val);
    }, [editableAssessmentForm]);
    const onItemInputBlur = React.useCallback((id, index) => {
        if (!editItem)
            return;
        const newEditableAssessmentForm = [...editableAssessmentForm];
        const itemIndex = newEditableAssessmentForm[index].items.reduce((i, v, ind) => v.id.toString() === id.toString() ? ind : i, -1);
        newEditableAssessmentForm[index].items[itemIndex].item = editItem.trim();
        setEditableAssessmentForm(newEditableAssessmentForm);
        setEditingItemIndex([-1, -1]);
        setEditItem("");
    }, [editableAssessmentForm, editItem]);
    const savedDisabled = React.useMemo(() => editableAssessmentForm.length === 0 || (currentSelectedAssessmentForm.length === 0 && editableAssessmentForm.length === 0) || (JSON.stringify(currentSelectedAssessmentForm) === JSON.stringify(editableAssessmentForm)), [editableAssessmentForm, currentSelectedAssessmentForm]);
    const onSave = React.useCallback(() => {
        // Save assessment form to the server
        const data = editableAssessmentForm.map((af) => ({
            id: af.id,
            schoolyear_id: selectedSY,
            category_name: af.category,
            items: JSON.stringify(af.items)
        }));
        $.post(pathname('/api/post/assessmentform'), { data, sy: selectedSY })
            .done(function ({ success, error }) {
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error,
                });
            }
            else if (success) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Assessment form saved successfully.",
                }).then(() => {
                    window.location.reload();
                });
            }
        })
            .fail(function (jqXHR, textStatus) {
            Swal.fire({
                icon: "error",
                title: "Request failed: " + textStatus,
            });
        });
    }, [editableAssessmentForm, selectedSY]);
    const onOpenAssessmentForm = React.useCallback(() => {
        if (isEditable) {
            Swal.fire({
                icon: 'question',
                title: 'Open the Assessment Form to all students?',
                text: 'You cannot anymore edit after opening the form.',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, open',
                cancelButtonText: 'No, cancel',
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    const url = new URL(pathname('/api/post/assessmentform/open'), window.location.origin);
                    $.post(url.toString(), { sy: selectedSY })
                        .done(function ({ success, error }) {
                        if (success) {
                            Swal.fire({
                                icon: 'success',
                                title: "Assessment form opened successfully.",
                                timer: 2000,
                            }).then(() => window.location.reload());
                        }
                        else if (error) {
                            Swal.fire({
                                icon: 'error',
                                title: error,
                                text: 'Please try again later.',
                            });
                        }
                    })
                        .fail(function (_, statusText) {
                        Swal.fire({
                            icon: "error",
                            title: "Request failed: " + statusText,
                        });
                    });
                }
            });
        }
    }, [selectedSY, isEditable]);
    if (isLoading) {
        return React.createElement("div", { className: "tw-text-center tw-mt-5 tw-p-4 tw-shadow" }, "Loading...");
    }
    return (React.createElement("div", { className: "tw-container tw-mt-4" },
        React.createElement("div", { className: "tw-flex tw-justify-start tw-gap-x-4 tw-items-center" },
            React.createElement("h2", null, "Manage Assessment Form"),
            React.createElement("button", { type: "button", onClick: onOpenAssessmentForm, className: clsx("tw-px-2 tw-h-fit tw-rounded-lg tw-text-center tw-pointer-cursor", isEditable ? "tw-bg-yellow-200 tw-text-yellow-900 hover:tw-bg-yellow-300" : (currentSY?.toString() === allSY?.find((v) => v.id.toString() === selectedSY.toString())?.year?.toString() ? "tw-bg-green-300 tw-text-green-900 hover:tw-bg-green-400" : "tw-bg-gray-300 tw-text-gray-900 hover:tw-bg-gray-400")), disabled: !isEditable }, isEditable ? React.createElement(React.Fragment, null,
                "Still Closed ",
                React.createElement("i", { className: "bx bx-edit" })) : (currentSY?.toString() === allSY?.find((v) => v.id.toString() === selectedSY.toString())?.year?.toString() ? React.createElement(React.Fragment, null,
                "Opened ",
                React.createElement("i", { className: "bx bx-check" })) : "Closed"))),
        React.createElement("div", { className: "tw-flex tw-gap-x-2" },
            !changingSY && React.createElement("span", null,
                "A.Y. ",
                currentSY,
                " - ",
                currentSY + 1),
            changingSY && (React.createElement("select", { className: "form-select tw-max-w-[200px]", value: selectedSY, onChange: (e) => onSelectYear(e.target.value) }, all_sy?.map((csy) => React.createElement("option", { key: csy.id, value: csy.id },
                "A.Y. ",
                csy.year,
                " - ",
                Number.parseInt(csy.year.toString()) + 1)))),
            !changingSY && React.createElement("button", { type: "button", onClick: () => setChangingSy(true), className: "tw-inline-block tw-text-gray-500 hover:tw-text-gray-900 disabled:text-gray-200" },
                React.createElement("i", { className: "bx bx-edit" }))),
        isEditable && (React.createElement("div", { className: "tw-flex tw-justify-between tw-items-center" },
            React.createElement("button", { type: "button", className: "btn btn-primary tw-mt-2", onClick: onAddCategory, disabled: addCategoryButtonDisabled },
                React.createElement("i", { className: "bx bx-plus" }),
                "Add Category"),
            React.createElement("div", { className: "tw-text-center" },
                React.createElement("div", null,
                    "Total Items: ",
                    editableAssessmentForm.reduce((init, af) => af.items.length + init, 0)),
                React.createElement("div", null,
                    "Alarming Items: ",
                    editableAssessmentForm.reduce((init, af) => af.items.filter((v) => v.alarming).length + init, 0))),
            React.createElement("button", { type: "button", className: "btn btn-success tw-mt-2", onClick: onSave, disabled: savedDisabled },
                React.createElement("i", { className: "bx bx-check" }),
                "Save changes"))),
        !isEditable && (React.createElement("div", { className: "tw-text-center" },
            React.createElement("div", null,
                "Total Items: ",
                currentSelectedAssessmentForm.reduce((init, af) => af.items.length + init, 0)),
            React.createElement("div", null,
                "Alarming Items: ",
                currentSelectedAssessmentForm.reduce((init, af) => af.items.filter((v) => v.alarming).length + init, 0)))),
        React.createElement("hr", null),
        React.createElement("div", { className: "tw-w-full" },
            React.createElement("h4", { className: "tw-text-center tw-uppercase tw-mb-1" }, "SELF-ASSESSMENT QUESTIONNAIRE"),
            React.createElement("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-justify-start tw-items-start tw-gap-2" },
                (!isEditable && currentSelectedAssessmentForm.length === 0) || (isEditable && editableAssessmentForm.length === 0) && (React.createElement("div", { className: "tw-text-center tw-w-full tw-italic tw-mt-3 tw-p-4 tw-shadow" }, "Start adding assessment form questionare categories and items.")),
                !isEditable && currentSelectedAssessmentForm.map((item) => (React.createElement("div", { key: item.category, className: "tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600" },
                    React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200" },
                        React.createElement("div", { className: "tw-text-lg tw-font-bold tw-px-2 tw-py-1 tw-uppercase" }, item.category)),
                    React.createElement("div", { className: "tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right" }, item.items.map((it) => (React.createElement("div", { key: "assess_" + item.category + it.id, className: "tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm tw-text-gray-600" },
                        React.createElement("div", { className: "tw-flex tw-flex-shrink tw-items-center tw-text-right" },
                            React.createElement(AlarmingCheckbox, { id: it.id + item.category, checked: it.alarming, title: "Alarming Item?", disabled: true })),
                        React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-center" },
                            React.createElement("div", { className: "tw-px-2 tw-py-1 tw-w-[300px] tw-text-left" }, it.item))))))))),
                isEditable && editableAssessmentForm.map((item, i) => (React.createElement("div", { key: item.category, className: "tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600" },
                    React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200" },
                        React.createElement("button", { type: "button", className: "tw-p-2 tw-text-red-500", onClick: (e) => onDeleteCategory(i) },
                            React.createElement("i", { className: "bx bx-trash" })),
                        React.createElement("input", { type: "text", id: "category_input_" + i, className: "tw-bg-[var(--body-color)] tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase", placeholder: "Enter a category name", value: editingCategoryIndex !== i ? item.category : editCategory, onChange: (e) => onCategoryInputChange(i, e.target), onBlur: () => onCategoryInputBlur(i) })),
                    React.createElement("div", { className: "tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right" },
                        item.items.map((it) => (React.createElement("div", { key: "assess_" + item.category + it.id, className: "tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm tw-text-gray-600" },
                            React.createElement("div", { className: "tw-flex tw-flex-shrink tw-items-center tw-text-right" },
                                React.createElement("button", { type: "button", className: "tw-p-2 tw-text-red-500", onClick: (e) => onDeleteItem(it.id, i) },
                                    React.createElement("i", { className: "bx bx-trash" })),
                                React.createElement(AlarmingCheckbox, { id: it.id + item.category, checked: it.alarming, onChange: (e) => onSetAlarmingItem(it.id, i, e.target), title: "Alarming Item?" })),
                            React.createElement("div", { className: "tw-flex tw-flex-grow tw-items-center" },
                                React.createElement("input", { type: "text", id: "item_input_" + item.category + i + it.id, className: "tw-bg-[var(--body-color)] tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px]", placeholder: "Enter item", value: editingItemIndex[0] === i && editingItemIndex[1] === it.id ? editItem : it.item, onChange: (e) => onItemInputChange(it.id, i, e.target), onBlur: () => onItemInputBlur(it.id, i) }))))),
                        React.createElement("button", { type: "button", className: "tw-mt-2 disabled:tw-text-gray-200", onClick: () => onAddAssessmentItem(i), disabled: item.items.some((v) => v.item.length === 0) },
                            React.createElement("i", { className: "bx bx-plus" }),
                            "Add Assessment Item")))))))));
}
const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(ManageAssessmentPage));
