import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

const AccountInfo = lazy(() => import('@/AccountInfo'));
const NotFound = lazy(() => import('@/NotFound'));
const List = lazy(() => import('@/List'));
const SignUp = lazy(() => import('@/auth/SignUp'));
const SignIn = lazy(() => import('@/auth/SignIn'));

const Routes = () => {
    const routes = [
        { path: '/', element: <List /> },
        { path: 'account', element: <AccountInfo /> },
        { path: '*', element: <NotFound /> },
        { path: 'login', element: <SignIn /> },
        { path: 'sign-up', element: <SignUp /> }
    ]
    return useRoutes(routes);
}

export default Routes;

