import { Route, Routes } from "react-router-dom";
import { ROUTE_ITEMS } from "./routes";
import RequireAuth from "src/components/RequireAuth";
import { NotFound } from "src/components/NotFound";

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
    <Route path="*" element={<NotFound />} />
  </Routes>
);
