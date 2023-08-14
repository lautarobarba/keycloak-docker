"use client";
import { ThemeContext } from "@/providers/ThemeProvider";
import { ReactNode, useContext } from "react";
import { LangContext } from "@/providers/LanguageProvider";

const LoadingPage = () => {
  return (
    <section id="loading" className="bg-white h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-xl tracking-tight font-extrabold text-dark">
            Jardín Botánico de Ushuaia
          </h1>
          <br />
          <h2 className="text-gray-500 italic text-xl">
            CARGANDO...
          </h2>
          <br />
          <div className="text-center">
            <img
              loading='lazy'
              alt="logo-jbu"
              title="logo-jbu"
              src="/assets/images/logo-circulo.png"
              width={200}
              height={200}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              className="animate-spin m-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

type LoadingPageWrapperProps = {
  children?: ReactNode;
};

export const LoadingPageWrapper = (props: LoadingPageWrapperProps) => {
  const { children } = props;
  const { loading: loadingTheme } = useContext(ThemeContext);
  const { loading: loadingLang } = useContext(LangContext);
  return <>{loadingTheme || loadingLang ? <LoadingPage /> : <>{children}</>}</>;
};
