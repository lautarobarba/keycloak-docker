"use client";
import { ReactNode, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { usePathname } from 'next/navigation'

type ProtectedRouteWrapperProps = {
  children?: ReactNode;
};

export const ProtectedRouteWrapper = (props: ProtectedRouteWrapperProps) => {
  const { children } = props;
  const { status } = useContext(AuthContext);
  const pathname = usePathname()

  const redirectToLogin = () => {
    console.log('Usuario no loggeado. Redireccionando...');
    window.location.href = `/auth/login?next=${pathname}`
  }

  if (status === 'loading') return <p>Recuperando sesión...</p>;
  if (status === 'unauthenticated') redirectToLogin()
  else return <>{children}</>
}
