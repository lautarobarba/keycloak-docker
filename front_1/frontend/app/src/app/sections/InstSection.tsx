"use client";
import { getDictionary } from "@/dictionaries";
import { LangContext } from "@/providers/LanguageProvider";
import { useContext } from "react";

export const InstSection = () => {
    const { lang } = useContext(LangContext);
    const dictionary = getDictionary(lang);

    return (
        <section
            id="inst"
            className="min-h-screen bg-light dark:bg-dark text-center flex justify-center items-center"
        >
            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <img
                    loading='lazy'
                    src="/assets/images/cartel.jpg"
                    alt="dashboard image"
                    className="w-auto h-60 md:h-full mx-auto rounded-lg border-2 border-primary"
                />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {dictionary.instSection.title}
                    </h2>
                    <p className="mb-2 font-light text-dark dark:text-light md:text-lg ">
                        {dictionary.instSection.contentParagraph1}
                    </p>
                    <p className="mb-2 font-light text-dark dark:text-light md:text-lg ">
                        {dictionary.instSection.contentParagraph2}
                    </p>
                    <p className="mb-2 font-light text-dark dark:text-light md:text-lg ">
                        {dictionary.instSection.contentParagraph3}
                    </p>
                    <p className="text-dark dark:text-light md:text-lg font-semibold">
                        {dictionary.instSection.objective}
                    </p>
                </div>
            </div>
        </section>
    );
}
