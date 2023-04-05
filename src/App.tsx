import React, { useReducer } from 'react';

import './App.css';
import {Footer} from './app/common/Footer';
import Header from './app/common/Header';

import ProductContextProvider from './app/views/ProductsAdm/ProductContext';
import { ProductList } from './app/views/ProductsAdm/ProductList';
import { PersonList } from './app/views/PersonAdm/PersonList';

import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryContextProvider from './app/views/CategoryAdm/CategoryContext';
import { CategoryList } from './app/views/CategoryAdm/CategoryList';
import Home from './app/views/dashboard/home/Home';
import { NotFound } from './app/views/NotFound';
import Catalogue from './app/views/Catalogue/Catalogue';
import PersonContextProvider from './app/views/PersonAdm/PersonContext';


function App() {

  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<CategoryContextProvider><CategoryList></CategoryList></CategoryContextProvider>} />
          <Route path="/product" element={<ProductContextProvider><ProductList/></ProductContextProvider>} />
          <Route path="/person" element={<PersonContextProvider><PersonList/></PersonContextProvider>} />
          <Route path="/catalogue" element={<Catalogue/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App;
