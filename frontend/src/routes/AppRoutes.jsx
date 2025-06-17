import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layouts/PublicLayout';
import PrivateLayout from '../components/layouts/PrivateLayout';
import Login from '../pages/Login';
import SurveyorLogin from '../pages/SurveyorLogin';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import MyProfile from '../pages/MyProfile';
import Users from '../pages/Users';

export default function AppRoutes({ user, setUser }) {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Navigate to="/login" />} />
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
                <Route path="dashboard" element={<Dashboard user={user} setUser={setUser} />} />
                <Route path="users" element={<Users user={user} setUser={setUser} />} />
                <Route path="my-profile" element={<MyProfile user={user} setUser={setUser} />} />
            </Route>
        </Routes>
    );
}
