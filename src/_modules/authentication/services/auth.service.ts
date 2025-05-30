import { IBaseReponse } from "@/_shared/interface/response.interface";
import { IUserProfile } from "@/_shared/interface/user.interface";
import { APP_HTTP_CLIENT } from "@/http";
import {
  ISignIn,
  ISignInResponse,
  ISignUp,
} from "../interfaces/auth.interface";

export class AuthService {
  public static signIn(payload: ISignIn) {
    const response: IBaseReponse<ISignInResponse> = {
      data: {
        token: "TOKEN_URL",
        user: {
          id: "user_id",
          name: "user_name",
          email: payload.email,
          phone: "user_phone",
          birthDate: "04/10/1999",
          createdAt: "04/10/1999",
          updatedAt: "04/10/1999",
        },
      },
      status: 200,
      messages: [],
      success: false,
    };

    return new Promise<any>((resolve) => resolve({ data: response }));
  }
  public static signUp(payload: ISignUp) {
    return APP_HTTP_CLIENT.post<IBaseReponse<IUserProfile>>(
      `/auth/sign-up`,
      payload
    );
  }
}
