import React from 'react';

import './App.css';
import Footer from './app/common/Footer';
import ProductContextProvider from './app/views/ProductsAdm/ProductContext';
import { ProductList } from './app/views/ProductsAdm/ProductList';

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Hola Mundo</h1>
<Router>
      <ProductContextProvider><ProductList></ProductList></ProductContextProvider>
      </Router>
    </>
  );
}

export default App;
