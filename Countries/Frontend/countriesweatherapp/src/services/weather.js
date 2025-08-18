const API_KEY = import.meta.env.VITE_SOME_KEY

export async function getByCityName(city) {
  // metric units = Celsius; use https
  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  url.searchParams.set('q', city)
  url.searchParams.set('appid', API_KEY)
  url.searchParams.set('units', 'metric')

  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather request failed')
  return res.json()
}
