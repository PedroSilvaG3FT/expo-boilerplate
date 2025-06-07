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
    user: {
      id: "",
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      createdAt: "",
      updatedAt: "",
    } as IUserProfile,
    // token: "TOKEN_URL",
    // user: {
    //   id: "user_id",
    //   name: "user_name",
    //   email: "user_email",
    //   phone: "user_phone",
    //   birthDate: "04/10/1999",
    //   createdAt: "04/10/1999",
    //   updatedAt: "04/10/1999",
    // } as IUserProfile,

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
