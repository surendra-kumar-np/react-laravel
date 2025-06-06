import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function PrivateLayout({ user, setUser }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // Agar token nahi hai, to login page par redirect karo
        return <Navigate to="/login" />;
    };
    return (
        <div>
            <Header user={user} setUser={setUser} />
            <Sidebar user={user} setUser={setUser} />
            <main><Outlet /></main>
        </div>
    );
}
