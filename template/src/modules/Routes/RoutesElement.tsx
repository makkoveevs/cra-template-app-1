import { Route, Routes } from "react-router-dom";
import { ROUTE_ITEMS } from "./routes";
import RequireAuth from "src/components/RequireAuth";

export const RoutesElement = (): JSX.Element => (
  <Routes>
    {ROUTE_ITEMS.map((e) => (
      <Route
        key={`${location}/${e.path}`}
        path={e.path}
        element={
          e.isProtected ? <RequireAuth>{e.element}</RequireAuth> : e.element
        }
      />
    ))}
  </Routes>
);
