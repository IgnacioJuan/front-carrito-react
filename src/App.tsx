import React, { useReducer } from "react";
import "./App.css";
import { Footer } from "./app/common/Footer";
import Header from "./app/common/Header";

import { ProductList } from "./app/views/ProductsAdm/ProductList";
import { PersonList } from "./app/views/PersonAdm/PersonList";
import { RolList } from "./app/views/RolAdm/RolList";
import { CategoryList } from "./app/views/CategoryAdm/CategoryList";
import { UserList } from "./app/views/UserAdm/UserList";

import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./app/views/dashboard/home/Home";
import { NotFound } from "./app/views/NotFound";
import Catalogue from "./app/views/Catalogue/Catalogue";

import PersonContextProvider from "./app/views/PersonAdm/PersonContext";
import RolContextProvider from "./app/views/RolAdm/RolContext";
import ProductContextProvider from "./app/views/ProductsAdm/ProductContext";
import CategoryContextProvider from "./app/views/CategoryAdm/CategoryContext";
import UserContextProvider from "./app/views/UserAdm/UserContext";

function App() {
  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />{" "}
          </Route>
          <Route exact path="/category">
            <CategoryContextProvider>
              <CategoryList></CategoryList>
            </CategoryContextProvider>
          </Route>
          <Route path="/product">
            <ProductContextProvider>
              <ProductList />
            </ProductContextProvider>
          </Route>
          <Route path="/person">
            <PersonContextProvider>
              <PersonList />
            </PersonContextProvider>
          </Route>

          <Route path="/rol">
            <RolContextProvider>
              <RolList />
            </RolContextProvider>
          </Route>
          <Route path="/user">
            <UserContextProvider>
              <UserList />
            </UserContextProvider>
          </Route>

          <Route path="/catalogue">
            <Catalogue />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App;
