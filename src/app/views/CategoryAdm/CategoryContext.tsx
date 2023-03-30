import React, { createContext, useEffect, useState } from 'react';
import { CategoryService } from '../../services/CategoryServices'
import { ICategory } from "../../interfaces/ICategory";

interface ICategoryContext {
    categorys: ICategory[];
    editCategory: ICategory | null;
    createCategory: (category: ICategory) => void;
    deleteCategory:  (category: ICategory) => void;
    findCategory: (id: number) => void;
    updateCategory: (category: ICategory) => void;
    setEditCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
  }
export const CategoryContext = createContext<ICategoryContext>({
    categorys: [],
    editCategory: null,
    createCategory: (category: ICategory) => {},
    deleteCategory: (category: ICategory) => {},
    findCategory: (id: number) => {},
    updateCategory: (category: ICategory) => {},
    setEditCategory: () => {},
  });

const CategoryContextProvider = (props:any) => {
    
    const categoryService = new CategoryService();

    const [categorys, setCategorys] = useState<ICategory[]>([]);

    const [editCategory, setEditCategory] = useState<ICategory | null>(null);

    useEffect(() => {
        categoryService.getAll().then(data=>{
            setCategorys(data)
          })  
    }, []);

    const createCategory = (category:any) => {
        categoryService.save(category).then(data=> {setCategorys([...categorys, data])});
    };

    const deleteCategory =(category:any)=>{
        categoryService.delete(category).then((data)=>setCategorys(
            categorys.map(e=>(e.id_categoria===category.id_categoria?data:e))
        ));

        setEditCategory(null)
    };

    
    const findCategory = (id:number)=> {
        // const category = categorys.find((p) => p.id_category === id);
        const category = categorys.find((p) => p.id_categoria === id);
        setEditCategory(category || null);
    }
    const updateCategory=(category:any)=>{
        categoryService.update(category).then((data)=>setCategorys(
            categorys.map(e=>(e.id_categoria===category.id_categoria?data:e))
        ));

        setEditCategory(null)
    };

    return (
        <CategoryContext.Provider
            value={{
                createCategory,
                deleteCategory,
                findCategory,
                updateCategory,
                editCategory,
                categorys,
                setEditCategory,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
}
export default CategoryContextProvider;