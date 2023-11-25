
import axios from "axios";
const baseURL = "http://localhost:8000/"
const UserURL = baseURL + "create";

export const UserCreate = async (data) => {
    console.log(data)
    const res = await axios({
        method: "POST",
        url: UserURL,
        headers: {
            "content-Type": "application/json",
            'Accept': 'application/json',
        },
        data: data
    });
    return res;
}

const GetAlluserURL = baseURL + "getAll";

export const GetUserList = async () => {
    const res = await axios({
        method: "GET",
        url: GetAlluserURL,
        headers: {
            "content-Type": "application/json",
            'Accept': 'application/json',
        }
    });
    return res;
}


export const GetUserById = async (id) => {
    const UserByIdURL = baseURL + `get/${id}`;
    const res = await axios({
        method: "GET",
        url: UserByIdURL,
        headers: {
            "content-Type": "application/json",
            'Accept': 'application/json',
        }
    });
    return res;
}


export const UpdateUser = async (data) => {
    const UpdateUserURL = baseURL + "update";
    const res = await axios({
        method: "PUT",
        url: UpdateUserURL,
        headers: {
            "content-Type": "application/json",
            'Accept': 'application/json',
        },
        data: data
    });
    return res;
}



export const deleteUser = async (id) => {
    const deleteUserURL = baseURL + `delete/${id}`;
    const res = await axios({
        method: "DELETE",
        url: deleteUserURL,
        headers: {
            "content-Type": "application/json",
            'Accept': 'application/json',
        },
    });
    return res;
}