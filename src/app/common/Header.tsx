import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import "../styles/Header.css";
import Navbar from '../views/Navbar/Navbar';

export default function TemplateDemo() {

    return (
        <div className='header flex flex-col' id="header">
            

            <div className='container flex'>
                <div className='header-content'>
                    <h2 className='text-uppercase text-white op-07 fw-6 ls-2'>Web Shop</h2>
                    <h1 className='text-white fw-6 header-title'>
                        Welcome to this
                        <span className='text-brown'> shop experience </span>
                         in the web</h1>
                    <div className='btn-groups flex'>
                        <button type="button" className='btn-item bg-brown fw-4 ls-2'>Iniciar Seccion</button>
                        <button type="button" className='btn-item bg-dark fw-4 ls-2'>Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    )
}