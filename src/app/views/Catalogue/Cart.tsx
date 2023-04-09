import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from "react";

import { removeProductFromCart } from '../../reducers/cart/cartSlice';
import { IProduct } from '../../interfaces/IProduct';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { ICarDet } from '../../interfaces/ICartDet';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { ICart } from '../../interfaces/ICart';
import { CartService } from '../../services/CartService';
import { DetCartService } from '../../services/DetCartService';
import CartList from '../Carts/CartList';

export const Cart = () => {
  //Capturar id_persona de session Storage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const id_persona = userObj.id;
  useEffect(() => {
    console.log(id_persona)
}, []);
  //Mensajes de alerta
  const toast: any = useRef(null);
  //Para acceder al storage
  const dispatch = useDispatch();
  const { productsList } = useSelector((state: any) => state?.cart);
  //Metodo para obtener el subtotal del carrito
  const subtotal = productsList.reduce((acc: any, current: any) => acc + current.valor_total, 0);


  //Metodos para la imagen
  const handleRemoveProduct = (productId: any) => dispatch(removeProductFromCart(productId));
  const base64ToImage = (base64String: string) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const imageBodyTemplate = (rowData: ICarDet) => {
    return <img className="imagen" src={base64ToImage(rowData.producto.foto)} alt={rowData.producto.nom_Producto} />;
  };
  //
  const cartService = new CartService();
  const detcartService = new DetCartService();
  const fecha=new Date();
  const guardar = () => {
    cartService.save({
      "enabled": true,
      "estado_carrito": "Pagado",
      "fecha_carrito": fecha,
      "valor_total": subtotal,
      "persona_carrito":{"id_persona":id_persona}
    }).then(result => {
      console.log(result)
      // Recorremos el array de productos del carrito y les asignamos el id_carrito obtenido
      productsList.forEach((producto: ICarDet) => {
        const productoConId = {
          ...producto,
          carrito: { id_carrito: result.id_carrito }

        };

        // Guardamos el detalle del producto en el carrito
        detcartService.save(productoConId).then(detCartResult => {
          console.log(detCartResult);
          handleRemoveProduct(productoConId.producto.id_producto)
        }).catch(detCartError => {
          console.error(detCartError);
        });
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      });
    }).catch(error => {
      console.error(error);
    });
  }
  //
  const footer = (
    <div className="flex flex-wrap justify-content-end gap">
      {productsList.length > 0 ? (
        <Button onClick={guardar} label="Tramitar pedido" icon="pi pi-check" />
      ) : (
        <Button label="No hay productos" disabled />
      )}
    </div>
  );
  return (
    <>
      <Toast ref={toast} />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", marginLeft: "80px" }}>
          <DataTable
            value={productsList}
            responsiveLayout="scroll"
            style={{ textAlign: "center" }}
            selectionMode="single"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="producto.foto" header="IMAGE" body={imageBodyTemplate} />
            <Column field="cantidad" header="CANTIDAD"></Column>
            <Column field="producto.nom_Producto" header="NAME"></Column>
            <Column field="producto.valor_unitario" header="UNIT VALUE"></Column>
            <Column field="producto.categoria.nombre_categoria" header="CATEGORY"></Column>
            <Column field="valor_total" header="TOTAL"></Column>
            <Column header="ACTIONS" body={(rowData) => (
              <Button onClick={() => {
                handleRemoveProduct(rowData.producto.id_producto);
                toast.current.show({
                  severity: "error",
                  summary: "Product removed",
                  detail: "Product removed from Cart",
                });
              }}>Delete</Button>
            )}
            />

          </DataTable>
        </div>
        <div style={{ width: "20%", position: "sticky", top: "20px", marginLeft: "20px" }}>
          <div className="card">
            <Card title="Your Cart" subTitle={`Subtotal: $${subtotal.toFixed(2)}`} footer={footer} className="md:w-25rem">
              <p className="m-0">
                Estas listo para realizar el pedido
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}