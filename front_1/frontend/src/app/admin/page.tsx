'use client';
import { useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <br />
      <h1 className="text-center">{"[[ AdminDashboard ]]"}</h1>
      <div className="flex flex-col flex-nowrap justify-center">
        <hr className="m-auto w-80" />
      </div>
      <Link href="/" className="ml-5 text-blue-500">
        {">>"} Volver ◀️
      </Link>
      <hr />
      <button className="bg-blue-500 p-4 rounded-md text-white shadow-md" onClick={() => handleLogout()}>SALIR</button>

      <hr />

      {/* {session.status === 'loading' &&
        <p>BUSCANDO DATOS DEL USUARIO...</p>
      }
      {session.status === 'authenticated' && (
        <>
          <h1>Usuario loggeado</h1>
          <pre>{JSON.stringify(session)}</pre>
        </>
      )} */}
      {/* <SmallFooter /> */}
    </>
  );
};

export default AdminDashboard;
