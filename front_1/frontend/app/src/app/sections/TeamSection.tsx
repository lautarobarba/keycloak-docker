"use client";
import { getDictionary } from "@/dictionaries";
import { LangContext } from "@/providers/LanguageProvider";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { useContext } from "react";

type ProfileCardProps = {
    name: string;
    imageSrc: string;
    rol: string;
    description: string;
    facebookHref: string;
    instagramHref: string;
    twitterHref: string;
}

const ProfileCard = (props: ProfileCardProps) => {
    const { name, imageSrc, rol, description, facebookHref, instagramHref, twitterHref } = props;
    return (
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <img
                loading='lazy'
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src={imageSrc}
                alt={name}
            />
            <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-dark dark:text-light">
                    {name}
                </h3>
                <span className="text-dark dark:text-light">{rol}</span>
                <p className="mt-3 mb-4 font-light text-dark dark:text-light">{description}</p>
                <ul className="flex space-x-4 sm:mt-0">
                    <li>
                        <a href={facebookHref} target="_blank" className="text-dark dark:text-light hover:text-primary dark:hover:text-white">
                            <FacebookIcon />
                        </a>
                    </li>
                    <li>
                        <a href={instagramHref} target="_blank" className="text-dark dark:text-light hover:text-primary dark:hover:text-white">
                            <InstagramIcon />
                        </a>
                    </li>
                    <li>
                        <a href={twitterHref} target="_blank" className="text-dark dark:text-light hover:text-primary dark:hover:text-white">
                            <TwitterIcon />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export const TeamSection = () => {
    const { lang } = useContext(LangContext);
    const dictionary = getDictionary(lang);

    return (
        <section
            id="team"
            className="min-h-screen bg-light dark:bg-dark text-center flex justify-center items-center"
        >
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                {/* VISION Y MISION */}
                <div className="mx-auto px-5 w-screen md:w-10/12 text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-dark dark:text-light">
                        {dictionary.teamSection.title}
                    </h2>
                    <p className="font-light text-dark dark:text-light mb-5 lg:mb-10 sm:text-xl ">
                        <span className="font-semibold">{dictionary.teamSection.subtitle1}</span>: {dictionary.teamSection.content1}
                    </p>
                    <p className="font-light text-dark dark:text-light sm:text-xl ">
                        <span className="font-semibold">{dictionary.teamSection.subtitle2}</span>:
                    </p>
                    <ul className="text-left text-gray-500 list-disc list-inside dark:text-gray-400">
                        <li>{dictionary.teamSection.mission1}</li>
                        <li>{dictionary.teamSection.mission2}</li>
                        <li>{dictionary.teamSection.mission3}</li>
                        <li>{dictionary.teamSection.mission4}</li>
                    </ul>
                </div>

                {/* INTEGRANTES DEL EQUIPO */}
                <div className="grid gap-8 p-2 md:p-0 mb-6 lg:mb-16 md:grid-cols-2">
                    {/* MIEMBRO1: Estela Caipillan */}
                    <ProfileCard
                        name="Estela Caipilla"
                        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                        rol="Rol en JBU"
                        description="Pequeña descripcion de no más de 2 renglones. Puede ser hasta aca."
                        facebookHref="#"
                        instagramHref="#"
                        twitterHref="#"
                    />
                    {/* MIEMBRO2: Luis Cánepa */}
                    <ProfileCard
                        name="Luis Cánepa"
                        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                        rol="Rol en JBU"
                        description="Pequeña descripcion de no más de 2 renglones. Puede ser hasta aca."
                        facebookHref="#"
                        instagramHref="#"
                        twitterHref="#"
                    />
                    {/* MIEMBRO3: Lic. Cristian Petracchi */}
                    <ProfileCard
                        name="Lic. Cristian Petracchi"
                        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                        rol="Rol en JBU"
                        description="Pequeña descripcion de no más de 2 renglones. Puede ser hasta aca."
                        facebookHref="#"
                        instagramHref="#"
                        twitterHref="#"
                    />
                    {/* MIEMBRO4: Johana Burgues */}
                    <ProfileCard
                        name="Johana Burgues"
                        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                        rol="Rol en JBU"
                        description="Pequeña descripcion de no más de 2 renglones. Puede ser hasta aca."
                        facebookHref="#"
                        instagramHref="#"
                        twitterHref="#"
                    />
                    {/* MIEMBRO5: Isis */}
                    <ProfileCard
                        name="Isis"
                        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                        rol="Rol en JBU"
                        description="Pequeña descripcion de no más de 2 renglones. Puede ser hasta aca."
                        facebookHref="#"
                        instagramHref="#"
                        twitterHref="#"
                    />
                    {/* MIEMBRO6: Lautaro Barba */}
                    <ProfileCard
                        name="Lautaro Barba"
                        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                        rol="Desarrollador web"
                        description="Estudiante de Lic. en sistemas de la Universidad Nacional de Tierra del Fuego."
                        facebookHref="#"
                        instagramHref="#"
                        twitterHref="#"
                    />
                </div>
            </div>
        </section>
    );
}
