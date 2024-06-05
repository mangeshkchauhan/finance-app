import axios from 'axios'

const fetchGainerTrends = async () => {
  const X_RapidAPI_Key = process.env.EXPO_PUBLIC_X_RapidAPI_Key
  const X_RapidAPI_Host = process.env.EXPO_PUBLIC_X_RapidAPI_Host
  const options = {
    method: 'GET',
    url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
    params: {
      trend_type: 'GAINERS',
      country: 'us',
      language: 'en',
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

export default {
  fetchGainerTrends,
}
