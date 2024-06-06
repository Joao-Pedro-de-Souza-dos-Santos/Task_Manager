import { Route, Routes } from "react-router-dom";
import { App } from "../pages/App";
import { Page404 } from "../pages/Page404";
import { Home } from "../pages/Home";
import { CreateTasks } from "../pages/CreateTasks";
import { Tasks } from "../pages/Tasks";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-tasks" element={<CreateTasks />} />
        <Route path="" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}