import { format } from "date-fns";
import { appController } from "../controller/app";
import { taskFactory } from "../Model/task";
import * as common from "./common";
import { DomMainCanvas } from "./mainCanvas";

export const taskForm = (() => {
  const _addTodoFormId = "todoForm";
  const _editTodoFormId = "editTodo";

  function showAddTaskForm(event) {
    if (!document.getElementById(_addTodoFormId)) {
      event.target.closest("div.project-card").appendChild(createTaskForm());
      document.getElementById("todoTitle").focus();
    }
  }
  function hideAddTaskForm() {
    const form = document.getElementById(_addTodoFormId);
    if (form) form.remove();
  }

  function showEditTaskForm(event, task) {
    if (!document.getElementById(_editTodoFormId)) {
      event.target
        .closest("li.todo-item-wrapper")
        .replaceWith(createTaskForm(task));
      document.getElementById("todoTitle_edit").focus();
    }
  }
  function hideEditTaskForm(existingTask) {
    const editForm = document.getElementById(_editTodoFormId);
    editForm.replaceWith(DomMainCanvas.createTaskEntryElement(existingTask));
  }

  function createTaskForm(existingTask) {
    const isEditMode = existingTask !== undefined ? true : false;

    const form = document.createElement("form");
    form.classList.add("flex", "justify-space-between", "underline-short");
    form.name = isEditMode ? _editTodoFormId : "addTodo";
    form.id = isEditMode ? _editTodoFormId : _addTodoFormId;

    const titleDescriptionInputWrapper = document.createElement("div");
    titleDescriptionInputWrapper.classList.add("flex");

    const inputTodoTitle = document.createElement("input");
    inputTodoTitle.type = "text";
    inputTodoTitle.id = isEditMode ? "todoTitle_edit" : "todoTitle";
    inputTodoTitle.name = isEditMode ? "todoTitle_edit" : "todoTitle";
    inputTodoTitle.placeholder = "Task name*";
    inputTodoTitle.required = "true";
    inputTodoTitle.value = isEditMode ? existingTask.getTitle() : "";

    const inputTodoDescription = document.createElement("input");
    inputTodoDescription.type = "text";
    inputTodoDescription.id = isEditMode ? "todoDesc_edit" : "todoDesc";
    inputTodoDescription.name = isEditMode ? "todoDesc_edit" : "todoDesc";
    inputTodoDescription.placeholder = "Additional task description";
    inputTodoDescription.value = isEditMode
      ? existingTask.getDescription()
      : "";

    titleDescriptionInputWrapper.appendChild(inputTodoTitle);
    titleDescriptionInputWrapper.appendChild(inputTodoDescription);

    const priorityDueDateInputWrapper = document.createElement("div");
    priorityDueDateInputWrapper.classList.add("flex");

    const priority = isEditMode ? existingTask.getPriority() : undefined;
    priorityDueDateInputWrapper.appendChild(
      createPriorityDropdown(isEditMode, priority)
    );

    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.id = isEditMode ? "todoDueDate_edit" : "todoDueDate";
    datePicker.name = isEditMode ? "todoDueDate_edit" : "todoDueDate";
    datePicker.value = isEditMode ? existingTask.getDueDate() : "";
    datePicker.min = isEditMode
      ? existingTask.getDueDate()
      : format(new Date(), "yyyy-MM-dd");

    const dueDateLabel = document.createElement("label");
    dueDateLabel.innerText = "Due date";
    dueDateLabel.appendChild(datePicker);

    priorityDueDateInputWrapper.appendChild(dueDateLabel);

    const inputsWrapper = document.createElement("div");
    inputsWrapper.classList.add("flex", "column");

    inputsWrapper.appendChild(titleDescriptionInputWrapper);
    inputsWrapper.appendChild(priorityDueDateInputWrapper);

    form.appendChild(inputsWrapper);
    const controlsWrapper = document.createElement("div");
    controlsWrapper.classList.add("flex", "column");

    if (isEditMode) {
      controlsWrapper.appendChild(createSaveTaskButton(form));
      controlsWrapper.appendChild(createCancelButton(form));

      form.addEventListener("reset", function (event) {
        hideEditTaskForm(existingTask);
      });
      form.addEventListener("submit", function (event) {
        submitEditTaskForm(event, existingTask);
      });
    } else {
      controlsWrapper.appendChild(createSaveTaskButton(form));
      controlsWrapper.appendChild(createDiscardChangesButton(form));

      form.addEventListener("reset", hideAddTaskForm);
      form.addEventListener("submit", submitTaskForm);
    }
    form.appendChild(controlsWrapper);
    return form;
  }

  function submitEditTaskForm(event, existingTask) {
    const formData = new FormData(event.target.closest("form"));
    event.preventDefault();
    const projectId = event.target
      .closest(".project-card")
      .getAttribute("data-project-id");
    appController.updateTaskFromForm(
      existingTask,
      formData.get("todoTitle_edit"),
      formData.get("todoDesc_edit"),
      formData.get("priority"),
      formData.get("todoDueDate_edit")
    );
  }

  function submitTaskForm(event) {
    const formData = new FormData(document.getElementById(_addTodoFormId));
    event.preventDefault();
    const projectId = event.target
      .closest(".project-card")
      .getAttribute("data-project-id");
    appController.addTodoToProject(
      taskFactory(
        formData.get("todoTitle"),
        formData.get("todoDesc"),
        formData.get("priority"),
        formData.get("todoDueDate"),
        "to do"
      ),
      projectId
    );
  }

  function createPriorityDropdown(isEditMode, priorityValue) {
    const priority = document.createElement("select");
    priority.name = "priority";
    priority.id = isEditMode ? "priority_edit" : "priority";

    const optionLow = document.createElement("option");
    optionLow.value = "low";
    optionLow.innerText = "Low";
    optionLow.selected = isEditMode && priorityValue === "low" ? true : "";
    const optionMedium = document.createElement("option");
    optionMedium.value = "medium";
    optionMedium.innerText = "Medium";
    optionMedium.selected =
      isEditMode && priorityValue === "medium" ? true : "";
    const optionHigh = document.createElement("option");
    optionHigh.value = "high";
    optionHigh.innerText = "High";
    optionHigh.selected = isEditMode && priorityValue === "high" ? true : "";

    priority.appendChild(optionLow);
    priority.appendChild(optionMedium);
    priority.appendChild(optionHigh);

    const priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Priority";
    priorityLabel.appendChild(priority);

    return priorityLabel;
  }

  function createDiscardChangesButton() {
    const discardButton = document.createElement("button");
    discardButton.type = "reset";
    discardButton.appendChild(common.createDeleteIcon());
    return discardButton;
  }

  function createCancelButton() {
    const cancelButton = document.createElement("button");
    cancelButton.type = "reset";
    cancelButton.appendChild(common.createCloseIcon());
    return cancelButton;
  }

  function createSaveTaskButton() {
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.appendChild(common.createSaveIcon());
    return saveButton;
  }
  return {
    showAddTaskForm,
    hideAddTaskForm,
    showEditTaskForm,
    hideEditTaskForm,
  };
})();
