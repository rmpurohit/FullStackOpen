import axios from 'axios'

// For running: npm run server  -> http://localhost:3001
const http = axios.create({ baseURL: 'http://localhost:3001' })

const getAll = async () => {
  const { data } = await http.get('/persons')
  return data
}

const create = async (person) => {
  const { data } = await http.post('/persons', person)
  return data
}

const update = async (id, person) => {
  const { data } = await http.put(`/persons/${id}`, person)
  return data
}

const remove = async (id) => {
  await http.delete(`/persons/${id}`)
}

export const personsApi = { getAll, create, update, remove }
