import axios from 'axios'

const API = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://attendance-app-backend-theta.vercel.app/',
})

export default API
