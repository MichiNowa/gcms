// @ts-ignore
import { clsx, generateRandomHex, pathname, React, ReactDOM, Swal, usePageData } from "./imports.mjs";

const $pageRoot = $("#page-root");

interface SchoolYear {
  id: number;
  year: number;
  editable: boolean;
  created_at: string;
  updated_at: string;
}


interface AssessmentFormItem {
  id: string
  item: string
  alarming: boolean
}

interface AssessmentForm {
  id?: number
  schoolyear_id: number
  category_name: string
  items: AssessmentFormItem[]
  created_at?: string
  updated_at?: string
}

interface CategoriesItems {
  id?: string|number
  category: string
  items: AssessmentFormItem[]
}

const AlarmingCheckbox = ({
  checked,
  onChange,
  title,
  id,
  disabled
}: {
  checked: boolean,
  onChange?: (e?: any) => void,
  title: string,
  id: string,
  disabled?: boolean
}) => {

  return (
    <div className="tw-flex tw-items-center">
      <input
        type="checkbox"
        id={id + "_alarming_checkbox"}
        className="tw-peer tw-hidden disabled:tw-cursor-default"
        checked={checked}
        onChange={onChange}
        title={title}
        disabled={disabled}
      />
      <label htmlFor={id + "_alarming_checkbox"} className={clsx("tw-flex tw-items-center", disabled ? "" : "tw-cursor-pointer")} title={title}>
        <span
          className={'tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-text-red-500 tw-text-lg'}
        >
          {checked && <i className="bx bxs-check-square"></i>}
          {!checked && <i className="bx bx-checkbox"></i>}
        </span>
      </label>
    </div>
  );
};

function ManageAssessmentPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { all_sy, current_sy, assessment_forms } = usePageData(setIsLoading);
  const currentSY = React.useMemo<number>(() => Number.parseInt(current_sy), [current_sy]);
  const allSY = React.useMemo<SchoolYear[]|undefined>(() => all_sy, [all_sy]);
  const assessmentForms = React.useMemo<AssessmentForm[]|undefined>(() => assessment_forms?.map((v: any) => ({...v, items: JSON.parse(v.items)})), [assessment_forms]);
  const isEditable = React.useMemo(() => allSY?.some((csy: SchoolYear) => csy.year.toString() === currentSY?.toString() && csy.editable) || false, [allSY, currentSY]);
  const [changingSY, setChangingSy] = React.useState<boolean>(false);
  const [selectedSY, setSelectedSy] = React.useState<string|number>(0);
  const currentSelectedAssessmentForm = React.useMemo(() => {
    const af: AssessmentForm[] = assessmentForms?.filter((form: AssessmentForm) => form.schoolyear_id.toString() === selectedSY.toString());
    return af?.reduce((init: CategoriesItems[], val: AssessmentForm) => [...init, { id: val.id, category: val.category_name, items: [...val.items].map((v: AssessmentFormItem) => ({...v})) }], []) || [];
  }, [selectedSY, assessmentForms]);

  React.useEffect(() => {
    if (!Number.isNaN(currentSY)) {
      setSelectedSy(allSY.reduce((init: number|string, val: SchoolYear) => val.year.toString() === currentSY.toString() ? val.id : init, 0));
    }
  }, [currentSY]);


  const [editableAssessmentForm, setEditableAssessmentForm] = React.useState([]);

  const onSelectYear = React.useCallback((val: string) => {
    setSelectedSy(val);
    setChangingSy(false);
  }, []);

  React.useEffect(() => {
    if (isEditable) {
      setEditableAssessmentForm([...currentSelectedAssessmentForm].map((af: CategoriesItems) => ({...af, items: [...af.items].map((item: AssessmentFormItem) => ({...item})) })));
    }
  }, [isEditable, currentSelectedAssessmentForm])

  const [addCategoryButtonDisabled, setAddCategoryButtonDisabled] = React.useState<boolean>(false);

  const onAddCategory = React.useCallback(() => {
    const index = editableAssessmentForm.length;
    setEditableAssessmentForm([...editableAssessmentForm, { category: "", items: []}])
    setTimeout(() => {
      $(`input#category_input_${index}`).get(0)?.focus();
    }, 100)
  }, [editableAssessmentForm])

  const [editingCategoryIndex, setEditingCategoryIndex] = React.useState<number>(-1)
  const [editCategory, setEditCategory] = React.useState("");

  const onDeleteCategory = React.useCallback((index: number) => {
    const newEditableAssessmentForm = editableAssessmentForm.filter((_: any, i: number) => i !== index);

    setEditableAssessmentForm(newEditableAssessmentForm);
    setEditingCategoryIndex(-1);
    setEditCategory("");
    setAddCategoryButtonDisabled(false);
  }, [editableAssessmentForm])

  const onCategoryInputChange = React.useCallback((index: number, target: HTMLInputElement) => {
    const val = target.value;
    if (editableAssessmentForm[index].category === val) return;
    setEditingCategoryIndex(index);
    setEditCategory(val);
  }, [editableAssessmentForm])

  const onCategoryInputBlur = React.useCallback((index: number) => {
    if (!editCategory) return setAddCategoryButtonDisabled(!editCategory && !editableAssessmentForm[index].category);
    const newEditableAssessmentForm = [...editableAssessmentForm];
    newEditableAssessmentForm[index].category = editCategory.toUpperCase().trim();
    setEditableAssessmentForm(newEditableAssessmentForm);
    setEditingCategoryIndex(-1);
    setEditCategory("");
    setAddCategoryButtonDisabled(false);
  }, [editableAssessmentForm, editCategory]);

  const onAddAssessmentItem = React.useCallback((index: number) => {
    const newEditableAssessmentForm = [...editableAssessmentForm];
    newEditableAssessmentForm[index].items.push({
      id: "item_" + generateRandomHex(),
      item: "",
      alarming: false,
    });
    setEditableAssessmentForm(newEditableAssessmentForm);
  }, [editableAssessmentForm])

  const onDeleteItem = React.useCallback((id: string|number, index: number) => {
    const newEditableAssessmentForm = [...editableAssessmentForm];
    newEditableAssessmentForm[index].items = newEditableAssessmentForm[index].items.filter((item: AssessmentFormItem) => item.id.toString() !== id.toString());
    setEditableAssessmentForm(newEditableAssessmentForm);
  }, [editableAssessmentForm]);

  const onSetAlarmingItem = React.useCallback((id: string|number, index: number, target: HTMLInputElement) => {
    const newEditableAssessmentForm = [...editableAssessmentForm];
    const itemIndex = newEditableAssessmentForm[index].items.reduce((i: number, v: AssessmentFormItem, ind: number) => v.id.toString() === id.toString() ? ind : i, -1)
    const checked: boolean = target.checked as boolean;
    newEditableAssessmentForm[index].items[itemIndex].alarming = checked;
    setEditableAssessmentForm(newEditableAssessmentForm);
  }, [editableAssessmentForm]);

  const [editingItemIndex, setEditingItemIndex] = React.useState<any[]>([-1, -1]);
  const [editItem, setEditItem] = React.useState<string>("");

  const onItemInputChange = React.useCallback((id: string|number, index: number, target: HTMLInputElement) => {
    const val = target.value;
    if (editableAssessmentForm[index].items.find((v: AssessmentFormItem) => v.id.toString() === id.toString())?.item === val) return;
    setEditingItemIndex([index, id]);
    setEditItem(val);
  }, [editableAssessmentForm]);


  const onItemInputBlur = React.useCallback((id: string|number, index: number) => {
    if (!editItem) return;
    const newEditableAssessmentForm = [...editableAssessmentForm];
    const itemIndex = newEditableAssessmentForm[index].items.reduce((i: number, v: AssessmentFormItem, ind: number) => v.id.toString() === id.toString() ? ind : i, -1);
    newEditableAssessmentForm[index].items[itemIndex].item = editItem.trim();
    setEditableAssessmentForm(newEditableAssessmentForm);
    setEditingItemIndex([-1, -1]);
    setEditItem("");
  }, [editableAssessmentForm, editItem]);

  const savedDisabled = React.useMemo(() => editableAssessmentForm.length === 0 || (currentSelectedAssessmentForm.length === 0 && editableAssessmentForm.length === 0) || (JSON.stringify(currentSelectedAssessmentForm) === JSON.stringify(editableAssessmentForm)), [editableAssessmentForm, currentSelectedAssessmentForm])

  const onSave = React.useCallback(() => {
    // Save assessment form to the server
    const data: AssessmentForm[] = editableAssessmentForm.map((af: CategoriesItems) => ({
      id: af.id,
      schoolyear_id: selectedSY,
      category_name: af.category,
      items: JSON.stringify(af.items)
    }))
    $.post(pathname('/api/post/assessmentform'), { data, sy: selectedSY })
      .done(function ({ success, error }:any) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
          })
        } else if (success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Assessment form saved successfully.",
          }).then(() => {
            window.location.reload();
          })
        }
      })
      .fail(function (jqXHR: any, textStatus:any) {
        Swal.fire({
          icon: "error",
          title: "Request failed: " + textStatus,
        })
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
      }).then(({ isConfirmed }: any) => {
        if (isConfirmed) {
          const url = new URL(pathname('/api/post/assessmentform/open'), window.location.origin);
          $.post(url.toString(), { sy: selectedSY })
            .done(function ({ success, error }: any) {
              if (success) {
                Swal.fire({
                  icon: 'success',
                  title: "Assessment form opened successfully.",
                  timer: 2000,
                }).then(() => window.location.reload());
              } else if (error) {
                Swal.fire({
                  icon: 'error',
                  title: error,
                  text: 'Please try again later.',
                })
              }
            })
            .fail(function (_: any, statusText: any) {
              Swal.fire({
                icon: "error",
                title: "Request failed: " + statusText,
              })
            })
        }
      })
    }
  }, [selectedSY, isEditable]);

  if (isLoading) {
    return <div className="tw-text-center tw-mt-5 tw-p-4 tw-shadow">Loading...</div>
  }

  return (
    <div className="tw-container tw-mt-4">
      <div className="tw-flex tw-justify-start tw-gap-x-4 tw-items-center">
        <h2>Manage Assessment Form</h2>
        <button type="button" onClick={onOpenAssessmentForm} className={clsx("tw-px-2 tw-h-fit tw-rounded-lg tw-text-center tw-pointer-cursor", isEditable ? "tw-bg-yellow-200 tw-text-yellow-900 hover:tw-bg-yellow-300" : (currentSY?.toString() === allSY?.find((v: SchoolYear) => v.id.toString() === selectedSY.toString())?.year?.toString() ? "tw-bg-green-300 tw-text-green-900 hover:tw-bg-green-400" : "tw-bg-gray-300 tw-text-gray-900 hover:tw-bg-gray-400"))} disabled={!isEditable}>
          {isEditable ? <>Still Closed <i className="bx bx-edit"></i></> : (currentSY?.toString() === allSY?.find((v: SchoolYear) => v.id.toString() === selectedSY.toString())?.year?.toString() ? <>Opened <i className="bx bx-check"></i></> : "Closed")}
        </button>
      </div>
      <div className="tw-flex tw-gap-x-2">
        {!changingSY && <span>A.Y. {currentSY} - {currentSY + 1}</span>}
        {changingSY && (<select className="form-select tw-max-w-[200px]" value={selectedSY} onChange={(e: any) => onSelectYear(e.target.value)}>
          {all_sy?.map((csy: SchoolYear) => <option key={csy.id} value={csy.id}>A.Y. {csy.year} - {Number.parseInt(csy.year.toString()) + 1}</option>)}
        </select>)}
        {!changingSY && <button type="button" onClick={() => setChangingSy(true)} className="tw-inline-block tw-text-gray-500 hover:tw-text-gray-900 disabled:text-gray-200"><i className={"bx bx-edit"}></i></button>}
      </div>
      {isEditable && (
        <div className="tw-flex tw-justify-between tw-items-center">
          <button type="button" className="btn btn-primary tw-mt-2" onClick={onAddCategory} disabled={addCategoryButtonDisabled}><i className="bx bx-plus"></i>Add Category</button>
          <div className="tw-text-center">
            <div>Total Items: {editableAssessmentForm.reduce((init: number, af: CategoriesItems) => af.items.length + init, 0)}</div>
            <div>Alarming Items: {editableAssessmentForm.reduce((init: number, af: CategoriesItems) => af.items.filter((v: AssessmentFormItem) => v.alarming).length + init, 0)}</div>
          </div>
          <button type="button" className="btn btn-success tw-mt-2" onClick={onSave} disabled={savedDisabled}><i className="bx bx-check"></i>Save changes</button>
        </div>
      )}
      {!isEditable && (
        <div className="tw-text-center">
          <div>Total Items: {currentSelectedAssessmentForm.reduce((init: number, af: CategoriesItems) => af.items.length + init, 0)}</div>
          <div>Alarming Items: {currentSelectedAssessmentForm.reduce((init: number, af: CategoriesItems) => af.items.filter((v: AssessmentFormItem) => v.alarming).length + init, 0)}</div>
        </div>
      )}
      <hr />
      <div className="tw-w-full">
        <h4 className="tw-text-center tw-uppercase tw-mb-1">SELF-ASSESSMENT QUESTIONNAIRE</h4>
        <div className="tw-mt-2 tw-flex tw-flex-wrap tw-justify-start tw-items-start tw-gap-2">
          {(!isEditable && currentSelectedAssessmentForm.length === 0) || (isEditable && editableAssessmentForm.length === 0) && (
            <div className="tw-text-center tw-w-full tw-italic tw-mt-3 tw-p-4 tw-shadow">
              Start adding assessment form questionare categories and items.
            </div>
          )}
          {!isEditable && currentSelectedAssessmentForm.map((item: CategoriesItems) => (
            <div key={item.category} className="tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600">
              <div className="tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200">
                <div
                  className="tw-text-lg tw-font-bold tw-px-2 tw-py-1 tw-uppercase"
                >
                  {item.category}
                </div>
              </div>
              <div className="tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right">
                {item.items.map((it: AssessmentFormItem) => (
                  <div key={"assess_" + item.category + it.id} className="tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm tw-text-gray-600">
                    <div className="tw-flex tw-flex-shrink tw-items-center tw-text-right">
                      <AlarmingCheckbox id={it.id + item.category} checked={it.alarming}  title="Alarming Item?" disabled />
                    </div>
                    <div className="tw-flex tw-flex-grow tw-items-center">
                      <div
                        className="tw-px-2 tw-py-1 tw-w-[300px] tw-text-left"
                      >
                        {it.item}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {isEditable && editableAssessmentForm.map((item: CategoriesItems, i: number) => (
            <div key={item.category} className="tw-flex tw-flex-col tw-flex-nowrap tw-gap-x-2 tw-p-2 tw-text-sm tw-text-gray-600">
              <div className="tw-flex tw-flex-grow tw-items-center tw-border-b-2 tw-border-gray-200">
                <button type="button" className="tw-p-2 tw-text-red-500" onClick={(e) => onDeleteCategory(i)}><i className="bx bx-trash"></i></button>
                <input
                  type="text"
                  id={"category_input_" + i}
                  className="tw-bg-[var(--body-color)] tw-text-lg tw-font-bold tw-px-2 tw-py-1 focus:tw-italic tw-uppercase"
                  placeholder="Enter a category name"
                  value={editingCategoryIndex !== i ? item.category : editCategory}
                  onChange={(e) => onCategoryInputChange(i, e.target)}
                  onBlur={() => onCategoryInputBlur(i)}
                />
              </div>
              <div className="tw-flex tw-flex-col tw-flex-shrink tw-items-center tw-text-right">
                {item.items.map((it: AssessmentFormItem) => (
                  <div key={"assess_" + item.category + it.id} className="tw-flex tw-flex-row tw-gap-x-2 tw-border-b-2 tw-border-gray-200 tw-p-2 tw-text-sm tw-text-gray-600">
                    <div className="tw-flex tw-flex-shrink tw-items-center tw-text-right">
                      <button type="button" className="tw-p-2 tw-text-red-500" onClick={(e) => onDeleteItem(it.id, i)}><i className="bx bx-trash"></i></button>
                      <AlarmingCheckbox id={it.id + item.category} checked={it.alarming} onChange={(e) => onSetAlarmingItem(it.id, i, e.target)}  title="Alarming Item?" />
                    </div>
                    <div className="tw-flex tw-flex-grow tw-items-center">
                      <input
                        type="text"
                        id={"item_input_" + item.category + i + it.id}
                        className="tw-bg-[var(--body-color)] tw-px-2 tw-py-1 focus:tw-italic tw-w-[300px]"
                        placeholder="Enter item"
                        value={editingItemIndex[0] === i && editingItemIndex[1] === it.id ? editItem : it.item}
                        onChange={(e) => onItemInputChange(it.id, i, e.target)}
                        onBlur={() => onItemInputBlur(it.id, i)}
                      />
                    </div>
                  </div>
                ))}
                <button type="button" className="tw-mt-2 disabled:tw-text-gray-200" onClick={() => onAddAssessmentItem(i)} disabled={item.items.some((v) => v.item.length === 0)}><i className="bx bx-plus"></i>Add Assessment Item</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


const root = ReactDOM.createRoot($pageRoot.get(0));
root.render(React.createElement(ManageAssessmentPage));