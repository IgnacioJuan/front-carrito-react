import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./home/Home";
import { Toast } from "primereact/toast";
import React, { useEffect, useState, useRef } from "react";
import { NavBarCliente } from "../../common/NavBarCliente";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";
import CategoryContextProvider from "../CategoryAdm/CategoryContext";
import { CategoryList } from "../CategoryAdm/CategoryList";
import ProductContextProvider from "../ProductsAdm/ProductContext";
import { ProductList } from "../ProductsAdm/ProductList";
import RolContextProvider from "../RolAdm/RolContext";
import { RolList } from "../RolAdm/RolList";
import Catalogue from "../Catalogue/Catalogue";
import { IProduct } from "../../interfaces/IProduct";
import { ProductService } from "../../services/ProductServices";
import { Cart } from "../..//views/Catalogue/Cart";
import PersonContextProvider from "../PersonAdm/PersonContext";
import { PersonList } from "../PersonAdm/PersonList";
import UserContextProvider from "../UserAdm/UserContext";
import { UserList } from "../UserAdm/UserList";
import {Navbar} from "../../common/NavBar";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const rol = userObj.rol;
  const enabled = userObj.enabled;
  const toast = useRef<Toast>(null);

  const [products, setProducts] = useState<IProduct[]>([]);
  const productService = new ProductService();
  useEffect(() => {
    productService.getAll().then((data) => setProducts(data));
  }, []);

  const showError = (errorPrincipal: string, detalleError: string) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <main>
        <div>
          <div>
            <Switch>
              <Route path="/dashboard/home">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <Home />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <Home />
                  </>
                ) : (
                  <>
                    <Navbar />
                  </>
                )}
              </Route>

              <Route path="/login">
                {rol === 1 && enabled === true ? (
                  <NavBarCliente />
                ) : rol === 2 && enabled === true ? (
                  <Navbar />
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/category">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <CategoryContextProvider>
                      <CategoryList></CategoryList>
                    </CategoryContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <CategoryContextProvider>
                      <CategoryList></CategoryList>
                    </CategoryContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/product">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <ProductContextProvider>
                      <ProductList />
                    </ProductContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <ProductContextProvider>
                      <ProductList />
                    </ProductContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/rol">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <RolContextProvider>
                      <RolList />
                    </RolContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <RolContextProvider>
                      <RolList />
                    </RolContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/person">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <PersonContextProvider>
                      <PersonList />
                    </PersonContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <PersonContextProvider>
                      <PersonList />
                    </PersonContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/user">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <UserContextProvider>
                      <UserList />
                    </UserContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <UserContextProvider>
                      <UserList />
                    </UserContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/catalogue">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <Catalogue  />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <Catalogue  />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/cart">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <Cart />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <Cart />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="*">
                {rol === 1 && enabled === true ? (
                  <NavBarCliente />
                ) : rol === 2 && enabled === true ? (
                  <Navbar />
                ) : (
                  <NavBarUserDisabled />
                )}
                <Redirect to="/dashboard/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
};
