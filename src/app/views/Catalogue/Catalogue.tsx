import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { ProductService } from "../../services/ProductServices";
import { IProduct } from "../../interfaces/IProduct";
import { useSelector, useDispatch } from "react-redux";

import "../../styles/Catalogue.css";
import InfoProduct from "./InfoProduct";
import { Toast } from "primereact/toast";
import { ICarDet } from "../../interfaces/ICartDet";
import { Card } from "primereact/card";

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
    setIsVisible(true);
  };

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
      <h2 id="h2Catalogue">Products's Catalogue</h2>
      <div className="row">
        {products.map((product) => {
          return (
            <Card id="cardCatalogue">
              <div key={product.id_producto} className="col-3 mt-3 cadr">
                <h4  id="pCatalogo">{product.nom_Producto}</h4>
                <img
                  id="imagCatalogue"
                  src={`data:image/jpeg;base64,${product.foto}`}
                  alt="Preview"
                />
                               <p id="pCatalogue">
                  <b id="pCatalogue">Description:</b> {product.descripcion}
                </p>
                <p id="pCatalogue">
                  <b id="pCatalogue">Price:</b> {product.valor_unitario}
                </p>
                <p id="pCatalogue">
                  <b id="pCatalogue">Category:</b> {product.categoria.nombre_categoria}
                </p>
                <Button id="btnCatalogue" onClick={() => agregar(product)}>
                  {productsList.find(
                    (pdt: ICarDet) =>
                      pdt.producto.id_producto === product.id_producto
                  )
                    ? "In the Car"
                    : "Add to Car"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <InfoProduct
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        productData={productData}
        toast={toast}
      />
    </>
  );
}
