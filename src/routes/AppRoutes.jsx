import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import RegistrationLayout from '../components/layouts/RegistrationLayout';
import RegistrationPage from '../pages/RegistrationPage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={(
          <ErrorBoundary variant="page">
            <RegistrationLayout />
          </ErrorBoundary>
        )}
      >
        <Route index element={<Navigate to="/registration" replace />} />
        <Route
          path="registration/*"
          element={(
            <ErrorBoundary variant="page">
              <RegistrationPage />
            </ErrorBoundary>
          )}
        />
        <Route
          path="dashboard/*"
          element={(
            <ErrorBoundary variant="page">
              <RegistrationPage />
            </ErrorBoundary>
          )}
        />
        <Route path="*" element={<Navigate to="/registration" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
