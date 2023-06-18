import { HomePage } from '../pages/HomePage';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to="/todos?page=1&sort=title&order=asc" />} />
            <Route index path="todos" element={<HomePage />} />
        </>
    )
);
