import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router";
import { routes } from "src/modules/Routes/routes";
import { useStore } from "src/modules/Store";

const RequireAuth = observer(
  ({ children }: { children: JSX.Element }): JSX.Element => {
    const { isAuth } = useStore();
    const { pathname: from } = useLocation();

    if (isAuth) {
      return children;
    }

    return <Navigate to={routes.login} state={{ from }} replace />;
  }
);

export default RequireAuth;
