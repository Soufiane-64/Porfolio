import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NotFound from './components/NotFound/NotFound.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '*', element: <NotFound /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
