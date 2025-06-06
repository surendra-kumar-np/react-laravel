import React, { useEffect } from 'react';

export default function Vendor() {
  useEffect(() => {
    // Check if jQuery and OwlCarousel are available
    if (window.$ && window.$.fn.owlCarousel) {
      window.$('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 2000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        responsive: {
          0: { items: 2 },
          576: { items: 3 },
          768: { items: 4 },
          992: { items: 5 }
        }
      });
    }
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col">
          <div className="vendor-carousel owl-carousel">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-light p-4">
                <img src={`/assets/img/vendor-${i + 1}.jpg`} alt={`Vendor ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
