"use client";
import { useContext, useState } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { LangContext } from "@/providers/LanguageProvider";
import { Button } from "@nextui-org/react";
import { LanguagesIcon, MoonIcon, SunIcon } from "lucide-react";

export const ConfigMenu = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { lang, setLang } = useContext(LangContext);
    const [langMenuExpand, setLangMenuExpand] = useState<boolean>(false);

    const toggleLangMenu = () => {
        setLangMenuExpand(!langMenuExpand);
    }

    return (
        <div id="config-menu" className="fixed right-5 bottom-5">
            {/* Menu de lenguajes */}
            <div className={`ml-7 z-10 ${langMenuExpand ? 'block' : 'hidden'} bg-light dark:bg-dark  rounded-lg shadow w-10 text-center`}>
                <Button
                    isIconOnly
                    type="button"
                    size="sm"
                    className="h-8 bg-light dark:bg-dark p-1"
                    onClick={() => {
                        setLang("es");
                        setLangMenuExpand(false);
                    }}
                ><span className="mx-1 text-dark dark:text-light text-lg">ES</span></Button>
                <hr />
                <Button
                    isIconOnly
                    type="button"
                    size="sm"
                    className="h-8 bg-light dark:bg-dark p-1"
                    onClick={() => {
                        setLang("en");
                        setLangMenuExpand(false);
                    }}
                ><span className="mx-1 text-dark dark:text-light text-lg">EN</span></Button>
            </div>
            {/* Toggle Buttons */}
            <div className="flex flex-row items-center">
                <Button
                    isIconOnly
                    type="button"
                    size="sm"
                    className="h-8 bg-light dark:bg-dark p-1"
                    onClick={toggleTheme}
                >
                    <span className="mx-1 text-dark dark:text-light">{theme === "light" ? <MoonIcon /> : <SunIcon />}</span>
                </Button>

                <Button
                    isIconOnly
                    type="button"
                    size="sm"
                    className="h-8 bg-light dark:bg-dark p-1"
                    onClick={toggleLangMenu}
                >
                    {!langMenuExpand && (<span className="mx-1 text-dark dark:text-light text-lg">{lang.toLocaleUpperCase()}</span>)}
                    {langMenuExpand && (<span className="mx-1 text-dark dark:text-light"><LanguagesIcon /></span>)}
                </Button>
            </div >
        </div >
    );
}