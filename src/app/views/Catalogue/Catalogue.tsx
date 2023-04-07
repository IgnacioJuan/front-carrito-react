
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProductService } from '../../services/ProductServices';
import { IProduct } from '../../interfaces/IProduct';
import { Card } from 'primereact/card';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../reducers/cart/cartSlice';

import "../../styles/Catalogue.css";



export default function Catalogue({ products }: { products: IProduct[] }) {
    // const [products, setProducts] = useState<IProduct[]>([]);
    const productService = new ProductService();
    const dispatch = useDispatch();

    const { productsList } = useSelector((state: any) => state?.cart);

    // useEffect(() => {
    //   productService.getAll().then((data) => setProducts(data));
    // }, []);

    const handleAddOrRemoveProduct = (productId: any) => {
        const product = products.find(product => product.id_producto === productId);
        if (productsList.find((pdt: any) => pdt.id_producto === productId)) {
            dispatch(removeProductFromCart(productId));
        } else {
            dispatch(addProductToCart(product));
        }
    };

    return (
        <>
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
                                <button
                                    className={`btn ${productsList.find((pdt: any) => pdt.id_producto === product.id_producto) ? "btn-danger" : "btn-success"}`}
                                    onClick={() => handleAddOrRemoveProduct(product.id_producto)}
                                >
                                    {productsList.find((pdt: any) => pdt.id_producto === product.id_producto) ? "Remove" : "Add"} to Cart
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
