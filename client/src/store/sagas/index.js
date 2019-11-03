import { all, fork, takeLatest } from 'redux-saga/effects';

import { signIn, signOut, signUp } from './auth'
import { AuthTypes } from '../ducks/auth';

export default function* rootSaga(){
    return yield all([
        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT, signOut),
        takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

    ]);
}