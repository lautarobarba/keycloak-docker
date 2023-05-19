import keycloak from "./keycloak";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [user, setUser] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setAuth = async () => {
    const keycloakAuthenticated = await keycloak.init({
      // onLoad: "login-required",
      onLoad: "check-sso",
    });
    setIsAuth(Boolean(keycloakAuthenticated));
    setIsLoading(false);
    refreshUserData();
  };

  const refreshUserData = () => {
    setToken(keycloak.token);
    setUserId(keycloak.subject);
    setUser(keycloak.tokenParsed);
  };

  const login = async () => {
    console.log("login");
    keycloak.login();
  };

  const logout = async () => {
    console.log("logout");
    keycloak.logout();
  };

  // Init client
  useEffect(() => {
    setAuth();
  }, []);

  // Refresh user data
  useEffect(() => {
    if (isAuth) refreshUserData();
  }, [isAuth]);

  return { isAuth, login, logout, user, userId, token, isLoading };
};
