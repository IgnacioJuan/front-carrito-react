
import React, { useState, useRef, useEffect } from "react";
import { Button } from 'primereact/button';
import { ProductService } from '../../services/ProductServices';
import { IProduct } from '../../interfaces/IProduct';
import { useSelector, useDispatch } from 'react-redux';

import "../../styles/Catalogue.css";
import InfoProduct from './InfoProduct';
import { Toast } from "primereact/toast";
import { ICarDet } from "../../interfaces/ICartDet";



export default function Catalogue() {
    const [isVisible, setIsVisible] = useState(false);
    const toast = useRef(null);

    const [products, setProducts] = useState<IProduct[]>([]);
    const productService = new ProductService();
    useEffect(() => {
        productService.getAll().then((data) => setProducts(data));
    }, []);


    const { productsList } = useSelector((state: any) => state?.cart);

    const agregar = (producto: IProduct) => {
        setProductData(producto);
        setIsVisible(true)
    }

    const initialProductState = {
        id_producto: 0,
        nom_Producto: "",
        stock: 0,
        descripcion: "",
        valor_unitario: 0,
        foto: "",
        enabled: false,
        categoria: {
            id_categoria: 0,
            nombre_categoria: "",
            descripcion_categoria: "",
            enabled: true,
            producto: null,
        },
    };
    const [productData, setProductData] = useState<IProduct>(initialProductState);
    return (
        <>
            <Toast ref={toast} />
            <h2>Listado de productos</h2>
            <div className="row">
                {
                    products.map(product => {
                        return (
                            <div key={product.id_producto} className="col-3 mt-3 cadr">
                                <h4>{product.nom_Producto}</h4>
                                <img className="imagen" src={`data:image/jpeg;base64,${product.foto}`} alt="Preview" />

                                <p><b>Price:</b> {product.valor_unitario}</p>
                                <p><b>Category:</b> {product.categoria.nombre_categoria}</p>
                                <Button
                                    onClick={() => agregar(product)}
                                >
                                    {productsList.find((pdt: ICarDet) => pdt.producto.id_producto === product.id_producto) ? "In the Cart" : "Add to Cart"}
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
            <InfoProduct
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                productData={productData}
                toast={toast}
            />
        </>
    )
}
