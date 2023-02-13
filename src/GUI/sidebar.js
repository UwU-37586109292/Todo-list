import appController from "../controller/app";
import { projectList } from "../Model/project";
import * as common from "./common";
import { getMainElement } from "./common";
import DomMainCanvas from "./mainCanvas";
import projectForm from "./projectForm";

export default (() => {
  const projectsWrapperId = "projects-wrapper";

  function showSidebar() {
    const sidebar = document.createElement("aside");
    sidebar.id = "project-list";
    sidebar.classList.add("flex", "column");

    const menuWrapper = document.createElement("div");
    menuWrapper.classList.add("menu");

    const defaultPickersWrapper = createDefaultPickersSection();
    menuWrapper.appendChild(defaultPickersWrapper);

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

    menuWrapper.appendChild(wrapper);
    menuWrapper.appendChild(createAllProjectsList());

    sidebar.appendChild(menuWrapper);
    const mainContent = getMainElement();
    mainContent.appendChild(sidebar);
  }

  function createDefaultPickersSection() {
    const defaultPickersWrapper = document.createElement("ul");
    defaultPickersWrapper.id = "defaultPickers";
    defaultPickersWrapper.classList.add("flex", "column");

    const allProjectsLabel = createAllProjectsElement();

    defaultPickersWrapper.appendChild(allProjectsLabel);

    return defaultPickersWrapper;
  }

  function createAllProjectsElement() {
    const listElement = document.createElement("li");
    const allProjectsLabel = document.createElement("div");
    allProjectsLabel.innerText = "All projects";
    allProjectsLabel.id = "allProjects";
    allProjectsLabel.addEventListener("click", (event) => {
      clearCurrentClassFromSidebar();
      DomMainCanvas.showAllProjectsOnCanvas();
      event.target.closest("li").classList.toggle("current");
    });
    listElement.appendChild(allProjectsLabel);
    return listElement;
  }

  function createAddProjectButton() {
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("no-border", "no-padding", "addProjectBtn");
    addProjectButton.innerText = "+";
    addProjectButton.addEventListener("click", projectForm.showAddProjectForm);
    return addProjectButton;
  }

  function createAllProjectsList() {
    const container = document.createElement("div");
    container.id = projectsWrapperId;
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
    }

    container.appendChild(createProjectEmptyStateElement());
    return container;
  }

  function appendProjectToProjectList(project) {
    const container = document.getElementById(projectsWrapperId);
    if (project) {
      const newProjectElement = createProjectListElement(project);
      if (document.getElementById("projects-list")) {
        document.getElementById("projects-list").appendChild(newProjectElement);
      } else {
        const listElement = document.createElement("ul");
        listElement.id = "projects-list";

        const currProjectWrapper = newProjectElement;
        listElement.appendChild(currProjectWrapper);
        container.appendChild(listElement);
      }
      addCurrentClassToProject(newProjectElement);
    }
  }

  function addCurrentClassToProject(projectElement) {
    clearCurrentClassFromSidebar();
    projectElement.closest("li").classList.toggle("current");
  }

  function clearCurrentClassFromSidebar() {
    clearCurrentClassFromDefaultPickers();
    clearCurrentClassFromProjectList();
  }

  function clearCurrentClassFromDefaultPickers() {
    document
      .getElementById("defaultPickers")
      .childNodes.forEach((listElement) => {
        listElement.classList.remove("current");
      });
  }

  function clearCurrentClassFromProjectList() {
    if (document.getElementById("projects-list"))
      document
        .getElementById("projects-list")
        .childNodes.forEach((listElement) => {
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
    wrapper.classList.add("flex", "align-center", "flex-grow-1");

    const element = document.createElement("div");
    element.innerText = project.getTitle();
    element.setAttribute("data-project-id", project.getId());
    element.classList.add("projectElement");
    element.addEventListener("click", () => {
      addCurrentClassToProject(element);
      appController.setProjectAsCurrent(project);
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

    button.addEventListener("click", (e) => {
      projectForm.showEditProjectForm(e, project);
    });

    return button;
  }

  function createDeleteProjectButton(project) {
    const button = document.createElement("button");
    button.appendChild(common.createDeleteIcon());
    button.addEventListener("click", () => {
      appController.deleteProject(project);
    });
    return button;
  }

  function createProjectEmptyStateElement() {
    const emptyState = document.createElement("div");
    emptyState.id = "projects-empty-state";
    emptyState.innerText = "No projects yet";
    return emptyState;
  }

  function showProjectEmptyStateElement() {
    document.getElementById("projects-list").remove();
    document
      .getElementById(projectsWrapperId)
      .appendChild(createProjectEmptyStateElement());
  }

  function refreshTaskCounter() {
    document.querySelectorAll(".task-counter").forEach((counter) => {
      const counterElement = counter;
      const projectId =
        counterElement.previousElementSibling.getAttribute("data-project-id");
      counterElement.innerText = projectList
        .getProjectById(projectId)
        .getNumberOfTasksToBeDone();
    });
  }

  function removeProjectFromList(projectId) {
    document
      .querySelector(`div[data-project-id="${projectId}`)
      .closest("li")
      .remove();
  }

  function howManyProjectsCurrentlyDisplayed() {
    return document.querySelectorAll(".project-card").length;
  }
  function addCurrentClassToAllProjectsLabel() {
    document
      .getElementById("allProjects")
      .closest("li")
      .classList.add("current");
  }

  return {
    showSidebar,
    refreshTaskCounter,
    appendProjectToProjectList,
    removeProjectFromList,
    showProjectEmptyStateElement,
    createProjectListElement,
    howManyProjectsCurrentlyDisplayed,
    addCurrentClassToAllProjectsLabel,
  };
})();
