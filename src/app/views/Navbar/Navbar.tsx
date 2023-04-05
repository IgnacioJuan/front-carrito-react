import React, { useState } from 'react';
import "../../styles/NavbarHome.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [navToggler, setNavToggler] = useState(false);
    const closeNavbar = () => setNavToggler(false);

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
                                        <a href="/product" className='nav-link text-white ls-1 text-uppercase fw-6 fs-22'>Product</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a href="/category" className='nav-link text-white ls-1 text-uppercase fw-6 fs-22'>Category</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a href="/" className='nav-link text-white ls-1 text-uppercase fw-6 fs-22'>3</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a href="/" className='nav-link text-white ls-1 text-uppercase fw-6 fs-22'>4</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a href="/" className='nav-link text-white ls-1 text-uppercase fw-6 fs-22'>5</a>
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