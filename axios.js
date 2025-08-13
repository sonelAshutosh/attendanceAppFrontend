import axios from 'axios'

const API = axios.create({
  baseURL: 'http://172.31.104.179:5000/',
  //   baseURL: '',
})

export default API
