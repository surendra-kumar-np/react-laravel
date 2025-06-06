import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PublicLayout from '../components/layouts/PublicLayout';
import PrivateLayout from '../components/layouts/PrivateLayout';
import Login from '../pages/Login';
import SurveyorLogin from '../pages/SurveyorLogin';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';

export default function AppRoutes({ user, setUser }) {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Navigate to="/login" />} /> {/* 👈 This line added */}
                <Route path="login" element={<Login setUser={setUser} user={user} />} />
                <Route path="surveyor-login" element={<SurveyorLogin setUser={setUser} user={user} />} />
                <Route path="forgot-password" element={<ForgotPassword setUser={setUser} user={user} />} />
            </Route>

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    user ? (
                        <PrivateLayout user={user} setUser={setUser} />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            >
                <Route path="dashboard" element={<Dashboard user={user} />} />
            </Route>


        </Routes>
    );
}
