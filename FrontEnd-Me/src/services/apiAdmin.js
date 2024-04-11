import axios from 'axios'

const API_URL = 'http://localhost:3000' // Cambia esto según la URL de tu backend

export default {
  getUsuarios() {
    return axios.get(`${API_URL}/admin/getUsuarios`)
  },
  insertUsuario(formData) {
    return axios.post(`${API_URL}/admin/insertUsuario`, formData)
  },
  updateUsuario(id, formData) {
    return axios.put(`${API_URL}/admin/updateUsuario/${id}`, formData)
  },
  findPermisosByRFC(rfc) {
    return axios.get(`${API_URL}/admin/findPermisosByRFC/${rfc}`)
  },
  givePermisos(formData) {
    return axios.post(`${API_URL}/admin/givePermisos`, formData)
  },
  deletePermisos(formdata) {
    return axios.delete(
      `${API_URL}/admin/deletePermisos/${formdata.idPermiso}/${formdata.idUsuario}`
    )
  }
}
