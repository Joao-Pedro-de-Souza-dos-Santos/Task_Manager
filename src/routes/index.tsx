import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app.routes";
import { useAuth } from "../hook/useAuth";
import { AuthRouter } from "./auth.routes";

export function AppRoutes() {
  const { authUserId } = useAuth();
  console.log(authUserId);

  const isAuth = !!authUserId;
  const routes = isAuth ? <AppRouter /> : <AuthRouter />; // type cohesion

  return <BrowserRouter>{routes}</BrowserRouter>;
}
