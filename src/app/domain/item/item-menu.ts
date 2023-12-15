import { useNavigate } from "react-router-dom";

export function useItemMenu() {
  const navigate = useNavigate();

  const menu = [
    {
      label: "Item",
      command: () => {
        navigate("/item");
      },
    },
    {
      label: "Unit",
      command: () => {
        navigate("/item/unit");
      },
    },
    {
      label: "Brand",
      command: () => {
        navigate("/item/brand");
      },
    },
  ];

  return { menu };
}
 