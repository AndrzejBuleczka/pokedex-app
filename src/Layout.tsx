import { Outlet } from "react-router-dom";
import Home from "./pages/Home";

export default function Layout() {
  return (
    <div>
      <Home />
      <Outlet />
    </div>
  );
}