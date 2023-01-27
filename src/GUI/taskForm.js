import * as common from "./common";
import { taskFactory } from "../Model/task";
import { addTodoToProject } from "../controller/app";

export function createAddTaskForm() {
    const form = document.createElement('form');
    form.name = 'addTodo';
    form.id = 'todoForm';

    const inputTodoTitle = document.createElement('input');
    inputTodoTitle.type = 'text';
    inputTodoTitle.id = 'todoTitle';
    inputTodoTitle.name = 'todoTitle';
    inputTodoTitle.placeholder = 'Task name*';
    inputTodoTitle.required = 'true';

    const inputTodoDescription = document.createElement('input');
    inputTodoDescription.type = 'text';
    inputTodoDescription.id = 'todoDesc';
    inputTodoDescription.name = ' todoDesc';
    inputTodoDescription.placeholder = 'Additional task description';

    form.appendChild(inputTodoTitle);
    form.appendChild(inputTodoDescription);
    form.appendChild(createPriorityDropdown())

    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.id = 'todoDueDate';
    datePicker.name = 'todoDueDate';
    datePicker.min = new Date().toLocaleDateString('en-gb');

    form.appendChild(datePicker);
    addControlButtonsToTaskForm(form);
    return form;
}

export function showAddTaskForm(event) {
    const canvas = document.getElementById('main')

    if (!document.getElementById('todoForm')) {
        event.target.replaceWith(createAddTaskForm())
    }
}

export function hideAddTaskSection() {
    const form = document.getElementById('todoForm');
    if (form)
        form.remove();
}

export function createPriorityDropdown() {
    const priority = document.createElement('select');
    priority.name = 'priority';
    priority.id = 'priority';

    const optionLow = document.createElement('option');
    optionLow.value = 'low';
    optionLow.innerText = 'Low';
    const optionMedium = document.createElement('option');
    optionMedium.value = 'medium';
    optionMedium.innerText = 'Medium';
    const optionHigh = document.createElement('option');
    optionHigh.value = 'high';
    optionHigh.innerText = 'High';

    priority.appendChild(optionLow);
    priority.appendChild(optionMedium);
    priority.appendChild(optionHigh);
    
    return priority;
}
export function addControlButtonsToTaskForm(form) {
    const saveButton = createSaveTaskButton(form);
    const discardButton = createDiscardChangesButton(form);

    form.appendChild(saveButton);
    form.appendChild(discardButton);
}

function createDiscardChangesButton(form) {
    const discardButton = document.createElement('button');
    discardButton.type = 'reset';
    discardButton.appendChild(common.createDeleteIcon());
    form.addEventListener('reset', function () {
        hideAddTaskSection();
    });
    return discardButton;
}

function createSaveTaskButton(form) {
    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.appendChild(common.createSaveIcon());
    form.addEventListener('submit', function (event) {
        const formData = new FormData(document.getElementById('todoForm'));
        event.preventDefault();
        const projectId = event.target.closest('.project-card').getAttribute('data-project-id');
        addTodoToProject(taskFactory(formData.get('todoTitle'),
            formData.get('todoDesc'),
            formData.get('priority'),
            formData.get('todoDueDate'),
            'to do'), projectId);
    });
    return saveButton;
}

