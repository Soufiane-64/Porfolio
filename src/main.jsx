import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import i18n from './i18n/config';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NotFound = lazy(() => import('./components/NotFound/NotFound.jsx'));

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '*', element: <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading…</div>}><NotFound /></Suspense> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>
);
