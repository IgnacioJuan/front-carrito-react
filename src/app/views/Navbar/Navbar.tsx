import React, { useState } from 'react';
import "../../styles/NavbarHome.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [navToggler, setNavToggler] = useState(false);
    const closeNavbar = () => setNavToggler(false);
    const { totalCount } = useSelector((state: any) => state?.cart);
    return (
        <>
            <nav className='navbar bg-dark'>
                <div className='container'>
                    <div className='navbar-content'>
                        <div className='brand-and-toggler flex flex-sb'>
                            <a href="/home" className='navbar-brand text-uppercase fw-7 text-white ls-2 fs-22'>HOME</a>
                            <button type="button" className='navbar-open-btn text-white' onClick={() => setNavToggler(!navToggler)}>
                                <FaBars size={30} />
                            </button>

                            <div className={navToggler ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
                                <button type="button" className='navbar-close-btn text-white' onClick={closeNavbar}>
                                    <FaTimes size={30} />
                                </button>
                                <ul className='navbar-nav'>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/product">
                                            PRODUCT
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/category">
                                            CATEGORY
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/catalogue">
                                            CATALOGUE
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/person">
                                            PERSON
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/rol">
                                            ROL
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/user">
                                            USER
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className="nav-link text-white ls-1 text-uppercase fw-6 fs-22" to="/cart">
                                            CART {totalCount}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar