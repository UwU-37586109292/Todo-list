import { taskFactory } from "./Model/task";
import { projectFactory } from "./Model/project";

const todo1 = taskFactory("title", 'desc', 'high', '01.01.2023', 'done')
const project = projectFactory('projekcik')
project.addTask(todo1)
project.getAllTasks()
project.removeTask(todo1)
project.getAllTasks()