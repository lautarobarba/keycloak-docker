import './HomeSection.css';

export const HomeSection = () => {
    return (
        <section
            id="home"
            className="h-screen bg-light dark:bg-dark text-center forest-summer-background flex justify-center items-center"
        >
            <div className='flex flex-col items-center'>
                <img
                    loading='lazy'
                    src="/assets/images/logo-circulo.png"
                    alt="Logo JBU"
                    title="Logo JBU"
                    className="w-60 md:w-80 lg:w-96 mb-6"
                />
                <h1
                    className="text-white text-2xl md:text-4xl lg:text-6xl"
                    style={{ textShadow: "5px 5px 5px black" }}
                >
                    Jardín Botánico de Ushuaia
                </h1>
            </div>
        </section>
    );
}
