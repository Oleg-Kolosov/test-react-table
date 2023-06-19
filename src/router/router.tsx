import HomePage from '../pages/HomePage';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const DEFAULT_REDIRECT = '/todos?page=1&sort=title&order=asc';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to={DEFAULT_REDIRECT} />} />
            <Route index path="todos" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </>
    )
);
