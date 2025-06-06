import React from 'react';
import { Link } from 'react-router-dom';

export default function Products({ type = "Featured" }) {
  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">{type} Products</span>
      </h2>
      <div className="row px-xl-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100" src={`/assets/img/product-${i + 1}.jpg`} alt={`Product ${i + 1}`} />
                <div className="product-action">
                  <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                  <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                  <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a>
                </div>
              </div>
              <div className="text-center py-4">
                <Link to="/product-details"
                  className="h6 text-decoration-none text-truncate">
                  Product Name Goes Here</Link>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star text-primary mr-1"></small>
                  <small className="fa fa-star-half-alt text-primary mr-1"></small>
                  <small className="far fa-star text-primary mr-1"></small>
                  <small>(99)</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
