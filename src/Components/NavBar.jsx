import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useJwt } from 'react-jwt';

function Navbar({ setLogged }) {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();



  const showSidebar = () => setSidebar(!sidebar);
  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('idUsuario');
    setLogged(false);
    navigate("/");
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='titulo'>
            IlogApp
          </div>

          <Link to='/' className="menu-bars botonSalir">
            <FaIcons.FaRegArrowAltCircleRight icon="fa-thin fa-arrow-right-from-bracket"
              onClick={logout}
            />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active overIndex' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;