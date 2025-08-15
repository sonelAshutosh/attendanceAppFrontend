import axios from 'axios'

const API = axios.create({
  baseURL: 'http://10.22.24.49:5000/',
  //   baseURL: '',
})

export default API
