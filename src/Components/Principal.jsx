import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


class Principal extends Component {
    render() {
        return (
<div className='body'>

            <div className="page">
                <div className='sidebar'>
                    <div>
                        <div className='sidebar-header'>
                            <div className='sidebar-logo-container'>
                                <div className='logo-container'>
                                    <FontAwesomeIcon icon={faCode} className='logo-side-bar' />
                                </div>
                                <div className='brand-name-container'>
                                    <p className='brand-name'>
                                        Claw<br />
                                        <span className='brand-subname'>
                                            Tech
                                        </span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='sidebar-body'>
                        <ul className='navigation-list'>
                            <li className='navigation-list-item'>
                                
                                
                                <a className="navigation-link" href='/list-prov'>
                                <FontAwesomeIcon icon={faUser} />Proveedores</a>
                                
                                    
                                    
                            </li>
                            <li className='navigation-list-item'>
                                <a className="navigation-link" href='/list-prov'>
                                    <i className="fad fa-user"></i>
                                    SubCats</a>
                            </li>
                            <li className='navigation-list-item'>
                                <a className="navigation-link" href='/list-prov'>
                                    <i class="fad fa-user"></i>
                                    Categprias</a>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className='content'>
                    <div className='navigationBar'>
                        <button id="sidebarToggle" className='btn sidebarToggle'>
                            <FontAwesomeIcon icon={faBars} />
                        </button>

                    </div>

                </div>
            </div>
</div>
        )
    }

}

export default Principal;