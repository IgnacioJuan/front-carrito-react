import axios from "axios";

export class RolService {
  baseUrl = "http://localhost:8080/api/rol/";

  getAll() {
    return axios.get(this.baseUrl + "listar").then((res) => res.data);
  }
  save(user: any) {
    return axios.post(this.baseUrl + " crear", user).then((res) => res.data);
  }
  // /eliminar/{id}
  delete(user: any) {
    return axios
      .put(this.baseUrl + "eliminar/" + user.id_usuario, user)
      .then((res) => res.data);
  }
  update(user: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + user.id_usuario, user)
      .then((res) => res.data);
  }
}
