import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../reducers/cart/cartSlice';
import { IProduct } from '../../interfaces/IProduct';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

export const Cart = () => {
  const dispatch = useDispatch();
  const { productsList } = useSelector((state: any) => state?.cart);

  const handleRemoveProduct = (productId: any) => dispatch(removeProductFromCart(productId));
  const boton = () => {
    return {

    }
  }
  return (
    <>
      <h2>Cart</h2>
      
      <DataTable
        value={productsList}
        responsiveLayout="scroll"
        style={{ textAlign: "center" }}
        selectionMode="single"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="id_producto" header="ID"></Column>
        <Column field="nom_Producto" header="NAME"></Column>
        <Column field="stock" header="STOCK"></Column>
        <Column field="descripcion" header="DESCRIPTION"></Column>
        <Column field="valor_unitario" header="UNIT VALUE"></Column>
        {/* <Column field="foto" header="IMAGE" body={imageBodyTemplate} /> */}
        <Column field="categoria.nombre_categoria" header="CATEGORY"></Column>
        <Column header="ACTIONS" body={(rowData) => (
          <Button  onClick={() => handleRemoveProduct(rowData.id_producto)}>Delete</Button>
        )}
        />

      </DataTable>
    </>
  )
}