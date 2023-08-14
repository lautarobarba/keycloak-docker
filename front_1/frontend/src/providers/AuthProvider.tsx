"use client";
import { User } from "@/interfaces/user.interface";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getAuthUser, login, logout } from "@/services/fetchers";
import { LoginUserDto } from "@/interfaces/auth.interface";
import { useRouter, useSearchParams } from 'next/navigation';


type AuthContextType = {
    status: "authenticated" | "unauthenticated" | "loading";
    user: User | null;
    login: (data: LoginUserDto) => void;
    logout: () => void;
    hasRole: (roles: string[]) => boolean;
};


export const AuthContext = createContext<AuthContextType>({
    status: "loading",
    user: null,
    login: () => { },
    logout: () => { },
    hasRole: ([]) => false,
});

type AuthProviderProps = {
    children?: ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;
    const router = useRouter();
    const searchParams = useSearchParams();

    const [status, setStatus] = useState<"authenticated" | "unauthenticated" | "loading">("loading");
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = async (data: LoginUserDto) => {
        console.log('Iniciando sesión..', { data });

        try {
            await login(data);
            console.log('Sesion iniciada correctamente');
            const user: User = await getAuthUser();
            console.log({ user });
            setUser(user);
            setStatus("authenticated");
            console.log(searchParams.get('next'));
            const nextRoute: string | null = searchParams.get('next');
            if (nextRoute) router.push(nextRoute);
        } catch (e) {
            setStatus("unauthenticated");
            console.log('ERROR al iniciar sesion');
        }
    };

    const handleLogout = async () => {
        console.log('Cerrando sessión...');

        try {
            const response = await logout();
            setStatus("unauthenticated");
            setUser(null);
            console.log('Sesion cerrada correctamente');
            const nextRoute: string | null = searchParams.get('next');
            if (nextRoute) router.push(nextRoute);
            else router.push("/library")
        } catch (e) {
            setStatus("unauthenticated");
            console.log('ERROR al cerrar sesión');
        }
    };

    const hasRole = (rolesPermitidos: string[]): boolean => {
        return user ? rolesPermitidos.indexOf(String(user.role)) > -1 : false;
    };

    const validateSession = async () => {
        console.log("Validando ultimo token...");

        try {
            const user: User = await getAuthUser();
            setStatus("authenticated");
            setUser(user);
            console.log("Sesion válida");
        } catch (e) {
            setStatus("unauthenticated");
            console.log('Sesion expirada...');
        }
    }

    useEffect(() => {
        validateSession()
    }, []);

    return (
        <AuthContext.Provider
            value={{
                status: status,
                user: user,
                login: handleLogin,
                logout: handleLogout,
                hasRole: hasRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
