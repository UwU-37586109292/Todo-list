import uniqid from 'uniqid';

export const taskFactory = (title, description, priority, dueDate, status) => {
    const id = uniqid('task-')
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
    const getId = () => {
        return id;
    }
    return { getTitle, setTitle, getDescription, setDescription, getId }
}