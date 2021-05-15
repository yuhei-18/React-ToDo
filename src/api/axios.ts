import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    (data: any) => {
      return data ? JSON.parse(data) : {}
    },
  ],
})

export default instance
