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

const list = async (data: { title: string }) => {
  const response = await axios.post("/list", data);
  return response.data;
};

export const useListMutation = () => {
  const queryClient = useQueryClient();
  const listMutation = useMutation(list, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },

    onError: (error) => {
      alert(`Error: ${error}`);
    },
  });
  return listMutation;
};

const listDrag = async (data: { prev: number; current: number }) => {
  const response = await axios.post("/listDrag", data);
  return response.data;
};

export const useListDragMutation = () => {
  const queryClient = useQueryClient();
  const listMutation = useMutation(listDrag, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },

    onError: (error) => {
      alert(`Error: ${error}`);
    },
  });
  return listMutation;
};

const todoDrag = async (data: {
  prevList: number;
  currentList: number;
  prevTodo: number;
  currentTodo: number;
}) => {
  const response = await axios.post("/todoDrag", data);
  return response.data;
};

export const useTodoDragMutation = () => {
  const queryClient = useQueryClient();
  const listMutation = useMutation(todoDrag, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoList");
    },

    onError: (error) => {
      alert(`Error: ${error}`);
    },
  });
  return listMutation;
};
