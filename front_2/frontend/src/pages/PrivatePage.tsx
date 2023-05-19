import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const PrivatePage = () => {
  const { isLogin } = useAuth();

  // if (!isLogin) {
  //   return <Navigate to="/" replace={true} />;
  // }

  return (
    <>
      <h2>Ruta privada</h2>
    </>
  );
};
