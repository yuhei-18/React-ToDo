import axios from "./axios";

const todo = {
  getAll: async (): Promise<Api.Todo[]> => {
    const response = await axios.get('todos');
    return response.data;
  },

  get: async (id: number): Promise<Api.Todo> => {
    const response = await axios.get(`todos/${id}`);
    return response.data;
  },
};

export default todo;