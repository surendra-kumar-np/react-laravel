import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
export default function Header({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null); // update state in App
            navigate('/login'); // go to home page
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <>
            <div id="header">
                <div className="hide-menu">
                    <i className="fa fa-align-left"></i>
                </div>
                <div className="product-info">
                    <p className="product-name">Clean Air Dashboard</p>
                    <div className="profile-info">
                        <a href="https://cleanair.bihar.gov.in/admin/staff/edit_profile">
                            {user ? (
                                <>
                                    <span className="btn btn-sm btn-light text-bold">Welcome, {user.name}</span>
                                </>
                            ) : (
                                <>
                                    <span>
                                        Member Secretary (State Admin) ,Bihar State Pollution Control Board- State Admin{" "}
                                    </span>
                                </>
                            )}

                            {/* <a href="mailto:caap.bihar@gmail.com">caap.bihar@gmail.com</a> */}
                        </a>
                        {/* Uncomment if needed */}
                        {/* <ul className="staff_location"></ul> */}
                    </div>
                </div>
                <div id="logo">
                    {/* Logo images commented out */}
                    {/* <img src="" alt="" /> */}
                    {/* <img
            src="https://cleanair.bihar.gov.in/uploads/company/logo.jpg"
            alt=""
            style={{ width: 75, height: 55 }}
          /> */}
                </div>
                <nav>
                    <div className="small-logo">
                        <span className="text-primary">
                            <a
                                href="https://cleanair.bihar.gov.in/admin/"
                                className="logo img-responsive"
                            >
                                <img
                                    src="https://cleanair.bihar.gov.in/uploads/company/logo.jpg"
                                    className="img-responsive"
                                    alt="Clean Air Dashboard"
                                />
                            </a>
                        </span>
                    </div>
                    <div className="mobile-menu">
                        <button
                            type="button"
                            className="navbar-toggle visible-md visible-sm visible-xs mobile-menu-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#mobile-collapse"
                            aria-expanded="false"
                        >
                            <i className="fa fa-chevron-down"></i>
                        </button>
                        <ul className="mobile-icon-menu"></ul>
                        <div
                            className="mobile-navbar collapse"
                            id="mobile-collapse"
                            aria-expanded="false"
                            style={{ height: 0 }}
                            role="navigation"
                        >
                            <ul className="nav navbar-nav">
                                <li className="header-my-profile">
                                    <a href="https://cleanair.bihar.gov.in/admin/profile">
                                        My Profile
                                    </a>
                                </li>
                                <li className="header-my-timesheets">
                                    <a href="https://cleanair.bihar.gov.in/admin/staff/timesheets">
                                        My Timesheets
                                    </a>
                                </li>
                                <li className="header-edit-profile">
                                    <a href="https://cleanair.bihar.gov.in/admin/staff/edit_profile">
                                        Edit Profile
                                    </a>
                                </li>
                                <li className="header-newsfeed">
                                    <a href="#" className="open_newsfeed mobile">
                                        Share documents, ideas..
                                    </a>
                                </li>
                                <li className="header-logout">
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="btn btn-link p-0"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <ul className="nav navbar-nav navbar-right m-0">
                        <li className="partner-logo">
                            <img
                                src="https://cleanair.bihar.gov.in/uploads/logo/1623938678-IMG-20210305-WA0000_(1).jpg"
                                alt=""
                                style={{ width: 75, height: 55 }}
                            />
                            {/* <img src="" alt="" style={{ width: 75, height: 55 }} /> */}
                        </li>
                    </ul>
                </nav>

                {/* Language dropdown */}
                <ul className="dropdown-submenu pull-right customers-nav-item-languages">
                    <li>
                        <a href="#" tabIndex="-1">
                            English
                        </a>
                        <ul className="dropdown-menu dropdown-menu-left language-dropdown">
                            <li>
                                <a href="https://cleanair.bihar.gov.in/admin/staff/change_language/english">
                                    English
                                </a>
                            </li>
                            <li>
                                <a href="https://cleanair.bihar.gov.in/admin/staff/change_language/hindi">
                                    Hindi
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}
