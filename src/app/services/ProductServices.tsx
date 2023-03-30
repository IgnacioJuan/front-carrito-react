import axios from 'axios';


export class ProductService {
   baseUrl = "http://localhost:8080/api/product/";

   getAll() {
      return axios.get(this.baseUrl + "list").then(res => res.data);
   }
   save(product:any) {
      return axios.post(this.baseUrl + "save", product).then(res => res.data);
   }
   // /eliminar/{id}
   delete(id:any) {
      return axios.delete(this.baseUrl + "delete/" + id)
   }
   update(product:any){
      return axios.put(this.baseUrl+"update/"+product.id_product,product).then(res=>res.data);
  }
};

