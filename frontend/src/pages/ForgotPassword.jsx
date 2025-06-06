import { useEffect } from 'react';
// import '../assets/css/custom.css';

export default function ForgotPassword() {
    useEffect(() => {
        // jQuery-based input focus effect
        const handleBlur = (e) => {
            if (e.target.value !== "") {
                e.target.classList.add("label-up");
            } else {
                e.target.classList.remove("label-up");
            }
        };

        const emailInput = document.getElementById("email");
        const captchaInput = document.getElementById("captcha");

        if (emailInput) emailInput.addEventListener("blur", handleBlur);
        if (captchaInput) captchaInput.addEventListener("blur", handleBlur);

        // Refresh captcha
        const refreshCaptcha = document.querySelector(".captcha-refresh");
        if (refreshCaptcha) {
            refreshCaptcha.addEventListener("click", () => {
                fetch("/refreshcaptcha.html")
                    .then(res => res.text())
                    .then(html => {
                        const imageCaptcha = document.getElementById("image_captcha");
                        if (imageCaptcha) imageCaptcha.innerHTML = html;
                    });
            });
        }

        // clear fields
        if (emailInput) emailInput.value = "";
        if (captchaInput) captchaInput.value = "";

        return () => {
            if (emailInput) emailInput.removeEventListener("blur", handleBlur);
            if (captchaInput) captchaInput.removeEventListener("blur", handleBlur);
        };
    }, []);

    return (
        <div className="container-fluid authentication forgot-password">
            <div className="row">
                <div className="col-md-12">
                    <form
                        autoComplete="off"
                        action="http://localhost/clean_air/admin/authentication/forgot_password"
                        method="post"
                    >
                        <div className="login-container">
                            <div className="row">
                                <div className="col-lg-5 col-md-5 col-sm-12">
                                    <div className="mobile-logo">
                                        <img src="/assets/images/caap-patna-mob.jpg" alt="" />
                                        <h3>Clean Air Dashboard</h3>
                                    </div>
                                    <div className="login-form">
                                        <div className="form-group">
                                            <h1>
                                                <abbr className="text-uppercase">Forgot Password</abbr>
                                                <span>Enter your email ID to recover your password</span>
                                            </h1>
                                        </div>

                                        <div className="form-input-field mB15 mT10">
                                            <input
                                                maxLength="50"
                                                type="email"
                                                required
                                                id="email"
                                                name="email"
                                            />
                                            <label htmlFor="email" title="Email Address" data-title="Email Address"></label>
                                        </div>

                                        <div className="form-input-field mB15 mT10 captcha_div">
                                            <div id="image_captcha">
                                                <img
                                                    id="Imageid"
                                                    src="/assets/captcha_image/1749028299.9119.jpg"
                                                    alt="captcha"
                                                    style={{ width: "120px", height: "40px", border: 0 }}
                                                />
                                            </div>
                                            <a href="#!" className="captcha-refresh">
                                                <i className="glyphicon glyphicon-refresh"></i>
                                            </a>
                                            <input type="text" name="captcha" id="captcha" maxLength="6" />
                                        </div>

                                        <div className="form-field">
                                            <button type="submit" className="btn btn-info btn-block">
                                                Recover Password
                                            </button>
                                        </div>

                                        <div className="input-field mT20">
                                            <span className="d-block text-center font12" style={{ color: '#314e73' }}>
                                                Back to login? Click <a href="/login">here</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-7 col-md-7 col-sm-7 d-sm-none">
                                    <div className="login-logo">
                                        <img src="/assets/images/caap-patna.jpg" alt="" />
                                        <h3>Clean Air Dashboard</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="font12 d-block pT18 footer-contact">
                        In case of any queries, please contact us at{" "}
                        <a href="mailto:support.cleanair@bihar.gov.in">support[dot]cleanair[at]bihar[dot]gov[dot]in</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
