import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Sidebar({ user, setUser }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };
    return (
        <aside id="menu" className="sidebar">
            <ul className="nav metis-menu" id="side-menu">
                <li className="text-center pB10">
                    {/* <img src="https://cleanair.bihar.gov.in/assets/images/white-logo-placeholder.jpg" alt="" /> */}
                    {/* <img src="https://cleanair.bihar.gov.in/uploads/company/logo.jpg" alt="" /> */}
                </li>

                <li className="menu-item profile-link hide">
                    <a href="#" className="oflowH" aria-expanded="false">
                        <i className="material-icons menu-icon">account_circle</i>
                    </a>
                    <div className="profile-info">
                        <a href="https://cleanair.bihar.gov.in/admin/staff/edit_profile">
                            <span>Member Secretary</span>
                            <span>(State Admin)</span>
                            {/* <a href="mailto:caap.bihar@gmail.com">caap.bihar@gmail.com</a> */}
                        </a>
                        <ul className="staff_location">
                            <li>Bihar</li>
                        </ul>
                    </div>
                </li>

                <li className={`menu-item-dashboard ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <Link to="/dashboard">
                        <i className="fa fa-home menu-icon"></i>
                        <span className="menu-text">My Action Items</span>
                    </Link>
                </li>
                <li className={`menu-item-users ${location.pathname === '/users' ? 'active' : ''}`}>
                    <Link to="/users">
                        <i className="fa fa-user menu-icon"></i>
                        <span className="menu-text">Manage Users</span>
                    </Link>
                </li>
                <li className="menu-item-dashboardchecklist">
                    <a href="https://cleanair.bihar.gov.in/admin/dashboard/checklist" aria-expanded="false">
                        <i className="fa fa-home menu-icon"></i>
                        <span className="menu-text">Checklist</span>
                    </a>
                </li>

                <li className="menu-item-manage-geography">
                    <a href="#" aria-expanded="false">
                        <i className="fa fa-user menu-icon"></i>
                        <span className="menu-text">Manage Geo. &amp; Org.</span>
                        <span className="fa arrow"></span>
                    </a>
                    <ul className="nav nav-second-level collapse" aria-expanded="false">
                        <li className="sub-menu-item-region">
                            <a href="https://cleanair.bihar.gov.in/admin/region" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> City
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-org">
                            <a href="https://cleanair.bihar.gov.in/admin/staff/organization" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Organization
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-wm">
                            <a href="https://cleanair.bihar.gov.in/admin/manageward" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Geographical Unit
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-subregion">
                            <a href="https://cleanair.bihar.gov.in/admin/subregion" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Zone
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="menu-item-categories">
                    <a href="https://cleanair.bihar.gov.in/admin/issues_manage/" aria-expanded="false">
                        <i className="fa fa-list-alt menu-icon"></i>
                        <span className="menu-text">Manage Action Items</span>
                    </a>
                </li>

                <li className="menu-item-manage-user">
                    <a href="#" aria-expanded="false">
                        <i className="fa fa-user menu-icon"></i>
                        <span className="menu-text">Manage Users</span>
                        <span className="fa arrow"></span>
                    </a>
                    <ul className="nav nav-second-level collapse" aria-expanded="false">
                        <li className="sub-menu-item-ae-area">
                            <a href="https://cleanair.bihar.gov.in/admin/staff?role=ae-area" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> State Observer
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-ar">
                            <a href="https://cleanair.bihar.gov.in/admin/staff?role=ar" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Reviewer
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-at">
                            <a href="https://cleanair.bihar.gov.in/admin/staff?role=at" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Project Leader
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-ata">
                            <a href="https://cleanair.bihar.gov.in/admin/staff?role=ata" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Project Support
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-qc">
                            <a href="https://cleanair.bihar.gov.in/admin/staff?role=qc" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Surveyor QC
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-sv">
                            <a href="https://cleanair.bihar.gov.in/admin/staff?role=sv" target="">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Surveyor
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className={`menu-item-master_plan ${open ? 'active' : ''}`}>
                    <a
                        href="#"
                        aria-expanded={open}
                        onClick={e => {
                            e.preventDefault();
                            setOpen(!open);
                        }}
                    >
                        <i className="fa fa-file-pdf-o menu-icon"></i>
                        <span className="menu-text">City Action Plan</span>
                        <span className="fa arrow"></span>
                    </a>
                    <ul className={`nav nav-second-level collapse ${open ? 'in' : ''}`} aria-expanded={open}>
                        <li className="sub-menu-item-view_master_plan">
                            <a href="https://cleanair.bihar.gov.in/admin/cityplan/view">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> View City Action Plan
                                </span>
                            </a>
                        </li>
                        <li className="sub-menu-item-edit_master_plan">
                            <a href="https://cleanair.bihar.gov.in/admin/cityplan">
                                <span className="sub-menu-text">
                                    <i className="fa fa-angle-right mR10"></i> Edit City Action Plan
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="menu-item-report">
                    <a href="https://cleanair.bihar.gov.in/admin/report" aria-expanded="false">
                        <i className="fa fa-area-chart menu-icon"></i>
                        <span className="menu-text">Project Dashboard</span>
                    </a>
                </li>

                <li className="menu-item-atrreport">
                    <a href="https://cleanair.bihar.gov.in/admin/reportatr/atr_role_wise_report" aria-expanded="false">
                        <i className="fa fa-user-circle-o menu-icon"></i>
                        <span className="menu-text">ATR Report</span>
                    </a>
                </li>
                <li className={`menu-item-my-profile ${location.pathname === '/my-profile' ? 'active' : ''}`}>
                    <Link to="/my-profile">
                        <i className="fa fa-user-circle-o menu-icon"></i>
                        <span className="menu-text">My Profile</span>

                    </Link>
                </li>

                {user && (
                    <li>
                        <a href="logout" onClick={handleLogout} aria-expanded="false">
                            <i className="fa fa-power-off menu-icon"></i>
                            <span className="menu-text">Logout</span>
                        </a>
                    </li>
                )}

            </ul>

            <div className="profile-info powered-by hide">
                <span>An initiative by</span>
                <img src="https://cleanair.bihar.gov.in/assets/images/powered-by.png" alt="" />
            </div>
        </aside>
    );
}
