
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { ProductService } from '../../services/ProductServices';
import { IProduct } from '../../interfaces/IProduct';
import { Card } from 'primereact/card';

import "../../styles/Catalogue.css";



export default function Catalogue() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const productService = new ProductService();
    const [layout, setLayout] = useState('grid');

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

    const listItem = (product: IProduct) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.categoria.nombre_categoria}</span>
                        </div>
                        <Tag value={product.stock} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="elementoImg "
                        >
                            <img className="imagen" src={`data:image/jpeg;base64,${product.foto}`} alt="Preview" />
                            <br />
                        </div>
                        {/* <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
                        <div className="text-2xl font-bold">{product.nom_Producto}</div>
                        {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.valor_unitario}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.stock === 0}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product: IProduct) => {
        return (
            <></>
            // <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            //     <div className="p-4 border-1 surface-border surface-card border-round">
            //         <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            //             <div className="flex align-items-center gap-2">
            //                 <i className="pi pi-tag"></i>
            //                 <span className="font-semibold">{product.categoria.nombre_categoria}</span>
            //             </div>
            //             <Tag value={product.stock} severity={getSeverity(product)}></Tag>
            //         </div>
            //         <div className="flex flex-column align-items-center gap-3 py-5">
            //                 <img  src={`data:image/jpeg;base64,${product.foto}`} alt="Preview" />
            //             {/* <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
            //             <div className="text-2xl font-bold">{product.nom_Producto}</div>
            //             {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
            //         </div>
            //         <div className="flex align-items-center justify-content-between">
            //             <span className="text-2xl font-semibold">${product.valor_unitario}</span>
            //             <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.stock === 0}></Button>
            //         </div>
            //     </div>
            // </div>


        );
    };

    const itemTemplate = (product: IProduct, layout: string) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
        </div>
    );
    return (
        // <div className="card">
        //     <DataView value={products} itemTemplate={itemTemplate} header={header()} />
        // </div>
        <div className="p-grid">
            {products.map(product => (
                <div key={product.id_producto} className="p-col-12 p-sm-6 p-md-4 p-lg-3">
                    <Card title={product.nom_Producto} subTitle="Subtitle" footer={footer} header={header} className="md:w-25rem">
                        <p className="m-0">
                            
                                <img className="imagen" src={`data:image/jpeg;base64,${product.foto}`} alt="Preview" />
                            
                            <p>{product.descripcion}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Valor Unitario: {product.valor_unitario}</p>
                        </p>
                    </Card>
                </div>
            ))}
        </div>
    )
}
