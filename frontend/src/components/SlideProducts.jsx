import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SlideProducts({ type = "Related" }) {
  useEffect(() => {
    if (window.$ && window.$.fn.owlCarousel) {
      window.$('.related-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 2000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          992: { items: 4 }
        }
      });
    }
  }, []);

  return (
    <div className="container-fluid py-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">You May Also Like</span>
      </h2>
      <div className="row px-xl-5">
        <div className="col">
          <div className="related-carousel owl-carousel">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="product-item bg-light">
                <div className="product-img position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={`assets/img/product-${idx}.jpg`}
                    alt={`Product ${idx}`}
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
                    {Array(5).fill().map((_, i) => (
                      <small key={i} className="fa fa-star text-primary mr-1"></small>
                    ))}
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
