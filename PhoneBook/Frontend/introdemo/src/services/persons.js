// src/services/persons.js
import axios from 'axios'
const http = axios.create({ baseURL: 'http://localhost:3001' })

const getAll  = async ()        => (await http.get('/persons')).data
const create  = async (person)   => (await http.post('/persons', person)).data
const update  = async (id, body) => (await http.put(`/persons/${id}`, body)).data
const remove  = async (id)       => { await http.delete(`/persons/${id}`) }

export const personsApi = { getAll, create, update, remove }
