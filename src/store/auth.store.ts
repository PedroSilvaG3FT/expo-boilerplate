import { IUserProfile } from "@/_shared/interface/user.interface";
import { createStore } from "./_base.store";

interface State {
  token: string;
  user: IUserProfile;

  reset: () => void;
  setUser: (value: IUserProfile) => void;
  setToken: (value: string) => void;
}

export default createStore<State>({
  name: "auth",
  state: (set) => ({
    token: "",
    user: {} as IUserProfile,

    setUser: (user) => set(() => ({ user })),
    setToken: (token) => set(() => ({ token })),
    reset: () => {
      set(() => ({
        token: "",
        user: {} as IUserProfile,
      }));
    },
  }),
});
