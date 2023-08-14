import { LangOptions } from "@/providers/LanguageProvider";

type DictionaryContent = {
  // El contenido de cada diccionario
  publicNavBarContent: {
    home: string;
    inst: string;
    team: string;
    map: string;
  };
  instSection: {
    title: string;
    contentParagraph1: string;
    contentParagraph2: string;
    contentParagraph3: string;
    objective: string;
  };
  teamSection: {
    title: string;
    subtitle1: string;
    content1: string;
    subtitle2: string;
    mission1: string;
    mission2: string;
    mission3: string;
    mission4: string;
  };
  blogSection: {
    content: string;
    article: string;
    readMore: string;
    visitBlog: string;
  };
  mapSection: {
    title: string;
    navigateButton: string;
  };
};

type DictionaryType = {
  en: DictionaryContent;
  es: DictionaryContent;
};

export const getDictionary = (lang: LangOptions): DictionaryContent => {
  // Un diccionario por cada lenguaje
  const diccionario: DictionaryType = {
    en: {
      publicNavBarContent: {
        home: "Home",
        inst: "Institucional",
        team: "Team",
        map: "Map",
      },
      instSection: {
        title: "History",
        contentParagraph1: "FALTA TRADUCCIÓN....",
        contentParagraph2: "FALTA TRADUCCIÓN....",
        contentParagraph3: "FALTA TRADUCCIÓN....",
        objective: "FALTA TRADUCCIÓN....",
      },
      teamSection: {
        title: "Our Team",
        subtitle1: "Vision",
        content1: "FALTA TRADUCCIÓN....",
        subtitle2: "Mission",
        mission1: "FALTA TRADUCCIÓN....",
        mission2: "FALTA TRADUCCIÓN....",
        mission3: "FALTA TRADUCCIÓN....",
        mission4: "FALTA TRADUCCIÓN....",
      },
      blogSection: {
        content: "FALTA TRADUCCIÓN....",
        article: "Article",
        readMore: "Read more",
        visitBlog: "Visit our BLOG",
      },
      mapSection: {
        title: "Map",
        navigateButton: "FALTA TRADUCCIÓN....",
      },
    },
    es: {
      publicNavBarContent: {
        home: "Inicio",
        inst: "Institucional",
        team: "Equipo",
        map: "Mapa",
      },
      instSection: {
        title: "Historia",
        contentParagraph1:
          "En 2018, se firmó el convenio N°12.546/18 entre la Municipalidad de Ushuaia la Asociación Nuria TDF, que fue ratificado por el Concejo Deliberante de Ushuaia. Este convenio otorgó a la Asociación el uso y custodia de un predio de 10 hectáreas de bosque nativo en el área de Dos Banderas, con el propósito de crear el Jardín Botánico de Ushuaia.",
        contentParagraph2:
          "La Asociación fue creada en 1997 (personería jurídica N° 415).",
        contentParagraph3: "Su objeto social es",
        objective:
          "Propiciar la interacción armónica del hombre con su medio natural y cultural.",
      },
      teamSection: {
        title: "Nuestro equipo",
        subtitle1: "Visión",
        content1:
          "Inspirar a la comunidad local y a los visitantes de todo el mundo para la preservación, apreciación y disfrute del patrimonio natural de nuestra región, manteniendo la biodiversidad y compartiendo valores culturales.",
        subtitle2: "Misión",
        mission1:
          "Proteger, cultivar y exponer la diversidad vegetal de nuestra región, a través de la conservación de especies endémicas y amenazadas.",
        mission2:
          "Crear lazos con la comunidad local y los visitantes de todo el mundo.",
        mission3:
          "Generar intercambio con la comunidad científica local, nacional e internacional.",
        mission4:
          "Desarrollar actividades de interpretación, de investigación, educativas, recreativas, turísticas y de interés social, en un marco de sustentabilidad ambiental.",
      },
      blogSection: {
        content:
          "Te invitamos cordialmente a explorar nuestro blog de noticias, donde te mantendrás informado sobre todas las novedades y acontecimientos emocionantes del Jardín Botánico. Sumérgete en historias cautivadoras sobre la diversidad de plantas, eventos especiales, consejos de jardinería y más. Únete a nosotros en esta emocionante aventura botánica y descubre el apasionante mundo que compartimos contigo. ¡Bienvenido a nuestra comunidad verde!",
        article: "Artículo",
        readMore: "Continuar leyendo",
        visitBlog: "Visitá nuestro BLOG",
      },
      mapSection: {
        title: "Mapa",
        navigateButton: "Iniciar navegación",
      },
    },
  } as DictionaryType;

  return diccionario[lang];
};
