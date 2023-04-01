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
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/IProduct";

export const ProductList = () => {

  //Codigo para llenar la tabla segun un array
  const { findProduct, products } = useContext(ProductContext);
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState();

  const redireccion = () => (
    navigate('/')
  )

  //Para el dialog de la creacion de productos
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);

  const saveProduct = (id: any) => {
    findProduct(id);
    setIsVisible(true);
  };
  const newProduct = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between " >
      <span className="text-xl text-900 font-bold">PRODUCTS LIST</span>
      <Divider />
      <div
        id="busqueda"
        style={{ alignItems: "center", paddingLeft: "75px", paddingRight: "75px" }}
      >
        <Button style={{ margin: "0 auto", textAlign: "center" }} onClick={newProduct}>New Product</Button>
      </div>
    </div>
  );


  const base64ToImage = (base64String: string) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const imageBodyTemplate = (rowData: IProduct) => {
    return <img src={base64ToImage(rowData.foto)} alt={rowData.nom_Producto} width="150" height="150" />;
  };
  //HTML
  return (
    <>
      <div >


        <Toast ref={toast} />
        {/* Card de el product y la tabla de products */}
        <div className="linea">
          <Card className="table">
            {/* Tabla de products */}
            <DataTable
              header={header}
              value={products}
              responsiveLayout="scroll"
              style={{ textAlign: "center" }}
              selectionMode="single"
              onSelectionChange={(e: any) => saveProduct(e.value.id_producto)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_producto" header="ID"></Column>
              <Column field="nom_Producto" header="NAME"></Column>
              <Column field="stock" header="STOCK"></Column>
              <Column field="descripcion" header="DESCRIPTION"></Column>
              <Column field="valor_unitario" header="UNIT VALUE"></Column>
              <Column field="foto" header="IMAGE" body={imageBodyTemplate} />
              <Column field="categoria.id_categoria" header="CATEGORY"></Column>

            </DataTable>
            <br />
            <Divider />
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
