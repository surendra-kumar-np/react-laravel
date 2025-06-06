import { Link } from 'react-router-dom';

export default function Breadcrumb({ pageTitle, pageSubTitle }) {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <Link to="/" className="breadcrumb-item text-dark">
              Home
            </Link>

            {/* If only pageTitle is provided */}
            {pageTitle && !pageSubTitle && (
              <span className="breadcrumb-item active">{pageTitle}</span>
            )}

            {/* If both pageTitle and pageSubTitle are provided */}
            {pageTitle && pageSubTitle && (
              <>
                <Link to="#" className="breadcrumb-item text-dark">
                  {pageTitle}
                </Link>
                <span className="breadcrumb-item active">{pageSubTitle}</span>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
