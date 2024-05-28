import { createBrowserRouter } from "react-router-dom";
import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";

export const authRouter = createBrowserRouter([
    { path: "/", element: <SingIn/>},
    { path: "/singup", element: <SingUp/>},
])