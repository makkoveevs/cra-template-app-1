import React, { Suspense } from "react";

const AppInitializationPage = React.lazy(
  () => import("./AppInitializationPage")
);

export const App = (): JSX.Element => (
  <Suspense
    fallback={
      <div style={{ width: "100vw", padding: "40px", textAlign: "center" }}>
        Loading...
      </div>
    }
  >
    <AppInitializationPage />
  </Suspense>
);
