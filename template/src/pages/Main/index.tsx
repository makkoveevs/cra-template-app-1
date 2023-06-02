import { observer } from "mobx-react-lite";
import { useStore } from "src/modules/Store";

export const Main = observer((): JSX.Element => {
  const { title } = useStore();
  return <div>{title}</div>;
});
