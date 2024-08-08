import axios from 'axios'

const API_URL = 'http://10.31.142.243:3000/'

export const login = async (rfc, password) => {
  const response = await axios.post(API_URL + 'auth/login', { rfc, password })
  return response.data
}

export const getUser = async (rfc) => { 
  const response = await axios.get(API_URL + 'auth/usuario/' + rfc)
  return response.data
}

export const sendEmail = async (data) => {
  console.log(data)
  const response = await axios.post(API_URL + 'auth/send-email', data)
  return response.data
}

export const getPermisos = (rfc) => {
  const token = localStorage.getItem('token')

  return axios.get(API_URL + 'auth/permisos/' + rfc, {
    headers: {
      Authorization: token
    }
  })
}

export const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('permisos')
}
