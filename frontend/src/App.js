import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { getUser } from './services/auth';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <BrowserRouter>
            <AppRoutes user={user} setUser={setUser} />
        </BrowserRouter>
    );
}

export default App;
