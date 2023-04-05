import React, { createContext, useEffect, useState } from 'react';
import { RolService } from '../../services/RolService'
import { IRol } from "../../interfaces/IRol";

interface IRolContext {
    roles: IRol[];
    editRol: IRol | null;
    createRol: (Rol: IRol) => void;
    deleteRol: (Rol: IRol) => void;
    findRol: (id: number) => void;
    updateRol: (Rol: IRol) => void;
    setEditRol: React.Dispatch<React.SetStateAction<IRol | null>>;
  }
export const RolContext = createContext<IRolContext>({
    roles: [],
    editRol: null,
    createRol: (rol: IRol) => {},
    deleteRol: (rol: IRol) => {},
    findRol: (id: number) => {},
    updateRol: (rol: IRol) => {},
    setEditRol: () => {},
  });

const RolContextProvider = (props:any) => {
    
    const roleService = new RolService();

    const [roles, setRoles] = useState<IRol[]>([]);

    const [editRol, setEditRol] = useState<IRol | null>(null);

    useEffect(() => {
        roleService.getAll().then(data=>{
            setRoles(data)
          })  
    }, []);

    const createRol = (rol:any) => {
        roleService.save(rol).then(data=> {setRoles([...roles, data])});
    };

    const deleteRol = (id:any) => {
        roleService.delete(id).
            then(() => setRoles(roles.filter((p) => p.rolId !== id)));
            setEditRol(null);
    };
    
    const findRol = (id:number)=> {
        // const Rol = roles.find((p) => p.id_Rol === id);
        const rol = roles.find((p) => p.rolId === id);
        setEditRol(rol || null);
    }
    const updateRol=(rol:any)=>{
        roleService.update(rol).then((data)=>setRoles(
            roles.map(e=>(e.rolId===rol.rolId?data:e))
        ));

        setEditRol(null)
    };

    return (
        <RolContext.Provider
            value={{
                createRol,
                deleteRol,
                findRol,
                updateRol,
                editRol,
                roles,
                setEditRol,
            }}
        >
            {props.children}
        </RolContext.Provider>
    );
}
export default RolContextProvider;