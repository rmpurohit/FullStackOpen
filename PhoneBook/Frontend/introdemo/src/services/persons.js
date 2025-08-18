import { http, normalizeError } from './http';

const path = ''; // http already points at /api/persons (or full URL)

const getAll  = async ()         => (await http.get(`${path}/`)).data;
const create  = async (person)   => (await http.post(`${path}/`, person)).data;
const update  = async (id, body) => (await http.put(`${path}/${id}`, body)).data;
const remove  = async (id)       => { await http.delete(`${path}/${id}`); };

export const personsApi = { getAll, create, update, remove, normalizeError };
