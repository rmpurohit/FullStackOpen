import axios from 'axios'

// If your json-server runs via: npm run server  -> http://localhost:3001
const http = axios.create({
  baseURL: 'http://localhost:3001',
})

const getAll = async () => {
  const { data } = await http.get('/persons')
  return data              // -> [{ id, name, number }, ...]
}

// You’ll add create/update/remove later in the course.
export const personsApi = { getAll }
