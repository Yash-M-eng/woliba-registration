import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegistrationLayout from '../components/layouts/RegistrationLayout';
import RegistrationPage from '../pages/RegistrationPage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegistrationLayout />}>
        <Route index element={<Navigate to="/registration" replace />} />
        <Route path="registration/*" element={<RegistrationPage />} />
        <Route path="*" element={<Navigate to="/registration" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
