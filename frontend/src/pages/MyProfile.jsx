import React, { useState } from 'react';
import { updateProfile, changePassword } from '../services/auth';
import { useFlashMessage } from '../services/FlashMessageContext';
// Utility function for time ago
function timeAgo(dateString) {
    // alert('timeAgo function called with dateString: ' + dateString);
    if (!dateString) return 'Not set';
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
}
export default function MyProfile({ user, setUser }) {
    const { showMessage } = useFlashMessage();
    const [profile, setProfile] = useState({
        name: user?.name || '',
        organisation: user?.organisation || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const [passwords, setPasswords] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });

        // Remove error for the current field only
        setFieldErrors(prev => {
            const updated = { ...prev };
            delete updated[name];
            return updated;
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
        try {
            const response = await updateProfile({
                name: profile.name,
                phone: profile.phone,
                organisation: profile.organisation,
            });

            if (response.status === 200) {
                setUser(prev => ({ ...prev, ...response.data.user }));
                showMessage(response.data.message, 'success');
            }
        } catch (error) {
            if (error.response?.status === 422 && error.response.data?.errors) {
                setFieldErrors(error.response.data.errors);
            } else {
                showMessage(error.response?.data?.message || 'Something went wrong while updating profile.');
            }
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        // Remove error for the current field only
        setFieldErrors(prev => {
            const updated = { ...prev };
            delete updated[name];
            return updated;
        });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });

        try {
            const response = await changePassword({
                old_password: passwords.old_password,
                new_password: passwords.new_password,
                new_password_confirmation: passwords.new_password_confirmation,
            });

            if (response.status === 200) {
                setUser(prev => ({ ...prev, ...response.data.user }));
                setPasswords({
                    old_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                });
                showMessage(response.data.message, 'success');
            }
        } catch (error) {
            if (error.response?.status === 422 && error.response.data?.errors) {
                setFieldErrors(error.response.data.errors);
            } else {
                showMessage(error.response?.data?.message || 'Something went wrong while updating profile.');
            }
        }
    };

    return (
        <div id="wrapper" style={{ minHeight: '719px' }}>
            <div className="content">
                <div className="row">
                    {/* Profile Form */}
                    <div className="col-md-7">
                        <div className="panel_s custom-panel1 edit_profile_panel">
                            <div className="panel-body">
                                <div className="panel-header">
                                    <h1>
                                        {profile.name}{' '}
                                        <span>Here you can update your profile information.</span>
                                    </h1>
                                    <hr className="hr-panel-heading" />
                                </div>
                                <form onSubmit={handleProfileSubmit} autoComplete="off" id="staff_profile_table">
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                className="label-up"
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={profile.name}
                                                onChange={handleProfileChange}
                                            />
                                            <label htmlFor="name" title="Full Name*" data-title="Full Name*"></label>
                                            {fieldErrors.name && (
                                                <div style={{ color: 'red', fontSize: '12px' }}>{fieldErrors.name[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                className="label-up"
                                                type="text"
                                                id="organisation"
                                                name="organisation"
                                                value={profile.organisation}
                                                onChange={handleProfileChange}
                                            />
                                            <label htmlFor="organisation" title="Organization - Department*" data-title="Organization - Department*"></label>
                                            {fieldErrors.organisation && (
                                                <div style={{ color: 'red', fontSize: '12px' }}>{fieldErrors.organisation[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                className="label-up"
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={profile.email}
                                                disabled
                                            />
                                            <label htmlFor="email" title="Email" data-title="Email"></label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                className="label-up"
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleProfileChange}
                                            />
                                            <label htmlFor="phone" title="Phone" data-title="Phone"></label>
                                            {fieldErrors.phone && (
                                                <div style={{ color: 'red', fontSize: '12px' }}>{fieldErrors.phone[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-custom">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Password Change Form */}
                    <div className="col-md-5">
                        <div className="panel_s update_password_panel">
                            <div className="panel-body">
                                <div className="panel-header">
                                    <h1>
                                        Change your password <span>Here you can change your password.</span>
                                    </h1>
                                    <hr className="hr-panel-heading" />
                                </div>
                                <form onSubmit={handlePasswordSubmit} autoComplete="off" id="staff_password_change_form">
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                type="password"
                                                id="old_password"
                                                name="old_password"
                                                value={passwords.old_password}
                                                onChange={handlePasswordChange}
                                            />
                                            <label htmlFor="old_password" title="Old password" data-title="Old password"></label>
                                            {fieldErrors.old_password && (
                                                <div style={{ color: 'red', fontSize: '12px' }}>{fieldErrors.old_password[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                type="password"
                                                id="new_password"
                                                name="new_password"
                                                value={passwords.new_password}
                                                onChange={handlePasswordChange}
                                            />
                                            <label htmlFor="new_password" title="New password" data-title="New password"></label>
                                            {fieldErrors.new_password && (
                                                <div style={{ color: 'red', fontSize: '12px' }}>{fieldErrors.new_password[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                type="password"
                                                id="new_password_confirmation"
                                                name="new_password_confirmation"
                                                value={passwords.new_password_confirmation}
                                                onChange={handlePasswordChange}
                                            />
                                            <label htmlFor="new_password_confirmation" title="Repeat new password" data-title="Repeat new password"></label>
                                            {fieldErrors.new_password_confirmation && (
                                                <div style={{ color: 'red', fontSize: '12px' }}>{fieldErrors.new_password_confirmation[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-custom">Save</button>
                                </form>
                            </div>
                            <div className="panel-footer">
                                Password last changed:&nbsp;
                                <span className="text-has-action" title={user?.password_changed_at}>
                                    {timeAgo(user?.password_changed_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
