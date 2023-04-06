import axios from "axios";

export class UserService {
  baseUrl = "http://localhost:8080/usuarios/";

  getAll() {
    return axios.get(this.baseUrl + "users/all").then((res) => res.data);
  }
  save(user: any) {
    return axios.post(this.baseUrl + "signup", user).then((res) => res.data);
  }
  // /eliminar/{id}
  delete(user: any) {
    return axios
      .put(this.baseUrl + "delete/" + user.id_usuario, user)
      .then((res) => res.data);
  }
  update(user: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + user.id_usuario, user)
      .then((res) => res.data);
  }
}
