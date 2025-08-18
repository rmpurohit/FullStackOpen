const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

export async function getAll() {
  const res = await fetch(`${BASE_URL}/all`)
  if (!res.ok) throw new Error('Countries request failed')
  return res.json()
}
