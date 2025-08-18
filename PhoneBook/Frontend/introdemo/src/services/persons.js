// src/services/persons.js
import axios from 'axios'
//const http = axios.create({ baseURL: 'http://localhost:3001' })           //onyl frontend using vite
//const http = axios.create({ baseURL: '/api/persons' })                    // proxy
const http = axios.create({ baseURL: 'http://localhost:3001/api/persons' }) // cors

const getAll  = async ()           => (await http.get('/')).data
const create  = async (person)     => (await http.post('/', person)).data
const update  = async (id, body)   => (await http.put(`/${id}`, body)).data
const remove  = async (id)         => { await http.delete(`/${id}`) }

export const personsApi = { getAll, create, update, remove }
