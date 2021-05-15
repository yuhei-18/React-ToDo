import axios from './axios'

const todo = {
  getAll: async (): Promise<Api.Todo[]> => {
    const response = await axios.get('todos')
    return response.data
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
  post: async (data: object): Promise<Api.Todo> => {
    const response = await axios.post(`todos`, data)
    return response.data
  },
}

export default todo
