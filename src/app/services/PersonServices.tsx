import axios from "axios";

export class PersonService {
  baseUrl = "http://localhost:8080/api/persona/";

  getAll() {
    return axios.get(this.baseUrl + "listar").then((res) => res.data);
  }
  save(person: any) {
    return axios.post(this.baseUrl + "crear", person).then((res) => res.data);
  }
  delete(person: any) {
    return axios
      .put(this.baseUrl + "eliminar/" + person.id_persona, person)
      .then((res) => res.data);
  }
  update(person: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + person.id_persona, person)
      .then((res) => res.data);
  }
}
