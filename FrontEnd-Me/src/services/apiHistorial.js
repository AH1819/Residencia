import axios from 'axios'

const API_URL = 'http://localhost:3000'

export default {
  obtenerHistorial() {
    return axios.get(`${API_URL}/historial/showall`)
  },
  insertarHistorial(formData) {
    formData = {
      ...formData,
      Usuario: JSON.parse(localStorage.getItem('user')).Usuario
    }
    return axios.post(`${API_URL}/historial/insertar`, formData)
  }
}
