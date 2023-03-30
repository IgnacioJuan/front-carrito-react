import React, { createContext, useEffect, useState } from 'react';
import { ProductService } from '../../services/ProductServices'
import { IProduct } from "../../interfaces/IProduct";

interface IProductContext {
    products: IProduct[];
    editProduct: IProduct | null;
    createProduct: (product: IProduct) => void;
    deleteProduct: (product: IProduct) => void;
    findProduct: (id: number) => void;
    updateProduct: (product: IProduct) => void;
    setEditProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  }
export const ProductContext = createContext<IProductContext>({
    products: [],
    editProduct: null,
    createProduct: (product: IProduct) => {},
    deleteProduct: (product: IProduct) => {},
    findProduct: (id: number) => {},
    updateProduct: (product: IProduct) => {},
    setEditProduct: () => {},
  });

const ProductContextProvider = (props:any) => {
    
    const productService = new ProductService();

    const [products, setProducts] = useState<IProduct[]>([]);

    const [editProduct, setEditProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        productService.getAll().then(data=>{
            setProducts(data)
          })  
    }, []);

    const createProduct = (product:any) => {
        productService.save(product).then(data=> {setProducts([...products, data])});
    };

    const deleteProduct = (id:any) => {
        productService.delete(id).
            then(() => setProducts(products.filter((p) => p.id_producto !== id)));
            setEditProduct(null);
    };
    
    const findProduct = (id:number)=> {
        // const product = products.find((p) => p.id_product === id);
        const product = products.find((p) => p.id_producto === id);
        setEditProduct(product || null);
    }
    const updateProduct=(product:any)=>{
        productService.update(product).then((data)=>setProducts(
            products.map(e=>(e.id_producto===product.id_producto?data:e))
        ));

        setEditProduct(null)
    };

    return (
        <ProductContext.Provider
            value={{
                createProduct,
                deleteProduct,
                findProduct,
                updateProduct,
                editProduct,
                products,
                setEditProduct,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}
export default ProductContextProvider;