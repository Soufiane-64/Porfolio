import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import i18n from './i18n/config';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NotFound from './components/NotFound/NotFound.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '*', element: <NotFound /> }
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
