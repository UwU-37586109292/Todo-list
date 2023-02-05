import uniqid from "uniqid";

export const taskFactory = (title, description, priority, dueDate, status) => {
  const id = uniqid("task-");

  const getTitle = () => {
    return title;
  };
  const setTitle = (newTitle) => {
    if (newTitle) {
      title = newTitle;
    }
  };
  const getDescription = () => {
    return description;
  };
  const setDescription = (newDescription) => {
    description = newDescription;
  };
  const getId = () => {
    return id;
  };
  const getStatus = () => {
    return status;
  };
  const getPriority = () => {
    return priority;
  };
  const setPriority = (newPriority) => {
    priority = newPriority;
  };
  const getDueDate = () => {
    return dueDate;
  };
  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };
  const setStatus = (newStatus) => {
    if (newStatus && (newStatus === "done" || newStatus === "to do"))
      status = newStatus;
  };
  const toggleStatus = () => {
    status = status === "to do" ? "done" : "to do";
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
  };
};
