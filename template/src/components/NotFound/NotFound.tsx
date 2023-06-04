import { Link } from "react-router-dom";
import { routes } from "src/modules/Routes/routes";

export const NotFound = (): JSX.Element => (
  <div>
    <div>Incorrect url</div>
    <div>
      <Link to={routes.root}>Go to home</Link>
    </div>
  </div>
);
