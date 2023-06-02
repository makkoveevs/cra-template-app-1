import { Login } from "src/pages/Login";
import { Main } from "src/pages/Main";

export const routes = {
  root: "/",
  login: "/login",
};

export const ROUTE_ITEMS = [
  {
    path: routes.root,
    isProtected: false,
    title: "Главная",
    element: <Main />,
  },
  { path: routes.login, isProtected: false, title: "Вход", element: <Login /> },
];
