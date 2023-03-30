import "../../styles/Product.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import ProductsForm from "./ProductForm";
import { ProductContext } from "./ProductContext";
import { useNavigate  } from "react-router-dom";

export const ProductList = () => {

  //Codigo para llenar la tabla segun un array
  const { findProduct, products } = useContext(ProductContext);
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState();

  const redireccion =()=>(
    navigate('/')
  )

  //Para el dialog de la creacion de productos
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);
  
  const saveProduct = (id:any) => { 
    findProduct(id);
    setIsVisible(true);
  };
  const newProduct = (e:any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };
  //HTML
  return (
    <>
      <div >
      <Button onClick={newProduct}>Añadir Producto</Button>
        <Toast ref={toast} />
        {/* Card de el product y la tabla de products */}
        <div className="linea">
          <Card className="table">
            <Divider align="left">
              <div className="inline-flex align-items-center">
                <b>Lista de productos</b>
                
              </div>
            </Divider>
            {/* Tabla de products */}
            <DataTable
              value={products}
              responsiveLayout="scroll"
              style={{ textAlign: "center" }}
              selectionMode="single"
              onSelectionChange={(e:any) => saveProduct(e.value.id_producto)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_producto" header="id_producto"></Column>
              
            </DataTable>

            <br />
            <Divider />
            {/* Boton para Confirmar los cambios */}
            <div style={{ paddingLeft: "40%", marginLeft:"50px"}}>
              <Button label="GUARDAR" style={{backgroundColor:"#22C55E",borderColor:"#22C55E"}} icon="pi pi-check" autoFocus onClick={redireccion}/>
            </div>
          </Card>
        </div>
      </div>
      <ProductsForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
      />
    </>
  );
};
