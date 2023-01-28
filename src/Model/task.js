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
  const setStatus = (newStatus) => {
    if (newStatus && (newStatus === "done" || newStatus === "to do"))
      status = newStatus;
  };
  const toggleStatus = () => {
    if (status === "to do") status = "done";
    else status = "to do";
  };
  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getId,
    getStatus,
    setStatus,
    toggleStatus,
  };
};
