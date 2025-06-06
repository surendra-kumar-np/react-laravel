import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default function SurveyorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        setEmail('');
        setCaptcha('');
    }, []);

    const validateForm = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (!email || !password) {
            if (!email) setEmailError('This field is required.');
            if (!password) setPasswordError('This field is required.');
            return;
        }

        // 🔐 Encrypt password using AES before sending
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'your_secret_key').toString();

        try {
            const response = await axios.post('http://localhost:8000/api/surveyor-login', {
                email,
                password: encryptedPassword,
                captcha,
            });

            // ✅ Login success response
            console.log('Login successful:', response.data);
            // Redirect or store token if needed

        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            // Optionally show error to user
        }
    };

    return (
        <div className="container-fluid login_admin">
            <div className="row">
                <div className="col-md-12 authentication-form-wrapper">
                    <div className="authentication-form mtop40">
                        <div className="login-container">
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-12">
                                    <div className="mobile-logo">
                                        <img src="/assets/images/caap-patna-mob.jpg" alt="" />
                                        <h3>Clean Air Dashboard</h3>
                                    </div>

                                    <div className="login-form">
                                        <h1>SURVEYOR LOGIN</h1>
                                        <form onSubmit={validateForm}>
                                            <div className="form-group mB15 mT10">
                                                <div className="form-input-field">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        maxLength={75}
                                                    />
                                                    <label htmlFor="email" title="Email Address" data-title="Email Address"></label>
                                                    <p style={{ color: 'red', fontSize: '12px' }}>{emailError}</p>
                                                </div>
                                            </div>

                                            <div className="form-group mB15">
                                                <div className="form-input-field">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <label htmlFor="password" title="Password" data-title="Password"></label>
                                                    <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>
                                                </div>
                                            </div>

                                            <div className="form-input-field mB15 mT10 captcha_div">
                                                <img
                                                    src="/assets/captcha_image/sample.jpg"
                                                    style={{ width: '120px', height: '40px', border: 0 }}
                                                    alt="captcha"
                                                />
                                                <a href="#refresh" className="captcha-refresh">
                                                    <i className="glyphicon glyphicon-refresh"></i>
                                                </a>
                                                <input
                                                    type="text"
                                                    value={captcha}
                                                    onChange={(e) => setCaptcha(e.target.value)}
                                                    maxLength={6}
                                                />
                                            </div>

                                            <a className="d-block text-right mT5" href="/forgot-password">
                                                Forgot Password?
                                            </a>

                                            <button type="submit" className="btn btn-info btn-block">
                                                Login
                                            </button>
                                        </form>
                                    </div>

                                    <div className="login-links">
                                        <a href="/login">Go to Other Login</a>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-md-7 col-sm-7 d-sm-none">
                                    <div className="login-logo">
                                        <img src="/assets/images/caap-patna.jpg" alt="" />
                                        <h3>Clean Air Dashboard</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-lg-6 font12">
                                    In case of any queries, please contact us at{' '}
                                    <a href="mailto:support.cleanair@bihar.gov.in">
                                        support[dot]cleanair[at]bihar[dot]gov[dot]in
                                    </a>
                                </div>
                                <div className="col-lg-6 text-right">
                                    <a href="/privacy-policy" target="_blank">
                                        Privacy Policy
                                    </a>{' '}
                                    |{' '}
                                    <a href="#" onClick={() => alert('Disclaimer popup')}>
                                        Disclaimer
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
