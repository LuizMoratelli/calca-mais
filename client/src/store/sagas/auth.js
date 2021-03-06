import {call, put} from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import {push} from 'connected-react-router';

import AuthActions from '../ducks/auth';
import api from '../../services/api';

export function* signIn({ email, password }){
    try {
        const response = yield call(api.post,'auth/login', {email, password} );
        localStorage.setItem('@calcamais:token', response.data.access_token);

        yield put(AuthActions.signInSuccess(response.data.access_token))
        yield put(push('/'));
    } catch (error) {
        console.log(error);
        yield put(toastrActions.add({
            type: 'error',
            title: 'Falha no Login',
            message: 'Verifique as credenciais de acesso'
        }))
    }
}

export function* signUp({ nome, email, password }){
    try {
        yield call(api.post, 'auth/register', { nome, email, password } );
        yield signIn({ email, password });
    } catch (error) {
        console.log(error);
        yield put(toastrActions.add({
            type: 'error',
            title: 'Falha no cadastro',
            message: 'Verifique os dados inseridos'
        }));
    }
}

export function* signOut(){
    yield call(api.post,'auth/logout');

    localStorage.removeItem('@calcamais:token');

    yield put(push('/signin'));
}
