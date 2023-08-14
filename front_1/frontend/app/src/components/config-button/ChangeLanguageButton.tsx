"use client";
import { useContext, useState } from "react";
import { LangContext } from "@/providers/LanguageProvider";
import { LanguageIcon } from "../icons/LanguageIcon";

// MenuBar
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/generic/Menubar"

export const ChangeLanguageButton = () => {
  const { lang, setLang } = useContext(LangContext);

  return (
    <div className="inline p-1">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <span className="flex items-center">
              <span className="m-1"><LanguageIcon /></span> {lang.toLocaleUpperCase()}
            </span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setLang("es")}>
              ES
            </MenubarItem>
            <MenubarItem onClick={() => setLang("en")}>
              EN
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
