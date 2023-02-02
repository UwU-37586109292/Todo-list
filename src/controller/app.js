import showFooter from "../GUI/footer";
import showHeader from "../GUI/header";
import showMainCanvas, {
  displayNewTaskOnList,
  removeTodoFromCanvas,
  showAddtodoButtonUnderProjectName,
  showAllProjectsOnCanvas,
  showCurrentProjectsTasks,
} from "../GUI/main-canvas";
import showSidebar, {
  appendProjectToProjectList,
  refreshTaskCounter,
  removeProjectFromList,
  showProjectEmptyStateElement,
} from "../GUI/sidebar";
import { taskForm } from "../GUI/taskForm";
import { projectFactory, projectList } from "../Model/project";
import { taskFactory } from "../Model/task";

export function initialize() {
  // Default project and task setup for startup
  const defaultProject = projectFactory("Inbox");
  defaultProject.addTask(
    taskFactory("Do the laundry", "whites", "low", "01.01.2023", "to do")
  );
  const anotherProject = projectFactory("School");
  projectList.addProjectToList(defaultProject);
  projectList.setProjectAsCurrent(defaultProject);
  projectList.addProjectToList(anotherProject);

  // Set up main element
  const content = document.createElement("div");
  content.id = "content";
  document.body.appendChild(content);

  // Show GUI
  showHeader();
  showSidebar();
  showMainCanvas();
  showFooter();
}

export function addTodoToCurrentProject(newTask) {
  addTodoToProject(newTask, projectList.getCurrentProject());
}

export function addTodoToProject(todo, projectId) {
  const project = projectList.getProjectById(projectId);
  project.addTask(todo);
  taskForm.hideAddTaskForm();
  showAddtodoButtonUnderProjectName(project);
  displayNewTaskOnList(todo, project);
  refreshTaskCounter();
}

export function addProjectFromForm(projectTitle) {
  const newProject = projectFactory(projectTitle);
  projectList.addProjectToList(newProject);
  setProjectAsCurrent(newProject);
  appendProjectToProjectList(newProject);
}

export function setProjectAsCurrent(project) {
  projectList.setProjectAsCurrent(project);
  showCurrentProjectsTasks();
}

export function deleteProject(project) {
  const currProjectId = projectList.getCurrentProject().getId();
  const projectsDisplayed = document.querySelectorAll(".project-card").length;
  projectList.deleteProject(project);
  removeProjectFromList(project.getId());
  if (project.getId() === currProjectId || projectsDisplayed > 1) {
    showAllProjectsOnCanvas();
  }
  if (projectList.getProjects().length === 0) {
    showProjectEmptyStateElement();
  }
}

export function deleteTodo(task) {
  const allProjects = projectList.getProjects();
  allProjects.forEach((project) => {
    const taskToDelete = project
      .getAllTasks()
      .filter((taskToDelete) => task.getId() === taskToDelete.getId());
    if (taskToDelete.length > 0) {
      project.removeTask(taskToDelete[0]);
    }
  });
  removeTodoFromCanvas(task.getId());
  refreshTaskCounter();
}

export function toggleTaskStatus(task) {
  const allProjects = projectList.getProjects();
  allProjects.forEach((project) => {
    const taskToUpdate = project
      .getAllTasks()
      .filter((taskInProject) => task.getId() === taskInProject.getId());
    if (taskToUpdate.length > 0) {
      taskToUpdate[0].toggleStatus();
    }
  });
}
export function editProjectFromForm(project, newTitle) {
  project.setTitle(newTitle);
  const currProjectId = projectList.getCurrentProject().getId();
  const projectsDisplayed = document.querySelectorAll(".project-card").length;
  if (projectsDisplayed > 1) {
    showAllProjectsOnCanvas();
  } else if (project.getId() === currProjectId) {
    showCurrentProjectsTasks();
  }
}
