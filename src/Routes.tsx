import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';

const AccountInfo = lazy(() => import('@/AccountInfo'));
const NotFound = lazy(() => import('@/NotFound'));
const List = lazy(() => import('@/List'));

const Routes = () => {

    const routes = [
        { path: '/', element: <List /> },
        { path: 'account', element: <AccountInfo /> },
        { path: '*', element: <NotFound /> },
    ]
    return useRoutes(routes);
}

export default Routes;