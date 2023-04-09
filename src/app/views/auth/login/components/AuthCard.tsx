import { ReactElement } from "react";
import { Card } from "primereact/card";
import "../../../../styles/Login.css";
interface Props {
  children: ReactElement;
}

export function AuthCard(props: Props) {
  return (
    <div className="containerL mt-4rem mycontainer">
        <Card id="cardLogin">
          <p id="pIniciar">INICIAR SESIÓN</p>
          <div className="d-flex justify-content-center">
            <div
              className="col-md-4 col-10"
              style={{ backgroundColor: "white", borderRadius: "15px" }}
            >
              <div className="shadow-sm rounded p-3">
                <div className="row">
                  <div className="col-xl-12 col-md-12">{props.children}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

  );
}
