import { RoutesElement } from "src/modules/Routes/RoutesElement";
import { RootLayout, RootLayoutMain, RootLayoutSidebar } from "./style";
import { Menu } from "src/components/Menu";

export const Root = (): JSX.Element => (
  <RootLayout>
    <RootLayoutSidebar>
      <Menu />
    </RootLayoutSidebar>
    <RootLayoutMain>
      <RoutesElement />
    </RootLayoutMain>
  </RootLayout>
);
