import React, { Suspense } from "react";

const AppPage = React.lazy(() => import("./Page"));

export const App = (): JSX.Element => (
  <Suspense fallback={<div>Загрузка. Ожидайте</div>}>
    <AppPage />
  </Suspense>
);
