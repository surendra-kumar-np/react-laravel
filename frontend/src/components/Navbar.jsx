import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <Link to="/" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                            </Link>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to="/" className="nav-item nav-link active">Home</Link>
                                    <Link to="/shop" className="nav-item nav-link">Shop</Link>
                                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <Link to="/wishlist" className="btn px-0">
                                        <i className="fas fa-heart text-primary"></i>
                                        <span
                                            className="badge text-secondary border= border-secondary rounded-circle"
                                            style={{ paddingBottom: '2px' , top: '-10px' }}
                                        >
                                            0
                                        </span>
                                    </Link>
                                    <Link to="/shopping-cart" className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary"></i>
                                        <span
                                            className="badge text-secondary border= border-secondary rounded-circle"
                                            style={{ paddingBottom: '2px' , top: '-10px' }}
                                        >
                                            0
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
