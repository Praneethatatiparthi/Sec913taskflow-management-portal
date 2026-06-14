import API from "./api";

// CREATE TASK

export const createTask = async (taskData) => {

    const response = await API.post("/tasks", taskData);

    return response.data;
};

// GET TASKS

export const getTasks = async () => {

    const response = await API.get("/tasks");

    return response.data;
};

// GET ALL TASKS

export const getAllTasks = async () => {

    const response = await API.get("/tasks");

    return response.data;
};

// DELETE TASK

export const deleteTask = async (id) => {

    const response = await API.delete(`/tasks/${id}`);

    return response.data;
};