import { useMutation } from "react-query";
// react-query를 위한 login API
import axios from "axios";

const loginUser = async (data: { id: string; password: string }) => {
  const response = await axios.post("/login", data);
  return response.data;
};

export const useLoginMutation = () => {
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      alert(data.message);
    },

    onError: (error) => {
      alert(`Error: ${error}`);
    },
  }); // POST API일 경우 useMutation
  return loginMutation;
};
