import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

// import { Outlet } from 'react-router-dom';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';

// export default function PublicLayout() {
//     return (
//         <div className="layout">
//             <Header />
//             <div className="layout-body" style={{ display: "flex" }}>
//                 <Sidebar />
//                 <main style={{ flexGrow: 1, padding: "20px" }}>
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// }
