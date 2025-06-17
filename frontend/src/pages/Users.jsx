import React, { useEffect, useRef, useState } from 'react';
import { useFlashMessage } from '../services/FlashMessageContext';
import { userList, changeStatus as changeStatusApi } from '../services/auth';

export default function Users() {
    const { showMessage } = useFlashMessage();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        if (window.$ && window.$.fn.DataTable.isDataTable(tableRef.current)) {
            window.$(tableRef.current).DataTable().clear().destroy();
        }
        try {
            const res = await userList();
            setUsers(res.data.data || []);
        } catch {
            showMessage('Failed to load users', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && users.length > 0 && window.$) {
            const $ = window.$;
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().clear().destroy();
            }
            $(tableRef.current).DataTable();
        }
        return () => {
            if (window.$ && window.$.fn.DataTable.isDataTable(tableRef.current)) {
                window.$(tableRef.current).DataTable().clear().destroy();
            }
        };
    }, [loading, users]);

    const handleChangeStatus = async (id, currentStatus) => {
        try {
            await changeStatusApi(id);
            await fetchUsers();
            showMessage(
                `User status changed to ${currentStatus === '1' ? 'Inactive' : 'Active'}`,
                'success'
            );
        } catch {
            showMessage('Failed to change user status', 'error');
        }
    };

    return (
        <div id="wrapper" style={{ minHeight: '719px' }}>
            <div className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel_s custom-panel">
                            <div className="panel-body">
                                <div className="panel-header">
                                    <button
                                        className="btn btn-custom add-area-admin pull-right display-block"
                                        onClick={() => showMessage('Add Reviewer clicked!')}
                                    >
                                        Add Reviewer
                                    </button>
                                    <h1>
                                        Manage Reviewers{' '}
                                        <span>Here you can view, add, edit and deactivate Reviewers</span>
                                    </h1>
                                    <hr className="hr-panel-heading" />
                                </div>
                                <div className="table-responsive">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <table ref={tableRef} className="myTable table table-staff-ar display">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Organization</th>
                                                    <th>City</th>
                                                    <th>Status</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={7}>No users found.</td>
                                                    </tr>
                                                ) : (
                                                    users.map(user => (
                                                        <tr key={user.id}>
                                                            <td>{user.name || '-'}</td>
                                                            <td>{user.email || '-'}</td>
                                                            <td>{user.phone || '-'}</td>
                                                            <td>{user.organisation || '-'}</td>
                                                            <td>{user.city || '-'}</td>
                                                            <td>
                                                                <div className="onoffswitch">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="onoffswitch-checkbox"
                                                                        id={`c_${user.id}`}
                                                                        data-id={user.id}
                                                                        data-status={user.status}
                                                                        checked={user.status === '1'}
                                                                        onChange={() => handleChangeStatus(user.id, user.status)}
                                                                    />
                                                                    <label className="onoffswitch-label" htmlFor={`c_${user.id}`}></label>
                                                                </div>
                                                                <span className="hide">{user.status === '1' ? 'Active' : 'Inactive'}</span>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-default btn-icon"
                                                                    onClick={() => showMessage('Edit user not implemented')}
                                                                >
                                                                    <i className="fa fa-pencil-square-o"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
