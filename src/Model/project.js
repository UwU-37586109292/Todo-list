import uniqid from "uniqid";

export const projectFactory = (title) => {
  let tasks = [];
  const id = uniqid("project-");
  const getTitle = () => title;
  const setTitle = (newTitle) => {
    if (newTitle) {
      this.title = newTitle;
    }
  };
  const addTask = (task) => {
    tasks.push(task);
  };
  const removeTask = (taskToRemove) => {
    tasks = tasks.filter((task) => task.getId() !== taskToRemove.getId());
  };
  const getAllTasks = () => tasks;
  const getNumberOfTasksToBeDone = () =>
    getAllTasks().filter((task) => task.getStatus().toLowerCase() !== "done")
      .length;
  const getId = () => id;
  const getTaskById = (taskId) =>
    getAllTasks().filter((task) => task.getId() === taskId)[0];

  return {
    getTaskById,
    getTitle,
    setTitle,
    addTask,
    removeTask,
    getAllTasks,
    getId,
    getNumberOfTasksToBeDone,
  };
};

export const projectList = (() => {
  let projects = [];
  let currentProjectId;
  const setFirstProjectAsCurrent = () => {
    currentProjectId = projects[0] ? projects[0].getId() : null;
  };
  const getProjects = () => projects;
  const addProjectToList = (project) => {
    projects.push(project);
  };
  const deleteProject = (projectToRemove) => {
    projects = projects.filter(
      (project) => project.getId() !== projectToRemove.getId()
    );
    setFirstProjectAsCurrent();
  };
  const setProjectAsCurrent = (project) => {
    currentProjectId = project.getId();
  };
  const getCurrentProject = () =>
    projects.filter((project) => project.getId() === currentProjectId)[0];
  const isProjectListEmpty = () => projectList.getProjects().length === 0;
  const isCurrentProjectTaskListEmpty = () =>
    projectList.getCurrentProject().getAllTasks().length === 0;
  const getProjectById = (projectId) =>
    projects.filter((project) => project.getId() === projectId)[0];
  const isProjectCurrent = (project) => project.getId() === currentProjectId;
  const removeTaskFromAnyProject = (task) => {
    projects.forEach((project) => {
      const taskToDelete = project.getTaskById(task.getId());
      if (taskToDelete.length > 0) {
        project.removeTask(taskToDelete[0]);
      }
    });
  };
  const toggleTaskStatusInAnyProject = (task) => {
    projects.forEach((project) => {
      const taskToUpdate = project.getTaskById(task.getId());
      if (taskToUpdate.length > 0) {
        taskToUpdate[0].toggleStatus();
      }
    });
  };
  return {
    deleteProject,
    setProjectAsCurrent,
    getProjects,
    addProjectToList,
    getCurrentProject,
    isProjectListEmpty,
    isCurrentProjectTaskListEmpty,
    getProjectById,
    isProjectCurrent,
    removeTaskFromAnyProject,
    toggleTaskStatusInAnyProject,
  };
})();
