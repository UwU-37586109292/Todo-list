import {
  addProjectFromForm,
  deleteProject,
  editProjectFromForm,
  setProjectAsCurrent,
} from "../controller/app";
import { projectList } from "../Model/project";
import * as common from "./common";
import { getMainElement } from "./common";
import { DomMainCanvas } from "./DomMainCanvas";

export default function showSidebar() {
  const sidebar = document.createElement("aside");
  sidebar.id = "project-list";
  sidebar.classList.add("flex", "column");

  const defaultPickersWrapper = createDefaultPickersSection();

  const wrapper = document.createElement("div");
  wrapper.classList.add(
    "flex",
    "justify-space-between",
    "align-center",
    "underline"
  );

  const label = common.createLabelElement("Projects");
  wrapper.appendChild(label);
  wrapper.appendChild(createAddProjectButton());

  sidebar.appendChild(defaultPickersWrapper);
  sidebar.appendChild(wrapper);
  sidebar.appendChild(createAllProjectsList());

  const mainContent = getMainElement();
  mainContent.appendChild(sidebar);
}

function createDefaultPickersSection() {
  const defaultPickersWrapper = document.createElement("div");
  defaultPickersWrapper.classList.add("flex", "align-center");

  const allProjectsLabel = common.createLabelElement("All projects");
  allProjectsLabel.addEventListener("click", function () {
    clearCurrentClassFromProjectList();
    DomMainCanvas.showAllProjectsOnCanvas();
  });

  defaultPickersWrapper.appendChild(allProjectsLabel);
  return defaultPickersWrapper;
}

function createAddProjectButton() {
  const addProjectButton = document.createElement("button");
  addProjectButton.classList.add("no-border", "no-padding", "addProjectBtn");
  addProjectButton.innerText = "+";
  addProjectButton.addEventListener("click", showAddProjectForm);
  return addProjectButton;
}

function showAddProjectForm() {
  if (!document.getElementById("projectForm_add")) {
    const form = createProjectForm("add");

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.appendChild(common.createSaveIcon());
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      addProjectFromForm(new FormData(form).get("projectTitle_add"));
      form.remove();
    });

    const discardButton = document.createElement("button");
    discardButton.setAttribute("type", "reset");
    discardButton.appendChild(common.createDeleteIcon());
    form.addEventListener("reset", function () {
      form.remove();
    });

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("flex");
    buttonsWrapper.appendChild(saveButton);
    buttonsWrapper.appendChild(discardButton);

    form.appendChild(buttonsWrapper);

    document.getElementById("project-list").appendChild(form);
  }
}

function createProjectForm(formType) {
  const form = document.createElement("form");
  form.name = `projectForm_${formType}`;
  form.id = `projectForm_${formType}`;
  form.classList.add("flex", "justify-space-between");

  const inputProjectName = document.createElement("input");
  inputProjectName.setAttribute("type", "text");
  inputProjectName.setAttribute("id", `projectTitle_${formType}`);
  inputProjectName.setAttribute("name", `projectTitle_${formType}`);
  inputProjectName.placeholder = "Project name";
  inputProjectName.required = "true";
  form.appendChild(inputProjectName);
  return form;
}

export function hideAddProjectForm() {
  if (document.getElementById("projectForm_add"))
    document.getElementById("projectForm_add").remove();
}

function createAllProjectsList() {
  const container = document.createElement("div");
  container.id = "projects-wrapper";
  const projectsToDisplay = projectList.getProjects();
  if (projectsToDisplay.length > 0) {
    const listElement = document.createElement("ul");
    listElement.id = "projects-list";
    projectsToDisplay.forEach((project) => {
      const currProjectWrapper = createProjectListElement(project);
      listElement.appendChild(currProjectWrapper);
    });
    container.appendChild(listElement);

    return container;
  } else {
    container.appendChild(createProjectEmptyStateElement());
    return container;
  }
}

export function appendProjectToProjectList(project) {
  const container = document.getElementById("projects-wrapper");
  if (project) {
    const newProjectElement = createProjectListElement(project);
    if (document.getElementById("projects-empty-state")) {
      document.getElementById("projects-empty-state").remove();
      const listElement = document.getElementById("projects-list");
      const currProjectWrapper = newProjectElement;
      listElement.appendChild(currProjectWrapper);
      container.appendChild(listElement);
    } else {
      document.getElementById("projects-list").appendChild(newProjectElement);
    }
    addCurrentClassToProject(newProjectElement);
  }
}

function addCurrentClassToProject(projectElement) {
  clearCurrentClassFromProjectList();
  projectElement.closest("li").classList.toggle("current");
}

function clearCurrentClassFromProjectList() {
  document.getElementById("projects-list").childNodes.forEach((listElement) => {
    listElement.classList.remove("current");
  });
}

function createProjectListElement(project) {
  const currProjectWrapper = document.createElement("li");
  currProjectWrapper.classList.add(
    "flex",
    "align-center",
    "justify-space-between"
  );
  currProjectWrapper.appendChild(createProjectTagElement(project));

  const controlsWrapper = document.createElement("div");
  controlsWrapper.classList.add("flex");
  controlsWrapper.appendChild(createEditProjectButton(project));
  controlsWrapper.appendChild(createDeleteProjectButton(project));

  currProjectWrapper.appendChild(controlsWrapper);
  return currProjectWrapper;
}

function createProjectTagElement(project) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("flex", "align-center");

  const element = document.createElement("div");
  element.innerText = project.getTitle();
  element.setAttribute("data-project-id", project.getId());
  element.addEventListener("click", function () {
    addCurrentClassToProject(element);
    setProjectAsCurrent(project);
  });

  const taskCounter = document.createElement("div");
  taskCounter.innerText = project.getNumberOfTasksToBeDone();
  taskCounter.classList.add("task-counter");

  wrapper.appendChild(element);
  wrapper.appendChild(taskCounter);

  return wrapper;
}

function createEditProjectButton(project) {
  const button = document.createElement("button");
  button.classList.add("edit");
  button.appendChild(common.createEditIcon());

  button.addEventListener("click", function (event) {
    if (document.getElementById("projectForm_edit")) {
      document.getElementById("projectForm_edit").reset();
    }

    const projectItemWrapper = event.target.closest("li");
    const form = createProjectForm("edit");

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.appendChild(common.createSaveIcon());
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      editProjectFromForm(project, new FormData(form).get("projectTitle_edit"));
      form.replaceWith(createProjectListElement(project));
    });

    const discardButton = document.createElement("button");
    discardButton.setAttribute("type", "reset");
    discardButton.appendChild(common.createCloseIcon());
    form.addEventListener("reset", function () {
      form.replaceWith(projectItemWrapper);
    });
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("flex");
    buttonsWrapper.appendChild(saveButton);
    buttonsWrapper.appendChild(discardButton);

    form.appendChild(buttonsWrapper);
    form.getElementsByTagName("input")[0].value = project.getTitle();
    projectItemWrapper.replaceWith(form);
  });

  return button;
}

function createDeleteProjectButton(project) {
  const button = document.createElement("button");
  button.appendChild(common.createDeleteIcon());
  button.addEventListener("click", function () {
    deleteProject(project);
  });
  return button;
}

function createProjectEmptyStateElement() {
  const emptyState = document.createElement("div");
  emptyState.id = "projects-empty-state";
  emptyState.innerText = "No projects yet";
  return emptyState;
}

export function showProjectEmptyStateElement() {
  const container = document.createElement("div");
  container.id = "projects-wrapper";
  container.appendChild(createProjectEmptyStateElement());
  document.getElementById("project-list").appendChild(container);
}

export function refreshTaskCounter() {
  document.querySelectorAll(".task-counter").forEach((counter) => {
    const projectId =
      counter.previousElementSibling.getAttribute("data-project-id");
    counter.innerText = projectList
      .getProjectById(projectId)
      .getNumberOfTasksToBeDone();
  });
}

export function removeProjectFromList(projectId) {
  document
    .querySelector(`div[data-project-id="${projectId}`)
    .closest("li")
    .remove();
}
