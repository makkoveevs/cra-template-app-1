import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ROUTE_ITEMS } from "src/modules/Routes/routes";
import { useStore } from "src/modules/Store";
import { MenuItem, MenuItems } from "./styles";

export const Menu = observer((): JSX.Element => {
  const { isAuth } = useStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (to: string): void => {
    navigate(to);
  };

  return (
    <MenuItems>
      {ROUTE_ITEMS.filter(
        (e) => !e.isProtected || (isAuth && e.isProtected)
      ).map((e) => (
        <MenuItem
          key={`${location}/${e.path}`}
          onClick={() => handleNavigate(e.path)}
          isActive={pathname === e.path}
        >
          {e.title}
        </MenuItem>
      ))}
    </MenuItems>
  );
});
