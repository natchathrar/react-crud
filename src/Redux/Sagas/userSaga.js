import { call, delay, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../action';
import { GetUserList, UserCreate, GetUserById, UpdateUser, deleteUser } from '../../service';
import { toast } from 'react-toastify';

// Worker Sagas
function* createUsersaga(action) {
    try {
        // Make API call to create user
        const response = yield call(UserCreate, action.payload);
        if (response.status === 200 || response.status === 201) {
            yield delay(500)
            yield put(actions.UserCreateSuccess(response.data));

            toast.success('User create successfully')
            action.navigate('/');
        }
    } catch (error) {
        yield put(actions.requestFailure(error.message));
    }
}

function* getUserListsaga() {
    try {
        // Make API call to get user list
        const response = yield call(GetUserList);
        if (response.status === 200 || response.status === 201) {
            yield delay(500)
            yield put(actions.getUserlistSuccess(response.data));
            console.log(response.data.message);
            toast.success(response.data.message)
        }
    } catch (error) {
        yield put(actions.requestFailure(error.message));
    }
}

function* getUserByIdsaga(action) {
    try {
        // Make API call to get user by ID
        const response = yield call(GetUserById, action.payload);

        yield put(actions.getUserByIdSuccess(response.data));
    } catch (error) {
        yield put(actions.requestFailure(error.message));
    }
}

function* updateUsersaga(action) {
    try {

        const response = yield call(UpdateUser, action.payload);
        if (response.status === 200 || response.status === 201) {
            yield delay(500)

            yield put(actions.updateUserSuccess(response));
            toast.success('User updated successfully')
            action.navigate('/');
        }
    } catch (error) {

        yield put(actions.requestFailure(error.message));
    }
}

function* deleteUsersaga(action) {
    try {

        const response = yield call(deleteUser, action.payload);

        if (response.status === 200 || response.status === 201) {
            yield delay(500)
            yield put(actions.deleteUserSuccess(action.payload));
        }
    } catch (error) {
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
