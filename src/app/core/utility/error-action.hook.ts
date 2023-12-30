import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export function useErrorAction() {
  const navigate = useNavigate();

  const errorAction = (error: AxiosResponse<unknown, any> | undefined) => {
    if (error?.status === 403) {
      navigate("/login");
    }
  };

  return {
    errorAction,
  };
}
