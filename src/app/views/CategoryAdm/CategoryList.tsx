import "../../styles/Category.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import CategorysForm from "./CategoryForm";
import { CategoryContext } from "./CategoryContext";

export const CategoryList = () => {

  //Codigo para llenar la tabla segun un array
  const { findCategory, categorys } = useContext(CategoryContext);


  //Para el dialog de la creacion de categoryos
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);
  
  const saveCategory = (id:number) => { 
    findCategory(id);
    setIsVisible(true);
  };
  const newCategory = (e:any) => {
    setIsVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between " >
      <span className="text-xl text-900 font-bold">CATEGORY LIST</span>
      <Divider />
      <div
        id="busqueda"
        className=""
        style={{ alignItems: "center", paddingLeft:"75px" , paddingRight:"75px" }}
      >
        <Button onClick={newCategory}>New Category</Button>
      </div>
    </div>
  );
  //HTML
  return (
    <>
      <div >
        
      
        <Toast ref={toast} />
        {/* Card de el category y la tabla de categorys */}
        <div className="linea">
          <Card className="table">
            {/* Tabla de categorys */}
            <DataTable
             header={header}
              value={categorys}
              responsiveLayout="scroll"
              style={{ textAlign: "center" }}
              selectionMode="single"
              onSelectionChange={(e:any) => saveCategory(e.value.id_categoria)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_categoria" header="ID"></Column>
              <Column field="nombre_categoria" header="NAME"></Column>
              <Column field="descripcion_categoria" header="DESCRIPTION"></Column>
              
            </DataTable>
            <br />
            <Divider />
          </Card>
        </div>
      </div>
      <CategorysForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toast={toast}
      />
    </>
  );
};
