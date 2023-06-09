import { observer } from "mobx-react-lite";
// import { EventHandler, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, GridItem } from "src/components/GridLayout";
import { routes } from "src/modules/Routes/routes";
import { useStore } from "src/modules/Store";

const MOCK_CREDENTIALS = { username: "admin", password: "1" };

export const Login = observer((): JSX.Element => {
  const { isAuth, setIsAuth } = useStore();
  //   const [login, setLogin] = useState<string>("");
  //   const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const login = formData.get("username");
    const password = formData.get("password");
    if (
      login === MOCK_CREDENTIALS.username &&
      password === MOCK_CREDENTIALS.password
    ) {
      setIsAuth(true);
      const from = (location.state as { from?: string })?.from || routes.root;
      navigate(from);
    }
  };

  const handleLogout = (): void => {
    setIsAuth(false);
    navigate(routes.root);
  };

  return (
    <Grid $cols={3} $rows={3}>
      <GridItem $colStart={2} $colEnd={2} $rowStart={2} $rowEnd={2}>
        {isAuth ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <form onSubmit={handleLogin}>
            <label>
              Username
              <input
                placeholder={`Enter username (default ${MOCK_CREDENTIALS.username})`}
                name="username"
                autoComplete="username"
                type="text"
                // value={login}
                // onChange={(e) => setLogin(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                placeholder={`Enter password (default ${MOCK_CREDENTIALS.password})`}
                name="password"
                type="password"
                autoComplete="current-password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <button type="submit">Log in</button>
          </form>
        )}
      </GridItem>
    </Grid>
  );
});
