import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromCart } from '../../reducers/cart/cartSlice';
import { IProduct } from '../../interfaces/IProduct';

export const Cart = () => {
  const dispatch = useDispatch();
  const { productsList } = useSelector((state: any) => state?.cart);

  const handleRemoveProduct = (productId:any) => dispatch(removeProductFromCart(productId));

  return (
    <>
      <h2>Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((product: IProduct) => {
            return (
              <tr key={product.id_producto}>
                <th scope="row">{product.id_producto}</th>
                <td scope="row">{product.nom_Producto}</td>
                <td scope="row">{product.valor_unitario}</td>
                <td scope="row">{product.categoria.id_categoria}</td>
                <td scope="row"><button className="btn btn-danger" onClick={() => handleRemoveProduct(product.id_producto)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}