"use client";
import { getDictionary } from "@/dictionaries";
import { LangContext } from "@/providers/LanguageProvider";
import { Button } from "@nextui-org/react";
import { ArrowRightIcon, CalendarClockIcon, ScrollTextIcon } from "lucide-react";
import { useContext } from "react";

type BlogPostProps = {
    title: string;
    coverImgSrc: string;
    date: string;
    content: string;
    postHref: string;
    authorName: string;
    authorImgSrc: string;
}

const BlogPost = (props: BlogPostProps) => {
    const { title, coverImgSrc, date, content, postHref, authorName, authorImgSrc } = props;
    const { lang } = useContext(LangContext);
    const dictionary = getDictionary(lang);

    return (
        <article
            className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-primary shadow-md dark:border-gray-700"
            style={{ backgroundImage: `url(${coverImgSrc})`, backgroundSize: "cover", backgroundPosition: 'center' }}
        >
            <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <ScrollTextIcon size={14} />&nbsp;{dictionary.blogSection.article}
                </span>
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <CalendarClockIcon size={14} />&nbsp;{date}
                </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]">
                <a href={postHref} className="bg-light/[0.5] dark:bg-dark/[0.5] px-3 rounded-lg text-dark dark:text-light flex flex-wrap">{title}</a>
            </h2>
            <p className="mb-5 font-light">
                <span className="bg-light/[0.5] dark:bg-dark/[0.5] px-3 rounded-lg text-dark dark:text-light drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)] flex flex-wrap">{content}</span></p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img loading='lazy' className="w-7 h-7 rounded-full" src={authorImgSrc} alt={authorName} />
                    <span className="hidden md:block font-medium text-dark drop-shadow-[0_1.4px_1.4px_rgba(255,255,255,0.8)]">
                        {authorName}
                    </span>
                </div>
                <a href={postHref} className="inline-flex items-center font-medium text-primary-800 bg-primary-100 px-2 rounded-lg hover:underline ">
                    {dictionary.blogSection.readMore}&nbsp;<ArrowRightIcon />
                </a>
            </div>
        </article>
    );
}

export const BlogSection = () => {
    const { lang } = useContext(LangContext);
    const dictionary = getDictionary(lang);

    return (
        <section
            id="blog"
            className="min-h-screen bg-light dark:bg-dark text-center flex justify-center items-center"
        >
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-dark dark:text-light">
                        {"Blog"}
                    </h2>
                    <p className="font-light text-dark sm:text-xl dark:text-light">
                        {dictionary.blogSection.content}
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 mb-6 lg:mb-10">
                    <BlogPost
                        title="How to quickly deploy a static website"
                        coverImgSrc="/assets/images/cartel.jpg"
                        date="10/08/2023"
                        content="Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."
                        postHref="#"
                        authorName="Jese Leos"
                        authorImgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    />
                    <BlogPost
                        title="How to quickly deploy a static website"
                        coverImgSrc="/assets/images/forest-summer.jpg"
                        date="10/08/2023"
                        content="Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."
                        postHref="#"
                        authorName="Jese Leos"
                        authorImgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    />
                    <BlogPost
                        title="How to quickly deploy a static website"
                        coverImgSrc="/assets/images/logo-circulo.png"
                        date="10/08/2023"
                        content="Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."
                        postHref="#"
                        authorName="Jese Leos"
                        authorImgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    />
                    <BlogPost
                        title="How to quickly deploy a static website"
                        coverImgSrc=""
                        date="10/08/2023"
                        content="Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."
                        postHref="#"
                        authorName="Jese Leos"
                        authorImgSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    />
                </div>

                <div className="mx-auto text-center lg:mb-16 mb-8">
                    <Button color="primary" radius="sm" className="w-auto uppercase">¡{dictionary.blogSection.visitBlog}!</Button>
                </div>
            </div>
        </section>
    );
}
