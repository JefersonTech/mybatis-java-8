import { Http } from "../types/Http";

export const taskService = (client: Http) => ({
  getTasks: async () => {
    const data = await client.get<
      {
        id: number;
        name: string;
        description: string;
        start_date: string;
      }[]
    >(`/api/tasks`);
    return data;
  },
  createTask: async (body: {
    name: string;
    description: string;
    start_date: string;
  }) => {
    await client.post("/api/tasks", body);
  },
});
