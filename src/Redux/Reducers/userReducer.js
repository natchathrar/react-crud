import * as types from '../types';

const initialState = {
    userList: [],
    userById: null,
    loading: false,
    error: null,
    obj: null,
    id: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_CREATE_REQUEST:
        case types.GET_USERLIST_REQUEST:
        case types.GET_USERBYID_REQUEST:
        case types.USER_UPDATE_REQUEST:
            return { ...state, loading: true, error: null, userById: null };
        case types.USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.USER_CREATE_SUCCESS:
            return {
                ...state,
                userList: [...state.userList, action.payload],
                loading: false,
                obj: action.payload,
                error: null,
            };
        case types.GET_USERLIST_SUCCESS:
            return {
                ...state,
                userList: action.payload,
                userById: null,
                loading: false,
                obj: null,
                error: null,
            };
        case types.GET_USERBYID_SUCCESS:
            return {
                ...state,
                userById: action.payload,
                id: action.id,
                error: null,
                loading: false,
                obj: null,
            };
        case types.USER_UPDATE_SUCCESS:
            return {
                ...state,
                userList: Array.isArray(state.userList)
                    ? state.userList.map((user) =>
                        user.id === action.payload.id ? action.payload : user
                    )
                    : [],
                loading: false,
                obj: action.payload,
            };
        case types.USER_DELETE_SUCCESS:
            return {
                ...state,
                userList: state.userList.filter((user) => user.id !== action.payload),
                loading: false,
                error: null,
                obj: null
            };
        case types.USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
