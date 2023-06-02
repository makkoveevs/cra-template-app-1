import { action, makeObservable, observable } from "mobx";
import { DEFAULT_TITLE } from "./constants";

export class AppStore {
  title: string | undefined = DEFAULT_TITLE;
  isAuth: boolean = false;

  constructor() {
    makeObservable(this, {
      title: observable,
      isAuth: observable,

      setTitle: action,
      setIsAuth: action,
    });
  }

  public initStore = (): void => {
    // smth
  };

  public destroy = (): void => {
    this.setTitle(undefined);
    this.setIsAuth(false);
  };

  public setTitle = (value?: string): void => {
    this.title = value ?? DEFAULT_TITLE;
  };

  public setIsAuth = (value: boolean): void => {
    this.isAuth = value;
  };
}
