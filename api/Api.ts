import axios from 'axios'
const X_RapidAPI_Key = process.env.EXPO_PUBLIC_X_RapidAPI_Key
const X_RapidAPI_Host = process.env.EXPO_PUBLIC_X_RapidAPI_Host
const Host_URL = 'https://real-time-finance-data.p.rapidapi.com/'

const fetchGainerTrends = async () => {
  const options = {
    method: 'GET',
    url: Host_URL + 'market-trends',
    params: {
      trend_type: 'GAINERS',
    },
    headers: {
      'X-RapidAPI-Key': X_RapidAPI_Key,
      'X-RapidAPI-Host': X_RapidAPI_Host,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch data')
  }
}

const searchStocks = async (searchTerm: string) => {
  const options = {
    method: 'GET',
    url: Host_URL + 'search',
    params: {
      query: searchTerm,
    },
    headers: {
      'X-RapidAPI-Key': X_RapidAPI_Key,
      'X-RapidAPI-Host': X_RapidAPI_Host,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error({ error })
    throw new Error('Failed to fetch data')
  }
}

export default {
  fetchGainerTrends,
  searchStocks,
}
