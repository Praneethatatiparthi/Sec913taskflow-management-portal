import API from "./api";

// GET USERS

export const getUsers = async () => {

    const response = await API.get("/users");

    return response.data;
};

// DELETE USER

export const deleteUser = async (id) => {

    const response = await API.delete(`/users/${id}`);

    return response.data;
};