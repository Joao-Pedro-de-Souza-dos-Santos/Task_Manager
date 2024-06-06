import { Navigate, Route, Routes } from "react-router-dom";
import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="/signup" element={<SingUp />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}