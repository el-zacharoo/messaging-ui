import React, { useReducer, createContext, useContext, useCallback } from "react";

import cloneDeep from 'lodash.clonedeep';

type State = {
    user: User | null;
    loading: boolean;
}

type Action = {
    user: User | null;
    type: String;
    payload: any;
}

type User = {
    id: string;
    email: string;
    name: string;
    picture: string;
    nickname: string;
    given_name: string;
    family_name: string;
}

const init: State = {
    user: null,
    loading: false
};

type Credentials = {
    username: string;
    password: string;
}

const api = import.meta.env.VITE_AUTH_API;
const authContext: React.Context<any> = createContext(init);

const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'init':
            return {
                ...state,
                user: cloneDeep(state.user),

                loading: true,
                error: null,
            };
        case 'loaded':
            return {
                ...state,
                user: cloneDeep(action.payload),
                loading: false,
                error: null,
            };
        case 'signin':
            return {
                ...state,

                loading: false,
                error: null,
            }

        case 'error':
            return {
                ...state,
                user: cloneDeep(state.user),
                loading: false,
                error: action.payload,
            };

        case 'clear':
            return { ...init };
        default:
            throw new Error(`unsuported action type dispatched to AuthProvider reducer: ${action.type}`);
    }

}

export const useUser = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useEntity must be used within an AuthProvider');
    }

    const { state, dispatch } = context;

    const clearState = () => {
        dispatch({ type: 'clear' });
    };

    const token = localStorage.getItem('access_token');

    // returns a user object
    const getUser = useCallback(async () => {
        dispatch({ type: 'init' });

        if (!token) {
            return;
        }

        const resp = await fetch(`${api}/GetAccount`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ "access_token": token }),
        });

        const data = await resp.json();
        dispatch({ type: 'loaded', payload: data.userInfo });

    }, [dispatch, token]);

    const signIn = useCallback(async (credentials: Credentials) => {
        dispatch({ type: 'init' });

        try {
            const resp = await fetch(`${api}/SignIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    authUserSignIn: credentials
                })
            })
            const data = await resp.json();
            if (resp.ok) {
                localStorage.setItem('access_token', data.accessToken);
                dispatch({ type: 'signin', payload: data });
                window.location.href = '/';
            }
        } catch (error) {
            dispatch({ type: 'error', payload: error });
        }

    }, [dispatch]);

    return { state, getUser, clearState, signIn };
}

type Props = {
    children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, init);


    return (
        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>
    );

};
export default AuthProvider;
