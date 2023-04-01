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
import "../../styles/Product.css";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../interfaces/IProduct";
import { ICategory } from "../../interfaces/ICategory";
import { CategoryService } from "../../services/CategoryServices";

const ProductsForm = (props: any) => {
    //For the dialog state
    const { isVisible, setIsVisible, toast } = props;
    const [confirm, setConfirm] = useState(false);
    //Categorys variables
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    );
    const [categorys, setCategorys] = useState<ICategory[]>([]);
    const categoryService = new CategoryService();
    //For the products 
    const initialProductState = {
        id_producto: 0,
        nom_Producto: "",
        stock: 0,
        descripcion: "",
        valor_unitario: 0,
        foto: "",
        enabled: false,
        categoria: {},
    };
    const [productData, setProductData] = useState<IProduct>(initialProductState);
    const {
        createProduct,
        deleteProduct,
        updateProduct,
        editProduct,
        setEditProduct,
    } = useContext(ProductContext);
    useEffect(() => {
        if (editProduct)
            setProductData(editProduct);
            console.log(editProduct?.foto)
    }, [editProduct]);
    useEffect(() => {
        setProductData({
            ...productData
        });
    }, []);

    const guardarProduct = () => {
        console.log(productData);
        if (validateInputs()) {
            if (!editProduct) {
                createProduct(productData);
                toast.current.show({
                    severity: "success",
                    summary: "Succesful",
                    detail: "Succesful operation",
                    life: 3000,
                });
            } else {
                updateProduct(productData);
                toast.current.show({
                    severity: "success",
                    summary: "Succesful",
                    detail: "Succesful operation",
                    life: 3000,
                });
            }
            setProductData(initialProductState);
            setIsVisible(false);
        } else {
            toast.current.show({
                severity: "error",
                summary: "Form error",
                detail: "Complete all fields",
            });
        }
    };
    const _borrarProduct = () => {
        if (editProduct) {
            deleteProduct(productData);
            setProductData(initialProductState);
            setIsVisible(false);
            setConfirm(false);
            toast.current.show({
                severity: "error",
                summary: "Deleted",
                detail: "Deleted data",
            });
        }
    };
    //If the input in the form change 
    const onInputChange = (data: any, field: any) => {
        setProductData({ ...productData, [field]: data });

        console.log(productData);
    };
    const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
    const validateInputs = () => {
        if (!productData.nom_Producto
            || !productData.categoria
            || !productData.descripcion
            || !productData.foto
            || !productData.stock
            || !productData.valor_unitario) {
            setRequiredFieldsEmpty(true);
            return false;
        }
        return true;
    }

    //For the dropdown
    const selectedPacientTemplate = (option: any, props: any) => {
        if (option) {
            return <div className="flex align-items-center">{option.nombre_categoria}</div>;
        }
        return <span>{props.placeholder}</span>;
    };

    const categoryOptionTemplate = (option: any) => {
        return <>{option.nombre_categoria}</>;
    };
    function onCategoryChange(categoria: any) {
        setSelectedCategory(categoria);
    }
    useEffect(() => {
        categoryService.getAll().then(data => {
            setCategorys(data)
        })
    }, []);
    //To convert the image+

    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const fileUploadRef = useRef<any>(null);

    // function onFileSelect(event: any) {
    //     const file = event.files[0];
    //     const reader = new FileReader();
    //     reader.onload = function (e: any) {
    //         const buffer = e.target.result;
    //         const byteArray = new Uint8Array(buffer);
    //         onInputChange(byteArray, "foto");
    //     };
    //     reader.readAsArrayBuffer(file);
    // }
    function onFileSelect(event: any) {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = function (e: any) {
            setSelectedFile(e.target.result);
            const buffer = e.target.result;
            const byteArray = new Uint8Array(buffer);
            const base64String = bytesToBase64(byteArray);
            console.log(base64String);
            onInputChange(base64String, "foto");
        };
        reader.readAsArrayBuffer(file);


    }
   
    function bytesToBase64(bytes: Uint8Array): string {
        let binary = '';
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    function onClear() {
        setSelectedFile(null);
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
    }


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
                    setProductData(initialProductState)
                }}

                style={{ width: "800px" }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >

                <div className="card flex flex-wrap gap-3">
                    <div className="input-container">
                        <div className="p-inputgroup">
                            <span className="p-float-label card flex justify-content-center">
                                <InputText
                                    id="name"
                                    name="name"
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
                                <Dropdown
                                    filter
                                    valueTemplate={selectedPacientTemplate}
                                    itemTemplate={categoryOptionTemplate}
                                    value={productData.categoria}
                                    onChange={(e) => {
                                        onCategoryChange(e.value);
                                        onInputChange(e.target.value, "categoria");
                                    }}
                                    options={categorys}
                                    optionLabel="nombre_categoria"
                                    placeholder="Select a category"
                                />
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
                            <div className="card justify-content-center elementosDialog">
                                {selectedFile&& productData.foto  ? (
                                    <div className="elementoImg "
                                    >
                                        <img className="imagen" src={`data:image/jpeg;base64,${productData.foto}`} alt="Preview" />
                                        <br />
                                        <Button className="botonimagen" onClick={onClear}>Clear selection</Button>
                                    </div>
                                ) : (
                                <FileUpload
                                    className="BotonChose "
                                    ref={fileUploadRef}
                                    mode="basic"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    previewWidth={130}
                                    onSelect={onFileSelect}
                                    chooseLabel="Select image"

                                />
                                )} 
                            </div>
                        </div>
                    </div>
                </div>

                <div className="input-container2">
                    <Button
                        label="Accept"
                        icon="pi pi-check"
                        onClick={guardarProduct}
                        autoFocus
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-times"
                        onClick={() => { if (editProduct) setConfirm(true) }}
                        className="p-button-text"
                    />
                </div>
            </Dialog>

            {/* Dialogo de eliminacion */}
            <Dialog
                header="Do you want to delete this record?"
                visible={confirm}
                style={{ width: "30vw" }}
                onHide={() => setConfirm(false)}
            >
                <div className="input-container2">
                    <Button
                        label="Cancel"
                        icon="pi pi-times"
                        onClick={() => {
                            setConfirm(false);
                        }}
                        className="p-button-text"
                    />
                    <Button
                        label="Confirm"
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
