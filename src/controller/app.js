import showFooter from "../GUI/footer";
import showHeader from "../GUI/header";
import localStorage from "../GUI/localStorage";
import DomMainCanvas from "../GUI/mainCanvas";
import sidebar from "../GUI/sidebar";
import taskForm from "../GUI/taskForm";
import { projectFactory, projectList } from "../Model/project";
import taskFactory from "../Model/task";

export default (() => {
  function initialize() {
    if (localStorage.isAvailable()) {
      if (!localStorage.getProjectListRawData()) {
        localStorage.initializeData();
      } else localStorage.fetchAllProjectsFromStorage();
    } else {
      const defaultProject = projectFactory("Home");
      defaultProject.addTask(
        taskFactory(
          "Do the laundry",
          "Remember to take out coins from pockets!",
          "high",
          "2023-01-01",
          "to do"
        )
      );
      defaultProject.addTask(
        taskFactory("Wash the windows", "", "medium", "", "to do")
      );
      const anotherProject = projectFactory("School");
      anotherProject.addTask(
        taskFactory("Study for algebra test", "", "high", "2023-02-13", "to do")
      );
      projectList.addProjectToList(defaultProject);
      projectList.setProjectAsCurrent(defaultProject);
      projectList.addProjectToList(anotherProject);
    }

    // Set up main element
    const content = document.createElement("div");
    content.id = "content";
    document.body.appendChild(content);

    // Show GUI
    showHeader();
    sidebar.showSidebar();
    DomMainCanvas.showMainCanvas();
    showFooter();
    sidebar.addCurrentClassToAllProjectsLabel();
  }

  function addTodoToProject(todo, projectId) {
    const project = projectList.getProjectById(projectId);
    project.addTask(todo);
    taskForm.hideAddTaskForm();
    DomMainCanvas.displayNewTaskOnList(todo, project);
    sidebar.refreshTaskCounter();
    localStorage.updateStoredProjectList(projectList);
  }

  function addProjectFromForm(projectTitle) {
    const newProject = projectFactory(projectTitle);
    projectList.addProjectToList(newProject);
    setProjectAsCurrent(newProject);
    sidebar.appendProjectToProjectList(newProject);
    localStorage.updateStoredProjectList(projectList);
  }

  function setProjectAsCurrent(project) {
    projectList.setProjectAsCurrent(project);
    DomMainCanvas.showCurrentProjectsTasks();
  }

  function deleteProject(project) {
    const projectsDisplayed = sidebar.howManyProjectsCurrentlyDisplayed();
    const isCurrentFlag = projectList.isProjectCurrent(project);

    projectList.deleteProject(project);
    sidebar.removeProjectFromList(project.getId());

    if (isCurrentFlag || projectsDisplayed > 1) {
      DomMainCanvas.showAllProjectsOnCanvas();
    }
    if (projectList.isProjectListEmpty()) {
      sidebar.showProjectEmptyStateElement();
    }
    localStorage.updateStoredProjectList(projectList);
  }

  function deleteTodo(task) {
    projectList.removeTaskFromAnyProject(task);
    DomMainCanvas.removeTodoFromCanvas(task.getId());
    sidebar.refreshTaskCounter();
    localStorage.updateStoredProjectList(projectList);
  }

  function toggleTaskStatus(task) {
    projectList.toggleTaskStatusInAnyProject(task);
    localStorage.updateStoredProjectList(projectList);
  }

  function editProjectFromForm(project, newTitle) {
    project.setTitle(newTitle);
    const currProjectId = projectList.getCurrentProjectId();
    const projectsDisplayed = sidebar.howManyProjectsCurrentlyDisplayed();
    if (projectsDisplayed > 1) {
      DomMainCanvas.showAllProjectsOnCanvas();
    } else if (project.getId() === currProjectId) {
      DomMainCanvas.showCurrentProjectsTasks();
    }
    localStorage.updateStoredProjectList(projectList);
  }

  function updateTaskFromForm(
    existingTask,
    newTitle,
    newDescription,
    newPriority,
    newDueDate
  ) {
    existingTask.setTitle(newTitle);
    existingTask.setDescription(newDescription);
    existingTask.setPriority(newPriority);
    existingTask.setDueDate(newDueDate);

    taskForm.hideEditTaskForm(existingTask);
    localStorage.updateStoredProjectList(projectList);
  }
  return {
    initialize,
    addTodoToProject,
    addProjectFromForm,
    setProjectAsCurrent,
    editProjectFromForm,
    toggleTaskStatus,
    deleteTodo,
    deleteProject,
    updateTaskFromForm,
  };
})();
