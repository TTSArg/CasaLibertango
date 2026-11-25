export const locales = ["es", "fr", "en"] as const;
export type Locale = (typeof locales)[number];
export type PageKey = "home" | "lodging" | "tango" | "city" | "prepare";

export const pageSlugs: Record<Exclude<PageKey, "home">, Record<Locale, string>> = {
  lodging: {
    es: "alojamiento",
    fr: "hebergement",
    en: "accommodation",
  },
  tango: {
    es: "experiencias-tango",
    fr: "experiences-tango",
    en: "tango-experiences",
  },
  city: {
    es: "buenos-aires",
    fr: "buenos-aires",
    en: "buenos-aires",
  },
  prepare: {
    es: "prepara-tu-viaje",
    fr: "preparer-voyage",
    en: "plan-your-trip",
  },
};

export const pageKeys = Object.keys(pageSlugs) as Exclude<PageKey, "home">[];

export function getPageKey(locale: Locale, slug?: string): PageKey | null {
  if (!slug) return "home";
  return pageKeys.find((key) => pageSlugs[key][locale] === slug) ?? null;
}

export function getPagePath(locale: Locale, key: PageKey): string {
  return key === "home" ? `/${locale}` : `/${locale}/${pageSlugs[key][locale]}`;
}

type Copy = {
  languageName: string;
  nav: Record<PageKey, string>;
  contactLabel: string;
  footer: string;
  contactMessage: string;
  pages: Record<PageKey, { eyebrow: string; title: string; intro: string; body: string }>;
  details: {
    twoApartments: string;
    personalWelcome: string;
    address: string;
    checkIn: string;
    checkOut: string;
    askAvailability: string;
    tangoServices: string[];
    cityServices: string[];
    travelTips: string[];
    houseRules: string[];
  };
};

export const copy: Record<Locale, Copy> = {
  es: {
    languageName: "Español",
    nav: {
      home: "Bienvenida",
      lodging: "Nuestra casa",
      tango: "Experiencias de tango",
      city: "Buenos Aires",
      prepare: "Prepará tu viaje",
    },
    contactLabel: "Consultar con Eva",
    footer: "Tu casa en Buenos Aires",
    contactMessage: "Hola Eva, quiero consultar por Casa Libertango.",
    pages: {
      home: {
        eyebrow: "Una bienvenida porteña",
        title: "Buenos Aires te espera. Bienvenido a casa.",
        intro:
          "Soy Eva, anfitriona de Casa Libertango. Me alegra recibirte y ayudarte a descubrir mi ciudad: sus barrios, su energía y, por supuesto, el tango que me apasiona.",
        body:
          "Encontrá un lugar para descansar y experiencias para vivir Buenos Aires a tu manera. Estoy para ayudarte a preparar una estadía auténtica y memorable.",
      },
      lodging: {
        eyebrow: "Casa Libertango · Libertad 192",
        title: "Un lugar propio en el corazón de Buenos Aires",
        intro:
          "Dos departamentos luminosos y acogedores en un edificio de época. Elegí el espacio que mejor se adapte a tu viaje y consultame disponibilidad directamente.",
        body:
          "Después de recorrer la ciudad, volvé a un espacio tranquilo y cómodo. Eva puede orientarte sobre el alojamiento y ayudarte con los detalles de tu llegada.",
      },
      tango: {
        eyebrow: "A bailar · Tango en Buenos Aires",
        title: "Viví el tango desde adentro",
        intro:
          "Clases, milongas y salidas pensadas para vos. Soy bailarina y profesora de tango: contame qué te interesa y armamos una experiencia a tu ritmo.",
        body:
          "Podés elegir una clase privada, conocer los códigos de la milonga o salir a bailar con acompañamiento. La disponibilidad y los valores se confirman al consultar.",
      },
      city: {
        eyebrow: "Viví la ciudad como un porteño",
        title: "Buenos Aires, a tu manera",
        intro:
          "Barrios, sabores y rincones que hacen única a la ciudad. Te ayudo a encontrar propuestas que se adapten a tus ganas y al tiempo de tu estadía.",
        body:
          "Desde San Telmo y La Boca hasta cafés históricos, gastronomía y paseos personalizados: descubrí la ciudad con recomendaciones de alguien que la vive.",
      },
      prepare: {
        eyebrow: "Antes de llegar",
        title: "Prepará tu viaje con tranquilidad",
        intro:
          "Transporte, llegada y recomendaciones locales: escribime tus dudas y vemos juntos cómo hacer más sencilla tu estadía en Buenos Aires.",
        body:
          "Una orientación personal antes de viajar puede marcar la diferencia. Consultame por traslados, cómo moverte por la ciudad y opciones para organizar tus días.",
      },
    },
    details: {
      twoApartments: "2 departamentos",
      personalWelcome: "Eva te recibe",
      address: "Libertad 192",
      checkIn: "Check-in desde",
      checkOut: "Check-out hasta",
      askAvailability: "Consultar disponibilidad",
      tangoServices: [
        "Clases privadas de tango para parejas",
        "Clases de rol femenino con Eva",
        "Orientación sobre códigos y costumbres de la milonga",
        "Acompañamiento a milongas, conciertos y espectáculos",
        "Español para clases y encuentros de tango",
        "Asesoría para comprar zapatos e indumentaria",
      ],
      cityServices: [
        "Recorridos por San Telmo, Recoleta, Palermo y La Boca",
        "Experiencias gastronómicas: mate, empanadas, vino y cafés",
        "Paseos personalizados por Buenos Aires",
      ],
      travelTips: [
        "Consultá por traslados desde y hacia el aeropuerto.",
        "Recibí recomendaciones prácticas para moverte por Buenos Aires.",
        "Emergencias en Argentina: Policía 911 · Bomberos 100 · Médicas 107.",
      ],
      houseRules: [
        "No fumar dentro del alojamiento.",
        "No realizar fiestas y respetar el descanso después de las 22 h.",
        "Consultar antes de recibir visitas.",
      ],
    },
  },
  fr: {
    languageName: "Français",
    nav: {
      home: "Bienvenue",
      lodging: "Le logement",
      tango: "Expériences tango",
      city: "Buenos Aires",
      prepare: "Préparer le voyage",
    },
    contactLabel: "Écrire à Eva",
    footer: "Votre maison à Buenos Aires",
    contactMessage: "Bonjour Eva, je voudrais en savoir plus sur Casa Libertango.",
    pages: {
      home: {
        eyebrow: "Une bienvenue porteña",
        title: "Buenos Aires vous attend. Bienvenue chez vous.",
        intro:
          "Je suis Eva, votre hôte à Casa Libertango. Je serai ravie de vous accueillir et de vous faire découvrir ma ville, ses quartiers et le tango qui me passionne.",
        body:
          "Un lieu accueillant où séjourner, des expériences tango et des conseils personnalisés pour découvrir Buenos Aires à votre rythme.",
      },
      lodging: {
        eyebrow: "Casa Libertango · Libertad 192",
        title: "Votre pied-à-terre au cœur de Buenos Aires",
        intro:
          "Deux appartements lumineux et accueillants dans un immeuble de caractère. Choisissez celui qui vous convient et contactez-moi pour connaître les disponibilités.",
        body:
          "Après une journée en ville, retrouvez un espace calme et confortable. Je suis là pour vous renseigner sur le logement et préparer votre arrivée.",
      },
      tango: {
        eyebrow: "À vous de danser · Le tango à Buenos Aires",
        title: "Vivez le tango de l'intérieur",
        intro:
          "Cours, milongas et sorties selon vos envies. Je suis danseuse et professeure de tango : parlons de l'expérience qui vous ressemble.",
        body:
          "Cours particulier, découverte des codes de la milonga ou sortie dansante accompagnée : composons votre programme. Disponibilités et tarifs sur demande.",
      },
      city: {
        eyebrow: "Découvrez la ville comme un porteño",
        title: "Buenos Aires, à votre façon",
        intro:
          "Des quartiers, des saveurs et des lieux qui rendent la ville unique. Je vous aide à choisir des activités adaptées à vos envies et à votre séjour.",
        body:
          "De San Telmo à La Boca, des cafés historiques à la gastronomie locale, découvrez Buenos Aires avec les conseils d'une habitante.",
      },
      prepare: {
        eyebrow: "Avant votre arrivée",
        title: "Préparez votre voyage en toute sérénité",
        intro:
          "Transport, arrivée et conseils locaux : posez-moi vos questions pour organiser plus facilement votre séjour à Buenos Aires.",
        body:
          "Quelques repères avant de partir font toute la différence. Contactez-moi pour les transferts, les déplacements en ville et l'organisation de vos journées.",
      },
    },
    details: {
      twoApartments: "2 appartements",
      personalWelcome: "Eva vous accueille",
      address: "Libertad 192",
      checkIn: "Arrivée dès",
      checkOut: "Départ avant",
      askAvailability: "Vérifier les disponibilités",
      tangoServices: [
        "Cours particuliers de tango pour couples",
        "Cours de rôle féminin avec Eva",
        "Découverte des codes et coutumes de la milonga",
        "Accompagnement aux milongas, concerts et spectacles",
        "Espagnol pour les cours et les rencontres tango",
        "Conseils pour choisir chaussures et vêtements de tango",
      ],
      cityServices: [
        "Balades à San Telmo, Recoleta, Palermo et La Boca",
        "Saveurs locales : maté, empanadas, vins et cafés",
        "Itinéraires personnalisés à Buenos Aires",
      ],
      travelTips: [
        "Renseignez-vous sur les transferts depuis et vers l'aéroport.",
        "Recevez des conseils pratiques pour vous déplacer à Buenos Aires.",
        "Urgences en Argentine : Police 911 · Pompiers 100 · Médical 107.",
      ],
      houseRules: [
        "Il est interdit de fumer dans le logement.",
        "Pas de fêtes ; merci de respecter le calme après 22 h.",
        "Merci de demander avant de recevoir des visiteurs.",
      ],
    },
  },
  en: {
    languageName: "English",
    nav: {
      home: "Welcome",
      lodging: "The apartments",
      tango: "Tango experiences",
      city: "Buenos Aires",
      prepare: "Plan your trip",
    },
    contactLabel: "Ask Eva",
    footer: "Your home in Buenos Aires",
    contactMessage: "Hello Eva, I would like to ask about Casa Libertango.",
    pages: {
      home: {
        eyebrow: "A porteño welcome",
        title: "Buenos Aires is waiting. Make yourself at home.",
        intro:
          "I’m Eva, your host at Casa Libertango. I’d love to welcome you and help you discover my city: its neighbourhoods, its energy and the tango I’m passionate about.",
        body:
          "Find a welcoming place to stay and experiences to discover Buenos Aires your way. I’m here to help you plan a genuine, memorable visit.",
      },
      lodging: {
        eyebrow: "Casa Libertango · Libertad 192",
        title: "Your home in the heart of Buenos Aires",
        intro:
          "Two bright, welcoming apartments in a characterful historic building. Find the right space for your trip and ask me about availability.",
        body:
          "After a day exploring the city, come back to a comfortable, peaceful space. I’m happy to answer questions and help arrange your arrival.",
      },
      tango: {
        eyebrow: "Let’s dance · Tango in Buenos Aires",
        title: "Experience tango from the inside",
        intro:
          "Classes, milongas and outings tailored to you. I’m a tango dancer and teacher—tell me what you’re looking for and we’ll make a plan.",
        body:
          "Choose a private lesson, learn the customs of a milonga or go dancing with a local guide. Availability and prices are confirmed on request.",
      },
      city: {
        eyebrow: "Experience the city like a local",
        title: "Buenos Aires, your way",
        intro:
          "Neighbourhoods, flavours and places that make this city unique. I can help you find experiences that fit your interests and schedule.",
        body:
          "From San Telmo and La Boca to historic cafés, local food and custom walks, discover the city with recommendations from someone who lives here.",
      },
      prepare: {
        eyebrow: "Before you arrive",
        title: "Plan your trip with confidence",
        intro:
          "Transport, arrival and local advice: send me your questions and we’ll make your stay in Buenos Aires easier to plan.",
        body:
          "A little local guidance before you travel can make all the difference. Ask me about transfers, getting around and planning your days.",
      },
    },
    details: {
      twoApartments: "2 apartments",
      personalWelcome: "Hosted by Eva",
      address: "Libertad 192",
      checkIn: "Check-in from",
      checkOut: "Check-out by",
      askAvailability: "Ask about availability",
      tangoServices: [
        "Private tango classes for couples",
        "Women’s-role tango classes with Eva",
        "Guidance on milonga customs and etiquette",
        "Company for milongas, concerts and shows",
        "Spanish for tango classes and social dancing",
        "Advice on tango shoes and clothing",
      ],
      cityServices: [
        "Explore San Telmo, Recoleta, Palermo and La Boca",
        "Local flavours: mate, empanadas, wine and cafés",
        "Personalised walks around Buenos Aires",
      ],
      travelTips: [
        "Ask about transfers to and from the airport.",
        "Get local tips on getting around Buenos Aires.",
        "Argentina emergency numbers: Police 911 · Fire 100 · Medical 107.",
      ],
      houseRules: [
        "No smoking inside the apartment.",
        "No parties; please keep noise down after 10 pm.",
        "Please ask before inviting visitors.",
      ],
    },
  },
};

export function whatsappHref(message: string): string {
  return `https://wa.me/5491130281571?text=${encodeURIComponent(message)}`;
}
