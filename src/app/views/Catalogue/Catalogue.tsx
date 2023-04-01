
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProductService } from '../../services/ProductServices';
import { IProduct } from '../../interfaces/IProduct';



export default function Catalogue() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const productService=new ProductService();
    useEffect(() => {
        productService.getAll().then((data) => setProducts(data));
    }, []);

    const getSeverity = (product: IProduct) => {
        switch (product.stock) {

            case 1:
                return 'warning';

            case 0:
                return 'danger';

            default:
                return 'success';
        }
    };

    const itemTemplate = (product: IProduct) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`data:image/jpeg;base64,${product.foto}`} alt={product.nom_Producto} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.nom_Producto}</div>
                            <Rating value={product.stock} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.nom_Producto}</span>
                                </span>
                                <Tag value={product.stock} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.valor_unitario}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.stock === 0}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
        </div>
    )
}
        