import { AuthCard } from "../login/components/AuthCard";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/context/AuthContext";
import { AuthService } from "../../../services/Auth/AuthService";
import { Toast } from "primereact/toast";

export function Login() {
  const toast = useRef<Toast>(null);

  const showError = (errorPrincipal: string, detalleError: string) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };

  const { dispatchUser }: any = useContext(AuthContext);
  const [auth, setAuth] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const resp = await AuthService.login(auth);
      const rol = resp.rol;
      const enabled = resp.enabled;
      const id = resp.persona.id_persona;

      sessionStorage.setItem(
        "user",
        JSON.stringify({ id, rol, enabled, loggedIn: true })
      );
      dispatchUser({ type: "login", payload: resp.data });
      history.replace("/dashboard/home");
    } catch (error) {
      showError("ERROR", "Credenciales incorrectas");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <AuthCard>
        <form onSubmit={handleSubmit} autoComplete="off">
          <br />
          <div className="mb-2 p-1 d-flex border rounded">
            <input
              autoFocus
              className="form-control border-0 txt-input"
              name="username"
              placeholder="Usuario"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-2 p-1 d-flex border rounded">
            <input
              className="form-control border-0  txt-input"
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="row d-flex justify-content-between mt-3 mb-2">
            <div className="mb-3">
              <div className="form-check ms-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="mycheckbox"
                />
                <label className="form-check-label" htmlFor="mycheckbox">
                  Recordar
                </label>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>
      </AuthCard>
    </>
  );
}
