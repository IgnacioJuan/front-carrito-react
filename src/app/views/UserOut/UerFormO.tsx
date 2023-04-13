import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { PersonService } from "../../services/PersonServices";
import { UserService } from "../../services/UserServices";
import "../../styles/User.css";
import { IUser } from "../../interfaces/IUser";
import { IPerson } from "../../interfaces/IPerson";

const UserForm = (props: any) => {
  const { isVisible, setIsVisible, toast } = props;
  const initialPersonState: IPerson = {
    id_persona: 0,
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    sexo: "",
    telefono: "",
    celular: "",
    codigo_postal: "",
    enabled: true,
  };

  const initialUserState: IUser = {
    id_usuario: 0,
    username: "",
    password: "",
    persona: initialPersonState,
    rol: {
      rolId: 0,
      rolNombre: "",
      descripcion: "",
    },
  };

  const personService = new PersonService();
  const userService = new UserService();

  const [personData, setPersonData] = useState<IPerson>(initialPersonState);
  const [user, setUser] = useState<IUser>(initialUserState);

  const guardar = () => {
    personService
      .save(personData)
      .then((result) => {
        const userConId = {
          ...user,
          persona: { id_persona: result.id_persona },
          rol: { rolId: 1 },
        };
        userService
          .save(userConId)
          .then((userResult) => {
            console.log(userResult);
            toast.current.show({
              severity: "success",
              summary: "Succesful",
              detail: "Succesful operation",
              life: 3000,
            });
          })
          .catch((userError) => {
            console.error(userError);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onInputChange = (data: any, field: string) => {
    setPersonData({ ...personData, [field]: data });
  };

  const onInputChangeUser = (data: any, field: string) => {
    setUser({ ...user, [field]: data });
  };
    return (
      <>
        {/* Dialogo para la creacion de un usuario*/}
        <Dialog
          className="DialogoCentrado"
          header="NEW USER"
          modal={true}
          visible={isVisible}
          contentStyle={{ overflow: "visible" }}
          onHide={() => {
            setIsVisible(false);
          }}
          style={{
            width: "700px",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          <div className="card flex flex-wrap gap-3">
            <div className="input-container">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="cedula"
                    name="cedula"
                    onChange={(e) => onInputChange(e.target.value, "cedula")}
                  />
                  <label htmlFor="cedula">Identification Card</label>
                </span>
              </div>
            </div>

            <div className="input-container">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="name"
                    name="name"
                    onChange={(e) => onInputChange(e.target.value, "nombre")}
                  />
                  <label htmlFor="name">Name</label>
                </span>
              </div>
            </div>

            <div className="input-container">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="apellido"
                    name="apellido"
                    onChange={(e) => onInputChange(e.target.value, "apellido")}
                  />
                  <label htmlFor="lastname">LastName</label>
                </span>
              </div>
            </div>
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3">
            <div className="input-container2">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="email"
                    name="email"
                    onChange={(e) => onInputChange(e.target.value, "email")}
                  />
                  <label htmlFor="email">Email</label>
                </span>
              </div>
            </div>

            <div className="input-container2">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="sexo"
                    onChange={(e) => onInputChange(e.target.value, "sexo")}
                  />
                  <label htmlFor="Sex">Sex</label>
                </span>
              </div>
            </div>
            <div className="input-container2">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="telefono"
                    onChange={(e) => onInputChange(e.target.value, "telefono")}
                  />
                  <label htmlFor="Phone">Phone</label>
                </span>
              </div>
            </div>
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3">
            <div className="input-container3">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="Cellphone"
                    onChange={(e) => onInputChange(e.target.value, "celular")}
                  />
                  <label htmlFor="Cellphone">Cellphone</label>
                </span>
              </div>
            </div>
            <div className="input-container3">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="codigo postal"
                    onChange={(e) =>
                      onInputChange(e.target.value, "codigo_postal")
                    }
                  />
                  <label htmlFor="Portal Code">Portal Code</label>
                </span>
              </div>
            </div>
          </div>

          <div className="card flex flex-wrap gap-3">
            <div className="input-container">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <InputText
                    id="name"
                    name="name"
                    onChange={(e) =>
                      onInputChangeUser(e.target.value, "username")
                    }
                  />
                  <label htmlFor="username">Username</label>
                </span>
              </div>
            </div>
            <div className="input-container">
              <div className="p-inputgroup">
                <span className="p-float-label card flex justify-content-center">
                  <Password
                    id="password"
                    name="password"
                    style={{ fontSize: "15px" }}
                    onChange={(e) =>
                      onInputChangeUser(e.target.value, "password")
                    }
                  />
                  <label htmlFor="password">Password</label>
                </span>
              </div>
            </div>
          </div>

          <div className="input-container2">
            <Button
              label="Accept"
              icon="pi pi-check"
              onClick={guardar}
              autoFocus
              style={{
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                background: "black ",
              }}
            />
          </div>
        </Dialog>
      </>
    );
  };
export default UserForm;
