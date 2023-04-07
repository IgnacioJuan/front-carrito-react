import { Route, Redirect, Switch } from "react-router-dom";
import { NavBar } from "../../common/NavBar";
import Home from "./home/Home";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { NavBarCliente } from "../../common/NavBarCliente";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const rol = userObj.rol;
  const enabled = userObj.enabled;
  const toast = useRef<Toast>(null);

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
                    <NavBar />
                    <Home />
                  </>
                ) : (
                  <>
                    <NavBarUserDisabled />
                  </>
                )}
              </Route>
              <Route path="/login">
                {rol === 1 && enabled === true ? (
                  <NavBarCliente />
                ) : rol === 2 && enabled === true ? (
                  <NavBar />
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="*">
                {rol === 1 && enabled === true ? (
                  <NavBarCliente />
                ) : rol === 2 && enabled === true ? (
                  <NavBar />
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
