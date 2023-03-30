import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProductContext } from "./ProductContext";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import { classNames } from 'primereact/utils';

import "../../styles/Product.css";
import { useLocation } from "react-router-dom";
const ProductsForm = (props: any) => {


    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const { isVisible, setIsVisible, seleccion, toast, idondonto } = props;
    const [confirm, setConfirm] = useState(false);

    const initialProductState = {
        id_producto: 0,
        nom_Producto: "",
        stock: 0,
        descripcion: "",
        valor_unitario: 0,
        foto: 0,
        enabled: false,
        categoria: {},
    };
    const [productData, setProductData] = useState(initialProductState);

    const {
        createProduct,
        deleteProduct,
        // findProduct,
        updateProduct,
        editProduct,
        setEditProduct,
    } = useContext(ProductContext);

    useEffect(() => {
        setProductData({
            ...productData
            // ["id_odontograma"]: Varible_Del_Odontograma enviada,
        });
    }, [seleccion, isVisible]);

    const guardarProduct = () => {
        console.log(productData);
        if (!editProduct) {
            console.log("si");
            createProduct(productData);
            toast.current.show({
                severity: "success",
                summary: "Exito",
                detail: "Operacion Exitosa",
                life: 3000,
            });
        } else {
            updateProduct(productData);
        }
        setProductData(initialProductState);
        setIsVisible(false);
    };
    const _borrarProduct = () => {
        if (editProduct) {
            deleteProduct(productData.id_producto);
            setProductData(initialProductState);
            setIsVisible(false);
            setConfirm(false);
            toast.current.show({
                severity: "error",
                summary: "Eliminado",
                detail: "Datos eliminados",
            });
        }
    };
    //If the input in the form change 
    const onInputChange = (data: any, field: any) => {
        setProductData({ ...productData, [field]: data });

        console.log(productData);
    };
    //For the dropdown
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    //To convert the image
//      const [selectedFiles, setSelectedFiles] = useState([]);

//   const onUpload = (event) => {
//     let files = event.files;
//     let uploadedFiles = selectedFiles;

//     for (let file of files) {
//       let reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         uploadedFiles = [
//           ...uploadedFiles,
//           {
//             name: file.name,
//             type: file.type,
//             size: file.size,
//             data: reader.result,
//           },
//         ];
//         setSelectedFiles(uploadedFiles);
//       };
//     }
//   };

    return (
        <>
            {/* Dialogo para la creacion de una product*/}
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            <Dialog
                className="DialogoCentrado"
                header="NEW PRODUCT"
                modal={true}
                visible={isVisible}
                contentStyle={{ overflow: "visible" }}
                onHide={() => {
                    setIsVisible(false);
                    setEditProduct(null);
                }}

                style={{ width: "800px" }}
            >

                <div className="card flex flex-wrap gap-3">
                    <div className="input-container">
                        <div className="p-inputgroup">
                            <span className="p-float-label card flex justify-content-center">
                                <InputText
                                    id="nombre"
                                    name="nombre"
                                    value={productData.nom_Producto}
                                    onChange={(e) =>
                                        onInputChange(e.target.value, "nom_Producto")
                                    }
                                />
                                <label htmlFor="nombre">Name</label>
                            </span>
                        </div>
                    </div>

                    <div className="input-container">
                        <div className="p-inputgroup">
                            <span className="p-float-label card flex justify-content-center">

                                <InputNumber
                                    id="stock"
                                    name="stock"
                                    value={productData.stock}
                                    onChange={(e) =>
                                        onInputChange(e.value, "stock")
                                    }
                                />
                                <label htmlFor="stock">Stock</label>
                            </span>
                        </div>
                    </div>

                    <div className="input-container">
                        <div className="p-inputgroup">
                            <span className="p-float-label card flex justify-content-center">

                                <InputText
                                    id="description"
                                    name="description"
                                    value={productData.descripcion}
                                    onChange={(e) =>
                                        onInputChange(e.target.value, "descripcion")
                                    }
                                />
                                <label htmlFor="description">Description</label>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="card flex flex-wrap justify-content-center gap-3">
                    <div className="input-container2">
                        <div className="p-inputgroup">
                            <div className="card flex justify-content-center elementosDialog">
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                    placeholder="Select a Category" className="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>

                    <div className="input-container2">
                        <div className="p-inputgroup">
                            <span className="p-float-label card flex justify-content-center">

                                <InputNumber inputId="currency-us" value={productData.valor_unitario} onChange={(e) =>
                                    onInputChange(e.value, "valor_unitario")
                                } mode="currency" currency="USD" locale="en-US" />
                                <label htmlFor="stock">Unit Value</label>
                            </span>
                        </div>
                    </div>

                </div>
                <div className="card flex flex-wrap justify-content-center gap-3">
                    <div className="input-container3">
                        <div className="p-inputgroup">
                            <div className="card flex justify-content-center elementosDialog">
                                <FileUpload
                                    name="demo[]"
                                    url={"/api/upload"}
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                                    onUpload={onUpload}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="input-container3">
                        {selectedFiles.map((file) => (
                            <div key={file.name}>
                                <img src={file.data} alt={file.name} />
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div> */}
                </div>







                <div>
                    <Button
                        label="Aceptar"
                        icon="pi pi-check"
                        onClick={guardarProduct}
                        autoFocus
                    />
                    <Button
                        label="Borrar"
                        icon="pi pi-times"
                        onClick={() => setConfirm(true)}
                        className="p-button-text"
                    />
                </div>
            </Dialog>

            {/* Dialogo de eliminacion */}
            <Dialog
                header="Desea eliminar este registro?"
                visible={confirm}
                style={{ width: "25vw" }}
                onHide={() => setConfirm(false)}
            >
                <div>
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        onClick={() => {
                            setIsVisible(false);
                            setEditProduct(null);
                            setConfirm(false);
                        }}
                        className="p-button-text"
                    />
                    <Button
                        label="Confirmar"
                        icon="pi pi-check"
                        onClick={_borrarProduct}
                        autoFocus
                    />
                </div>
            </Dialog>
        </>
    );
};
export default ProductsForm;
