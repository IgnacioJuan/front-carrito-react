import React, { useContext, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProductContext } from "./ProductContext";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

import "../../styles/Product.css";
import { useLocation } from "react-router-dom";
const ProductsForm = (props: any) => {

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
    return (
        <>
            {/* Dialogo para la creacion de una product*/}
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            <Dialog
                className="DialogoCentrado"
                header="AGREGAR PRODUCTO"
                modal={true}
                visible={isVisible}
                contentStyle={{ overflow: "visible" }}
                onHide={() => {
                    setIsVisible(false);
                    setEditProduct(null);
                }}
            >


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
