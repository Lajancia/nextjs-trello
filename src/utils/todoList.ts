import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

const todoList = async () => {
  const response = await axios.get("/todoList");
  return response.data;
};

export const useTodoListQuery = () =>
  useQuery({
    queryKey: ["todoList"],
    queryFn: todoList,
    staleTime: Infinity,
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

const todo = async (data: { id: number; title: string }) => {
  const response = await axios.post("/todo", data);
  return response.data;
};

export const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const todoMutation = useMutation(todo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },

    onError: (error) => {
      alert(`Error: ${error}`);
    },
  });
  return todoMutation;
};
