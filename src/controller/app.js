import { projectList } from "../Model/project";
import { projectFactory } from "../Model/project";
import { taskFactory } from "../Model/task";
import { hideAddTaskSection } from "../GUI/main-canvas";
import { refreshTodosList } from "../GUI/main-canvas";
import { hideAddProjectForm, refreshSidebar } from "../GUI/sidebar";

export function addTodoToCurrentProject(formData){
    projectList.getCurrentProject().addTask(
        taskFactory(formData.get('todoTitle'), 
        formData.get('todoDesc'), 
        formData.get('priority'), 
        formData.get('todoDueDate'), 
        'to do'))
    hideAddTaskSection()
    refreshTodosList()
    refreshSidebar()
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
    hideAddTaskSection();
    refreshTodosList();
}

export function deleteProject(project){
    projectList.deleteProject(project)
    refreshSidebar()
    refreshTodosList()   
}

export function deleteTodo(todo){
    projectList.getCurrentProject().removeTask(todo);
    refreshTodosList()
    refreshSidebar()
}