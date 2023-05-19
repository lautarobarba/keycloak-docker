import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const client = new Keycloak({
    url: "http://localhost:8001",
    realm: "demo_realm",
    clientId: "react_demo_client",
  });

  const getLoginStatus = async () => {
    // const loginStatus = await client.init({
    //   onLoad: "login-required",
    // });

    // console.log({ loginStatus });

    client
      .init({
        onLoad: "login-required",
      })
      .then((response) => setIsLogin(response));
  };

  // Cuando se renderiza por primera vez
  //    se verifica el logueo
  useEffect(() => {
    getLoginStatus();
  }, []);

  return { isLogin };
};
