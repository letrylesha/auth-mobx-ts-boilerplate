import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../hooks/useUserStore";

export const PrivateRoute = observer(({ children }: any) => {
  const { user } = useUserStore();
  const isAuthenticated = Boolean(user?.id);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/auth");
  }

  return children;
});
