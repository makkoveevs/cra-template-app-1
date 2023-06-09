import { Docx } from "src/pages/Docx";
import { Login } from "src/pages/Login";
import { Main } from "src/pages/Main";

export const routes = {
  root: "/",
  login: "/login",
  docx: "/docx",
};

export const ROUTE_ITEMS = [
  {
    path: routes.root,
    isProtected: false,
    title: "Home",
    element: <Main />,
  },
  {
    path: routes.login,
    isProtected: false,
    title: "Login",
    element: <Login />,
  },
  { path: routes.docx, isProtected: false, title: "Docx", element: <Docx /> },
];
