import { action, makeObservable, observable } from "mobx";

export class AppStore {
  prop: string | undefined;

  constructor() {
    makeObservable(this, {
      prop: observable,

      setProp: action,
    });
  }

  public initStore = (): void => {
    // smth
  };

  public destroy = (): void => {
    this.setProp(undefined);
  };

  public setProp = (data?: string): void => {
    this.prop = data;
  };
}
