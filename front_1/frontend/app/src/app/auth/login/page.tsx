'use client';
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";
import { LoginUserDto } from "@/interfaces/auth.interface";

// // Api Url
const apiBaseUrl: string = process.env.NEXT_PUBLIC_API_ROUTE ?? 'http://ERROR/api';

const Login = () => {

    const { user, status, login, logout } = useContext(AuthContext);

    const [loginData, setLoginData] = useState<LoginUserDto>({
        email: 'usuarioprueba@gmail.com',
        password: 'usuarioprueba',
    })

    // const session = await getSession();

    // useEffect(() => {
    //     console.log({ session });
    // }, []);

    const handleLogin = () => {
        login(loginData);
    }


    return (
        <>
            <br />
            <h1 className="text-center">{"[[ LoginPAGE ]]"}</h1>
            <div className="flex flex-col flex-nowrap justify-center">
                <hr className="m-auto w-80" />
            </div>
            <Link href="/" className="ml-5 text-blue-500">
                {">>"} Volver ◀️
            </Link>
            <hr />
            <p>FORMULARIO....CON DATA</p>

            <button className="bg-blue-500 p-4 rounded-md text-white shadow-md" onClick={() => handleLogin()}>INGRESAR</button>
            <hr />
            {status === 'unauthenticated' && <p>USUARIO SIN IDENTIFICAR</p>}
            {status === 'authenticated' && user && <p>USUARIO: {user.email}</p>}
        </>
    );
};

export default Login;
