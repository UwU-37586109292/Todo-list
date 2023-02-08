import uniqid from "uniqid";

export default (title, description, priority, dueDate, status) => {
  let taskTitle = title;
  let taskDescription = description;
  let taskPriority = priority;
  let taskDueDate = dueDate;
  let taskStatus = status;
  const id = uniqid("task-");

  const getTitle = () => {
    return taskTitle;
  };
  const setTitle = (newTitle) => {
    if (newTitle) {
      taskTitle = newTitle;
    }
  };
  const getDescription = () => {
    return taskDescription;
  };
  const setDescription = (newDescription) => {
    taskDescription = newDescription;
  };
  const getId = () => {
    return id;
  };
  const getStatus = () => {
    return taskStatus;
  };
  const getPriority = () => {
    return taskPriority;
  };
  const setPriority = (newPriority) => {
    taskPriority = newPriority;
  };
  const getDueDate = () => {
    return taskDueDate;
  };
  const setDueDate = (newDueDate) => {
    taskDueDate = newDueDate;
  };
  const setStatus = (newStatus) => {
    if (newStatus && (newStatus === "done" || newStatus === "to do"))
      taskStatus = newStatus;
  };
  const toggleStatus = () => {
    taskStatus = taskStatus === "to do" ? "done" : "to do";
  };
  const toJSON = () => {
    return `{ "id": "${id}", "title": "${taskTitle}", "description": "${taskDescription}", "priority": "${taskPriority}", "dueDate": "${taskDueDate}","status": "${taskStatus}" }`;
  };
  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getId,
    getStatus,
    setStatus,
    getPriority,
    setPriority,
    getDueDate,
    setDueDate,
    toggleStatus,
    toJSON,
  };
};
