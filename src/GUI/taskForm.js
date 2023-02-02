import { appController } from "../controller/app";
import { taskFactory } from "../Model/task";
import * as common from "./common";

export const taskForm = (() => {
  function showAddTaskForm(event) {
    const canvas = document.getElementById("main");
    if (!document.getElementById("todoForm")) {
      event.target.parentNode.appendChild(createAddTaskForm());
    }
  }

  function hideAddTaskForm() {
    const form = document.getElementById("todoForm");
    if (form) form.remove();
  }

  function createAddTaskForm() {
    const form = document.createElement("form");
    form.name = "addTodo";
    form.id = "todoForm";

    const inputTodoTitle = document.createElement("input");
    inputTodoTitle.type = "text";
    inputTodoTitle.id = "todoTitle";
    inputTodoTitle.name = "todoTitle";
    inputTodoTitle.placeholder = "Task name*";
    inputTodoTitle.required = "true";

    const inputTodoDescription = document.createElement("input");
    inputTodoDescription.type = "text";
    inputTodoDescription.id = "todoDesc";
    inputTodoDescription.name = " todoDesc";
    inputTodoDescription.placeholder = "Additional task description";

    form.appendChild(inputTodoTitle);
    form.appendChild(inputTodoDescription);
    form.appendChild(createPriorityDropdown());

    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.id = "todoDueDate";
    datePicker.name = "todoDueDate";
    datePicker.min = new Date().toLocaleDateString("en-gb");

    form.appendChild(datePicker);
    form.appendChild(createSaveTaskButton(form));
    form.appendChild(createDiscardChangesButton(form));

    form.addEventListener("reset", hideAddTaskForm);
    form.addEventListener("submit", submitTaskForm);

    return form;
  }

  function submitTaskForm(event) {
    const formData = new FormData(document.getElementById("todoForm"));
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

  function createPriorityDropdown() {
    const priority = document.createElement("select");
    priority.name = "priority";
    priority.id = "priority";

    const optionLow = document.createElement("option");
    optionLow.value = "low";
    optionLow.innerText = "Low";
    const optionMedium = document.createElement("option");
    optionMedium.value = "medium";
    optionMedium.innerText = "Medium";
    const optionHigh = document.createElement("option");
    optionHigh.value = "high";
    optionHigh.innerText = "High";

    priority.appendChild(optionLow);
    priority.appendChild(optionMedium);
    priority.appendChild(optionHigh);

    return priority;
  }

  function createDiscardChangesButton() {
    const discardButton = document.createElement("button");
    discardButton.type = "reset";
    discardButton.appendChild(common.createDeleteIcon());
    return discardButton;
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
  };
})();
