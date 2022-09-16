import axios from 'axios'

const instance = axios.create({
  baseURL: '/_api/',
})

export default instance