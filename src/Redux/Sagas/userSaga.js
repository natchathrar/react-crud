import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../action';
import { GetUserList, UserCreate, GetUserById, UpdateUser, deleteUser } from '../../service';

// Worker Sagas
function* createUsersaga(action) {
    try {
        // Make API call to create user
        const response = yield call(UserCreate, action.payload);

        // Dispatch success action
        yield put(actions.UserCreateSuccess(response.data));
    } catch (error) {
        // Dispatch failure action
        yield put(actions.requestFailure(error.message));
    }
}

function* getUserListsaga() {
    try {
        // Make API call to get user list
        const response = yield call(GetUserList);

        // Dispatch success action
        yield put(actions.getUserlistSuccess(response.data));
    } catch (error) {
        // Dispatch failure action
        yield put(actions.requestFailure(error.message));
    }
}

function* getUserByIdsaga(action) {
    try {
        // Make API call to get user by ID
        const response = yield call(GetUserById, action.payload);

        // Dispatch success action
        yield put(actions.getUserByIdSuccess(response.data));
    } catch (error) {
        // Dispatch failure action
        yield put(actions.requestFailure(error.message));
    }
}

function* updateUsersaga(action) {
    try {
        // Make API call to update user
        const response = yield call(UpdateUser, action.payload);

        // Dispatch success action
        yield put(actions.updateUserSuccess(response));
    } catch (error) {
        // Dispatch failure action
        yield put(actions.requestFailure(error.message));
    }
}

function* deleteUsersaga(action) {
    try {
        // Make API call to delete user
        yield call(deleteUser, action.payload);

        // Dispatch success action
        yield put(actions.deleteUserSuccess(action.payload));
    } catch (error) {
        // Dispatch failure action
        yield put(actions.requestFailure(error.message));
    }
}

// Watcher Saga
function* WatchuserSaga() {
    yield takeLatest(types.USER_CREATE_REQUEST, createUsersaga);
    yield takeLatest(types.GET_USERLIST_REQUEST, getUserListsaga);
    yield takeLatest(types.GET_USERBYID_REQUEST, getUserByIdsaga);
    yield takeLatest(types.USER_UPDATE_REQUEST, updateUsersaga);
    yield takeLatest(types.USER_DELETE_REQUEST, deleteUsersaga);
}

export default WatchuserSaga;
