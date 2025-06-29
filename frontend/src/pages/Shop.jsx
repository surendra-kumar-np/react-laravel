import React from 'react';
import Filter from '../components/Filter';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';

export default function Shop() {
    return (
        <>
            <Breadcrumb pageTitle="Shop" />
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-4">
                        <Filter />
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div>
                                        <button className="btn btn-sm btn-light">
                                            <i className="fa fa-th-large"></i>
                                        </button>
                                        <button className="btn btn-sm btn-light ml-2">
                                            <i className="fa fa-bars"></i>
                                        </button>
                                    </div>
                                    <div className="ml-2">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-light dropdown-toggle"
                                                data-toggle="dropdown"
                                            >
                                                Sorting
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">
                                                    Latest
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Popularity
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Best Rating
                                                </a>
                                            </div>
                                        </div>
                                        <div className="btn-group ml-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-light dropdown-toggle"
                                                data-toggle="dropdown"
                                            >
                                                Showing
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a className="dropdown-item" href="#">
                                                    10
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    20
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    30
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                                    <div className="product-item bg-light mb-4">
                                        <div className="product-img position-relative overflow-hidden">
                                            <img
                                                className="img-fluid w-100"
                                                src={`/assets/img/product-${i + 1}.jpg`}
                                                alt={`Product ${i + 1}`}
                                            />
                                            <div className="product-action">
                                                <a className="btn btn-outline-dark btn-square" href="#">
                                                    <i className="fa fa-shopping-cart"></i>
                                                </a>
                                                <a className="btn btn-outline-dark btn-square" href="#">
                                                    <i className="far fa-heart"></i>
                                                </a>
                                                <a className="btn btn-outline-dark btn-square" href="#">
                                                    <i className="fa fa-sync-alt"></i>
                                                </a>
                                                <a className="btn btn-outline-dark btn-square" href="#">
                                                    <i className="fa fa-search"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="text-center py-4">
                                            <Link to="/product-details"
                                                className="h6 text-decoration-none text-truncate">
                                                Product Name Goes Here</Link>
                                            <div className="d-flex align-items-center justify-content-center mt-2">
                                                <h5>$123.00</h5>
                                                <h6 className="text-muted ml-2">
                                                    <del>$123.00</del>
                                                </h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center mb-1">
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small className="fa fa-star text-primary mr-1"></small>
                                                <small>(99)</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="col-12">
                                <nav>
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#">
                                                Previous
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                Next
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
