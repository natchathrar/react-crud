import * as types from './types';


export const UserCreateRequest = (userData) => {

    return {
        type: types.USER_CREATE_REQUEST,
        payload: userData
    }
}

export const getUserlistRequest = () => {
    return {
        type: types.GET_USERLIST_REQUEST,
    };
};

export const getUserByIdRequest = (id) => {
    return {
        type: types.GET_USERBYID_REQUEST,
        payload: id,
    };
};

export const updateUserRequest = (userData) => {
    return {
        type: types.USER_UPDATE_REQUEST,
        payload: userData,
    };
};
export const deleteUserRequest = (id) => {

    return {
        type: types.USER_DELETE_REQUEST,
        payload: id,
    };
};

export function getUserlistSuccess(data) {
    console.log(data)
    return {
        type: types.GET_USERLIST_SUCCESS,
        payload: data
    };
}

export const UserCreateSuccess = (userData) => {

    return {
        type: types.USER_CREATE_SUCCESS,
        payload: userData
    }
}
export const updateUserSuccess = (updateData) => {
    return {
        type: types.USER_UPDATE_SUCCESS,
        payload: updateData,
    };
};

export const deleteUserSuccess = (id) => {

    return {
        type: types.USER_DELETE_SUCCESS,
        payload: id,
    };
};

export function getUserByIdSuccess(data) {
    return {
        type: types.GET_USERBYID_SUCCESS,
        payload: data
    };
}

export function requestFailure(error) {
    return {
        type: types.USER_FAILURE,
        payload: error
    };
}