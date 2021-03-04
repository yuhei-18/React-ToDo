import axios from "./axios";

const todo = {
  get: async (): Promise<Api.Todo[]> => {
    const response = await axios.get('todos');
    return response.data;
  },
};

export default todo;