export const taskFactory = (title, description, priority, dueDate, status) => {
    const getTitle = () => {
        return title;
    }
    const setTitle = (newTitle) => {
        if (newTitle) {
            title = newTitle;
        }
    }
    const getDescription = () => {
        return description;
    }
    const setDescription = (newDescription) => {
        description = newDescription;
    }
    return { getTitle, setTitle, getDescription, setDescription }
}