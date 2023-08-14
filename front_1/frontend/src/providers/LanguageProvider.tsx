"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

export type LangOptions = "es" | "en";

type LangContextType = {
  lang: LangOptions;
  loading: boolean;
  setLang: (newValue: LangOptions) => void;
};

export const LangContext = createContext<LangContextType>({
  lang: "es",
  loading: false,
  setLang: () => { },
});

type LangProviderProps = {
  children?: ReactNode;
};

export const LanguageProvider = (props: LangProviderProps) => {
  const { children } = props;
  const [lang, setLang] = useState<LangOptions>("es");
  const [loading, setLoading] = useState<boolean>(true);

  const changeLanguage = (newValue: LangOptions) => {
    setLang(newValue);
    localStorage.setItem("lang", newValue);
  };

  useEffect(() => {
    const lastLanguage = localStorage.getItem("lang");
    if (lastLanguage && (
      lastLanguage === "en" || lastLanguage === "es")
    )
      setLang(lastLanguage);
    setLoading(false);
  }, []);

  return (
    <LangContext.Provider value={{ lang, loading, setLang: changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};
