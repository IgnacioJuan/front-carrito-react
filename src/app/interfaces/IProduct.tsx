export interface IProduct{
    id_producto?: number;
    nom_Producto: string;
    stock: number;
    descripcion: string;
    valor_unitario: number;
    foto:number;
    enabled:boolean;
    categoria:Object;

}
