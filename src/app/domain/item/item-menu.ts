import { useNavigate } from "react-router-dom";

export function useItemMenu() {
  const navigate = useNavigate();

  const menu = [
    {
      label: "Item",
      command: () => {
        navigate("");
      },
    },
    {
      label: "Unit",
      command: () => {
        navigate("unit");
      },
    },
  ];

  return { menu };
}
