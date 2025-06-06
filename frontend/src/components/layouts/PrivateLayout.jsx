import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function PrivateLayout({ user, setUser }) {
    return (
        <div>
            <Header user={user} setUser={setUser} />
            <Sidebar user={user} setUser={setUser} />
            <main><Outlet /></main>
        </div>
    );
}
