import { ISignUp } from "@/_modules/authentication/interfaces/auth.interface";
import { AuthService } from "@/_modules/authentication/services/auth.service";
import { IUserProfile } from "@/_shared/interface/user.interface";
import authStore from "@/store/auth.store";
import loadingStore from "@/store/loading.store";
import React, { createContext, useContext, useEffect } from "react";

interface IAuthContext {
  user: IUserProfile;
  signOut: () => void;
  signUp: (data: ISignUp) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  user: {} as IUserProfile,
  signOut: () => {},
  signUp: () => new Promise<void>(() => {}),
  signIn: () => new Promise<void>(() => {}),
});

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const _authStore = authStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const signOut = () => _authStore.reset();

  const signIn = async (email: string, password: string) => {
    try {
      _loadingStore.setShow(true);

      const { data: response } = await AuthService.signIn({
        email,
        password,
      });

      _authStore.setUser(response.data.user);
      _authStore.setToken(response.data.token);

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const signUp = async (data: ISignUp) => {
    try {
      _loadingStore.setShow(true);

      await AuthService.signUp(data);
      await signIn(data.email, data.password);

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const getUserData = async () => {
    try {
      const userResponse = {} as IUserProfile;
      // _authStore.setUser(userResponse);

      return userResponse;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (_authStore.token) getUserData();
  }, []);

  const providerValue: IAuthContext = {
    signUp,
    signIn,
    signOut,
    user: _authStore.user,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};
