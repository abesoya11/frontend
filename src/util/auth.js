import { redirect } from "react-router-dom";
import { getAuthToken } from "./getToken";
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) return redirect("/login");
  else return null;
}
