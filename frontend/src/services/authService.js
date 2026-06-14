import API from "./api";

export const loginUser = async (email, password) => {

    const response = await API.post("/users/login", {

        email,
        password

    });

    return response.data;
};