import { Link, Outlet } from 'react-router-dom';
import cubosLogo from '../assets/logo-cubos.svg';
import lightIcon from '../assets/sun.svg';
import Footer from './Footer';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg main-nav">
        <div className="container-fluid">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center">
              <Link to="/">   <img src={cubosLogo} className='cubos-logo' /></Link>

              <p className="m-0 ms-3 site-title">Movies</p></div>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
              <button className="lightmode-button me-3">
                <img src={lightIcon} alt="Alterar modo" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  )
};
export default Header;