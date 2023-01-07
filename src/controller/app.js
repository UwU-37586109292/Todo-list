import { projectList } from "../Model/project";
import { taskFactory } from "../Model/task";
import { hideAddTaskSection } from "../GUI/main-canvas";
import { refreshTodosList } from "../GUI/main-canvas";

export function addTodoToCurrentProject(todoTitle){
    //TODO: handle other fields
    projectList.getCurrentProject().addTask(taskFactory(todoTitle, 'description', 'priority', 'dueDate', 'status'))
    hideAddTaskSection()
    refreshTodosList()
}