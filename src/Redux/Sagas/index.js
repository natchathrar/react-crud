import { all } from 'redux-saga/effects';
import WatchuserSaga from './userSaga';

function* rootSaga() {

    yield all([
        WatchuserSaga()

    ]);
}

export default rootSaga;