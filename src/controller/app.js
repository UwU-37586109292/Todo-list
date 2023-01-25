import { projectList } from "../Model/project";
import { projectFactory } from "../Model/project";
import { taskFactory } from "../Model/task";
import { hideAddTaskSection } from "../GUI/main-canvas";
import { refreshTodosList } from "../GUI/main-canvas";
import { appendProjectToProjectList, refreshTaskCounter, removeProjectFromList } from "../GUI/sidebar";

export function addTodoToCurrentProject(formData) {
    projectList.getCurrentProject().addTask(
        taskFactory(formData.get('todoTitle'),
            formData.get('todoDesc'),
            formData.get('priority'),
            formData.get('todoDueDate'),
            'to do'))
    hideAddTaskSection()
    refreshTodosList()
    refreshTaskCounter()
}

export function addProjectFromForm(projectTitle) {
    const newProject = projectFactory(projectTitle);
    projectList.addProjectToList(newProject)
    setProjectAsCurrent(newProject)
    appendProjectToProjectList(newProject)
}

export function setProjectAsCurrent(project) {
    projectList.setProjectAsCurrent(project)
    hideAddTaskSection();
    refreshTodosList();
}

export function deleteProject(project) {
    projectList.deleteProject(project)
    removeProjectFromList(project.getId())
    refreshTodosList()
}

export function deleteTodo(todo) {
    projectList.getCurrentProject().removeTask(todo);
    refreshTodosList()
    refreshTaskCounter()
}

export function toggleTaskStatus(task) {
    const allProjects = projectList.getProjects()
    allProjects.forEach(project => {
        const taskToUpdate = project.getAllTasks().filter(taskToUpdate => task.getId() === taskToUpdate.getId())
        if (taskToUpdate.length > 0) {
            taskToUpdate[0].toggleStatus()
        }
    })
    refreshTaskCounter()
}
export function editProjectFromForm(project, newTitle) {
    project.setTitle(newTitle)
}