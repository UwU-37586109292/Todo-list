import { projectList } from "../Model/project";
import { projectFactory } from "../Model/project";
import { taskFactory } from "../Model/task";
import { hideAddTaskSection } from "../GUI/main-canvas";
import { refreshTodosList } from "../GUI/main-canvas";
import { hideAddProjectForm, refreshSidebar } from "../GUI/sidebar";

export function addTodoToCurrentProject(todoTitle){
    //TODO: handle other fields
    projectList.getCurrentProject().addTask(taskFactory(todoTitle, 'description', 'priority', 'dueDate', 'status'))
    hideAddTaskSection()
    refreshTodosList()
}

export function addProjectFromForm(projectTitle){
    const newProject = projectFactory(projectTitle);
    projectList.addProjectToList(newProject)
    setProjectAsCurrent(newProject)
    hideAddProjectForm()
    refreshSidebar()
}

export function setProjectAsCurrent(project){
    projectList.setProjectAsCurrent(project)
    refreshTodosList();
}

export function deleteProject(project){
    projectList.deleteProject(project)
    refreshSidebar()
    refreshTodosList()
}