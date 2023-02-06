import uniqid from "uniqid";

export default const taskFactory = (title, description, priority, dueDate, status) => {
  const id = uniqid("task-");

  const getTitle = () => title;
  const setTitle = (newTitle) => {
    if (newTitle) {
      this.title = newTitle;
    }
  };
  const getDescription = () => description;
  const setDescription = (newDescription) => {
    this.description = newDescription;
  };
  const getId = () => id;
  const getStatus = () => status;
  const getPriority = () => priority;
  const setPriority = (newPriority) => {
    this.priority = newPriority;
  };
  const getDueDate = () => dueDate;
  const setDueDate = (newDueDate) => {
    this.dueDate = newDueDate;
  };
  const setStatus = (newStatus) => {
    if (newStatus && (newStatus === "done" || newStatus === "to do"))
      this.status = newStatus;
  };
  const toggleStatus = () => {
    this.status = status === "to do" ? "done" : "to do";
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
