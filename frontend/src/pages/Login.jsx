import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getUser, getCsrfCookie } from '../services/auth';

export default function Login({ setUser, user }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const loadCaptcha = () => {
        const timestamp = new Date().getTime();
        setCaptchaImage(`http://localhost:8000/api/captcha-image?${timestamp}`);
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        } else {
            setEmail('');
            setPassword('');
            setCaptcha('');
            setEmailError('');
            setPasswordError('');
            setCaptchaError('');
            setGeneralError('');
            loadCaptcha();
        }
        // eslint-disable-next-line
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');
        setCaptchaError('');
        setGeneralError('');

        let hasError = false;
        if (!email) {
            setEmailError('This field is required.');
            hasError = true;
        }
        if (!password) {
            setPasswordError('This field is required.');
            hasError = true;
        }
        if (!captcha) {
            setCaptchaError('Captcha is required.');
            hasError = true;
        }
        if (hasError) return;

        try {
            await getCsrfCookie();
            const response = await login({ email, password, captcha });
            const token = response.data.token;
            localStorage.setItem('token', token);

            const userResponse = await getUser();
            if (setUser) setUser(userResponse.data);

            navigate('/dashboard', { replace: true });
        } catch (error) {
            if (error.response?.data) {
                const payload = error.response.data;
                const errors = payload.errors || {};

                if (errors.email) setEmailError(errors.email[0]);
                if (errors.password) setPasswordError(errors.password[0]);
                if (errors.captcha) setCaptchaError(errors.captcha[0]);
                if (payload.message && typeof payload.message === 'string') {
                    setGeneralError(payload.message);
                }
            } else {
                setGeneralError('Login failed. Please try again.');
            }
            loadCaptcha();
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
                                        <img src="/assets/images/caap-patna-mob.jpg" alt="Logo" />
                                        <h3>Clean Air Dashboard</h3>
                                    </div>

                                    <div className="login-form">
                                        <h1>USER LOGIN</h1>

                                        {/* Show a general error if present */}
                                        {generalError && (
                                            <p style={{ color: 'red', marginBottom: '10px' }}>
                                                {generalError}
                                            </p>
                                        )}

                                        <form onSubmit={handleSubmit} noValidate>
                                            {/* Email Field */}
                                            <div className="form-group mB15 mT10">
                                                <div className="form-input-field">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        maxLength={75}
                                                        placeholder="Email Address"
                                                        autoComplete="username"
                                                    />
                                                    <p style={{ color: 'red', fontSize: '12px' }}>
                                                        {emailError}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Password Field */}
                                            <div className="form-group mB15">
                                                <div className="form-input-field">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Password"
                                                        autoComplete="current-password"
                                                    />
                                                    <p style={{ color: 'red', fontSize: '12px' }}>
                                                        {passwordError}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CAPTCHA Field */}
                                            <div
                                                className="form-input-field mB15 mT10 captcha_div"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}
                                            >
                                                <img
                                                    src={captchaImage}
                                                    alt="captcha"
                                                    style={{ width: '120px', height: '40px', border: 0 }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={loadCaptcha}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: '18px'
                                                    }}
                                                    aria-label="Refresh Captcha"
                                                >
                                                    ⟳
                                                </button>
                                                <input
                                                    type="text"
                                                    value={captcha}
                                                    onChange={(e) => setCaptcha(e.target.value)}
                                                    maxLength={6}
                                                    placeholder="Enter Captcha"
                                                />
                                            </div>
                                            <p style={{ color: 'red', fontSize: '12px' }}>
                                                {captchaError}
                                            </p>

                                            {/* Forgot Password Link */}
                                            <Link className="d-block text-right mT5" to="/forgot-password">
                                                Forgot Password?
                                            </Link>

                                            {/* Submit Button */}
                                            <button type="submit" className="btn btn-info btn-block">
                                                Login
                                            </button>
                                        </form>
                                    </div>

                                    <div className="login-links">
                                        <Link to="/surveyor-login">Go to Other Login</Link>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-md-7 col-sm-7 d-sm-none">
                                    <div className="login-logo">
                                        <img
                                            src="/assets/images/caap-patna.jpg"
                                            alt="Clean Air Dashboard"
                                        />
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
                                    <a
                                        href="/privacy-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
