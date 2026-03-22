import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { CgProfile } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        Amigos da fauna
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end>
            <span className="nav-icon"><GoHome /></span>
            <span className="nav-label">Início</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/location">
            <span className="nav-icon"><FaLocationDot /></span>
            <span className="nav-label">Localização</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">
            <span className="nav-icon"><CgProfile /></span>
            <span className="nav-label">Perfil</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/About">
            <span className="nav-icon"><IoIosInformationCircle /></span>
            <span className="nav-label">Sobre</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
