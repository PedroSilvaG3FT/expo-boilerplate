import { enviroments } from "@/_shared/enviroments";
import axios from "axios";

export const APP_HTTP_CLIENT = axios.create({
  baseURL: enviroments.EXPO_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});
