import { observer } from "mobx-react-lite";
// import { EventHandler, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, GridItem } from "src/components/GridLayout";
import { routes } from "src/modules/Routes/routes";
import { useStore } from "src/modules/Store";

const MOCK_CREDENTIALS = { login: "admin", password: "1" };

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

    const login = formData.get("login");
    const password = formData.get("password");
    if (
      login === MOCK_CREDENTIALS.login &&
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
            Выйти
          </button>
        ) : (
          <form onSubmit={handleLogin}>
            <label>
              Имя пользователя:
              <input
                placeholder="Введите имя пользователя"
                name="login"
                type="text"
                // value={login}
                // onChange={(e) => setLogin(e.target.value)}
              />
            </label>
            <label>
              Пароль:{" "}
              <input
                placeholder="Введите пароль"
                name="password"
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
            <button type="submit">Войти</button>
          </form>
        )}
      </GridItem>
    </Grid>
  );
});
