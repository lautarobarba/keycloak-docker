"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "./elements/Brand";
import { EnterButton } from "./elements/EnterButton";
import { LangContext } from "@/providers/LanguageProvider";
import { getDictionary } from "@/dictionaries";
import { MenuIcon } from "lucide-react";

export const PublicNavbar = () => {
  const [expandNavbar, setExpandNavbar] = useState<boolean>(false);
  const { lang } = useContext(LangContext);
  const dictionary = getDictionary(lang);

  const toggleMenu = () => {
    setExpandNavbar(!expandNavbar);
  }

  return (
    <nav className="bg-navbar-bg fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Brand />
        <div className="flex md:hidden md:order-2">
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon />
          </button>
        </div>
        <div
          className={`${expandNavbar ? 'flex' : 'hidden'} md:flex items-center justify-center md:justify-between w-full md:w-auto md:order-1`}
        >
          <ul className="w-full flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0 text-light dark:text-dark">
            <li className="flex items-center w-full">
              <Link
                href="/#home"
                className="block py-2 pl-3 pr-4 text-white hover:text-accent md:p-0 w-full text-center"
                onClick={() => setExpandNavbar(false)}
              >
                {dictionary.publicNavBarContent.home}
              </Link>
            </li>
            <li className="flex items-center w-full">
              <Link
                href="/#inst"
                className="block py-2 pl-3 pr-4 text-white hover:text-accent md:p-0 w-full text-center"
                onClick={() => setExpandNavbar(false)}
              >
                {dictionary.publicNavBarContent.inst}
              </Link>
            </li>
            <li className="flex items-center w-full">
              <Link
                href="/#team"
                className="block py-2 pl-3 pr-4 text-white hover:text-accent md:p-0 w-full text-center"
                onClick={() => setExpandNavbar(false)}
              >
                {dictionary.publicNavBarContent.team}
              </Link>
            </li>
            <li className="flex items-center w-full">
              <Link
                href="/#blog"
                className="block py-2 pl-3 pr-4 text-white hover:text-accent md:p-0 w-full text-center"
                onClick={() => setExpandNavbar(false)}
              >
                {"Blog"}
              </Link>
            </li>
            <li className="flex items-center w-full">
              <Link
                href="/#map"
                className="block py-2 pl-3 pr-4 text-white hover:text-accent md:p-0 w-full text-center"
                onClick={() => setExpandNavbar(false)}
              >
                {dictionary.publicNavBarContent.map}
              </Link>
            </li>
            <li className="flex items-center w-full">
              <EnterButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
