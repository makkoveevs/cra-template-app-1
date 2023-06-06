import { observer } from "mobx-react-lite";
import { useStore } from "src/modules/Store";

export const Main = observer((): JSX.Element => {
  const { title, exampleMethodApiGetListPosts } = useStore();
  return (
    <div>
      <div>{title}</div>;
      <div>
        <button onClick={exampleMethodApiGetListPosts}>
          Get Example Posts
        </button>
      </div>
    </div>
  );
});
