import React, { useState } from 'react';
import { updateProfile, changePassword } from '../services/auth';
import { useFlashMessage } from '../services/FlashMessageContext';

export default function MyProfile({ user, setUser }) {
    const { showMessage } = useFlashMessage();
    const [profile, setProfile] = useState({
        name: user?.name || '',
        organisation: user?.organisation || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const [passwords, setPasswords] = useState({
        oldpassword: '',
        newpassword: '',
        newpassword_confirmation: '',
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
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
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setPasswordError('');
        setPasswordSuccess('');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwords.newpassword !== passwords.newpassword_confirmation) {
            setPasswordError('New passwords do not match!');
            return;
        }

        try {
            const response = await changePassword({
                oldpassword: passwords.oldpassword,
                newpassword: passwords.newpassword,
                newpassword_confirmation: passwords.newpassword_confirmation,
            });

            if (response.status === 200) {
                setUser(prev => ({ ...prev, ...response.data.user }));
                setPasswordSuccess('Password changed successfully!');
                setPasswords({
                    oldpassword: '',
                    newpassword: '',
                    newpassword_confirmation: '',
                });
            } else {
                setPasswordError(response.data.message || 'Failed to change password.');
            }
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Something went wrong while changing password.');
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
                                                disabled
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
                                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                                {passwordSuccess && <div style={{ color: 'green' }}>{passwordSuccess}</div>}
                                <form onSubmit={handlePasswordSubmit} autoComplete="off" id="staff_password_change_form">
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                type="password"
                                                id="oldpassword"
                                                name="oldpassword"
                                                value={passwords.oldpassword}
                                                onChange={handlePasswordChange}
                                            />
                                            <label htmlFor="oldpassword" title="Old password" data-title="Old password"></label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                type="password"
                                                id="newpassword"
                                                name="newpassword"
                                                value={passwords.newpassword}
                                                onChange={handlePasswordChange}
                                            />
                                            <label htmlFor="newpassword" title="New password" data-title="New password"></label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-input-field">
                                            <input
                                                type="password"
                                                id="newpassword_confirmation"
                                                name="newpassword_confirmation"
                                                value={passwords.newpassword_confirmation}
                                                onChange={handlePasswordChange}
                                            />
                                            <label htmlFor="newpassword_confirmation" title="Repeat new password" data-title="Repeat new password"></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-custom">Save</button>
                                </form>
                            </div>
                            <div className="panel-footer">
                                Password last changed:&nbsp;
                                <span className="text-has-action" title={user?.password_changed_at}>
                                    {user?.password_changed_at
                                        ? `${Math.floor(
                                            (Date.now() - new Date(user.password_changed_at)) / (1000 * 60 * 60 * 24 * 365)
                                        )} years ago`
                                        : 'Not set'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
