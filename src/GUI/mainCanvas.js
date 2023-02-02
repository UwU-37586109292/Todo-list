import { appController } from "../controller/app";
import { projectList } from "../Model/project";
import * as common from "./common";
import { getMainElement } from "./common";
import { sidebar } from "./sidebar";
import { taskForm } from "./taskForm";

export const DomMainCanvas = (() => {
  const showMainCanvas = () => {
    const mainContent = getMainElement();

    const canvas = document.createElement("main");
    canvas.id = "main";
    canvas.classList.add("flex", "column", "align-center");
    mainContent.appendChild(canvas);

    showAllProjectsOnCanvas();
  };

  function showCurrentProjectsTasks() {
    const canvas = document.getElementById("main");
    while (canvas.firstChild) {
      canvas.removeChild(canvas.lastChild);
    }
    canvas.appendChild(createProjectCard(projectList.getCurrentProject()));
  }

  function createAddTodoButton() {
    const button = document.createElement("button");
    button.classList.add("addTaskBtn");
    button.innerText = "Add task";
    button.addEventListener("click", taskForm.showAddTaskForm);
    return button;
  }

  function showAllProjectsOnCanvas() {
    const canvas = document.getElementById("main");
    while (canvas.firstChild) {
      canvas.removeChild(canvas.lastChild);
    }
    if (projectList.getProjects().length > 0) {
      projectList.getProjects().forEach((project) => {
        canvas.appendChild(createProjectCard(project));
      });
    } else {
      appendEmptyStateTodos(canvas);
    }
  }

  /**
   *
   * @param {projectFactory} project
   * @returns {element} projectCard
   */
  function createProjectCard(project) {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card", "flex", "column");
    projectCard.setAttribute("data-project-id", project.getId());

    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add("flex", "justify-space-between", "underline");

    const projectTitle = document.createElement("h1");
    projectTitle.innerText = project.getTitle();
    headerWrapper.appendChild(projectTitle);
    headerWrapper.appendChild(createAddTodoButton());

    projectCard.appendChild(headerWrapper);
    projectCard.appendChild(createTodoListFromProject(project));

    return projectCard;
  }

  function createTodoListFromProject(project) {
    const todoList = document.createElement("ul");
    if (project.getAllTasks().length > 0) {
      project.getAllTasks().forEach((task) => {
        const todoEntry = createTaskEntryElement(task);
        todoList.appendChild(todoEntry);
      });
    } else {
      appendEmptyStateTodos(todoList);
    }
    return todoList;
  }

  function createTaskEntryElement(task) {
    const todoEntry = document.createElement("li");
    todoEntry.classList.add("todo-item-wrapper", "flex", "align-center");
    todoEntry.setAttribute("data-task-id", task.getId());

    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      appController.toggleTaskStatus(task);
      todoEntry.classList.toggle("done");
      dot.classList.toggle("done");
      sidebar.refreshTaskCounter();
    });

    if (task.getStatus() === "done") {
      todoEntry.classList.add("done");
      dot.classList.add("done");
    }

    const todoTitle = document.createElement("div");
    todoTitle.innerText = task.getTitle();

    todoEntry.appendChild(dot);
    todoEntry.appendChild(todoTitle);
    todoEntry.appendChild(createEditTodoButton(task));
    todoEntry.appendChild(createDeleteTodoButton(task));
    return todoEntry;
  }

  function removeTodoFromCanvas(taskId) {
    const todoEntryWrapper = document.querySelector(
      `li[data-task-id="${taskId}"]`
    );
    const listElement = todoEntryWrapper.closest("ul");
    if (todoEntryWrapper) {
      todoEntryWrapper.remove();
      if (!listElement.hasChildNodes()) {
        appendEmptyStateTodos(listElement);
      }
    }
  }

  function appendEmptyStateTodos(element) {
    const emptyState = document.createElement("div");
    emptyState.classList.add("no-tasks");
    emptyState.innerText = "Seems like there is noting to be done yet...";

    element.appendChild(emptyState);
  }

  function createEditTodoButton(todo) {
    const button = document.createElement("button");
    button.classList.add("edit");
    button.appendChild(common.createEditIcon());

    // TODO: Add function that edits todo

    return button;
  }

  function createDeleteTodoButton(todo) {
    const button = document.createElement("button");
    button.appendChild(common.createDeleteIcon());
    button.addEventListener("click", () => {
      appController.deleteTodo(todo);
    });
    return button;
  }

  function removeTaskEmptyState(section) {
    const noTasks = section.getElementsByClassName("no-tasks");
    if (noTasks.length > 0) {
      noTasks[0].remove();
    }
  }

  /**
   *
   * @param {taskFactory} task
   * @param {projectFactory} project
   */
  function displayNewTaskOnList(task, project) {
    const projectId = project.getId();
    const projectCard = document.querySelector(
      `.project-card[data-project-id="${projectId}"]`
    );
    if (projectCard) {
      projectCard
        .getElementsByTagName("ul")[0]
        .appendChild(createTaskEntryElement(task));
      removeTaskEmptyState(projectCard);
    }
  }

  return {
    showAllProjectsOnCanvas,
    showMainCanvas,
    displayNewTaskOnList,
    showCurrentProjectsTasks,
    showAllProjectsOnCanvas,
    removeTodoFromCanvas,
    showCurrentProjectsTasks,
  };
})();
