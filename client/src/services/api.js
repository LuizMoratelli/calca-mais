import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@calcamais:token')
  const headers = { ...config.headers }

  if (token){
    headers.Authorization = `Bearer ${token}`
  } 

  return { ...config, headers }
})

export default api
