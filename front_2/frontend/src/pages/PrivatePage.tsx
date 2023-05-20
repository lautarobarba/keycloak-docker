// import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../auth/useAuth";

export const PrivatePage = () => {
  const { isAuth, login, logout, user, userId, token, isLoading } = useAuth();

  useEffect(() => {
    if (user && userId && token) {
      console.log({ user });
      console.log({ userId });
      console.log({ token });
    }
  }, [user, userId, token]);

  return (
    <>
      <h2>Ruta privada</h2>
      {isLoading && <p>Cargando...</p>}
      {!isLoading && (
        <>
          {isAuth ? (
            <>
              <p>Usuario autenticado 😃 (({user.email}))</p>
              <button onClick={logout}>SALIR</button>
            </>
          ) : (
            <>
              <p>Usuario no autenticado 😡</p>
              <button onClick={login}>INICIAR SESIÓN</button>
            </>
          )}
        </>
      )}
    </>
  );
};
