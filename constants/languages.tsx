// The 2 or more character language code for which the search results are provided.
export const search_lang = [
    'ar',
    'eu',
    'bn',
    'bg',
    'ca',
    'zh-hans',
    'zh-hant',
    'hr',
    'cs',
    'da',
    'nl',
    'en',
    'en-gb',
    'et',
    'fi',
    'fr',
    'gl',
    'de',
    'el',
    'gu',
    'he',
    'hi',
    'hu',
    'is',
    'it',

    'ja',
    'jp',
    'kn',
    'ko',
    'lv',
    'lt',
    'ms',
    'ml',
    'mr',
    'nb',
    'pl',
    'pt-br',
    'pt-pt',
    'pa',
    'ro',
    'ru',
    'sr',
    'sk',
    'sl',
    'es',
    'sv',
    'ta',
    'te',
    'th',
    'tr',
    'uk',
    'vi',
] as const

// User interface language preferred in response. Usually of the format <language_code>-<country_code>. For more, see RFC 9110.
export const ui_lang = [
    'es-AR',
    'en-AU',
    'de-AT',
    'nl-BE',
    'fr-BE',
    'pt-BR',
    'en-CA',
    'fr-CA',
    'es-CL',
    'da-DK',
    'fi-FI',
    'fr-FR',
    'de-DE',
    'el-GR',
    'zh-HK',
    'en-IN',
    'en-ID',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'en-MY',
    'es-MX',
    'nl-NL',
    'en-NZ',
    'no-NO',
    'zh-CN',
    'pl-PL',
    'en-PH',
    'ru-RU',
    'en-ZA',
    'es-ES',
    'sv-SE',
    'fr-CH',
    'de-CH',
    'zh-TW',
    'tr-TR',
    'en-GB',
    'en-US',
    'es-US',
] as const

// The 2 character country code where the search results come from.
export const countries_europe = [
    'AT',
    'BE',
    'CH',
    'DE',
    'DK',
    'ES',
    'FI',
    'FR',
    'GB',
    'GR',
    'IT',
    'NL',
    'NO',
    'PL',
    'PT',
    'RU',
    'SE',
    'TR',
]

export const countries_asia = [
    'CN',
    'HK',
    'ID',
    'IN',
    'JP',
    'KR',
    'MY',
    'PH',
    'SA',
    'TW',
]

export const countries_north_america = [
    'CA',
    'MX',
    'US',
]

export const countries_south_america = [
    'AR',
    'BR',
    'CL',
]

export const countries_oceania = [
    'AU',
    'NZ',
]

export const countries_africa = [
    'ZA',
]

export const countries = [
    ...countries_europe,
    ...countries_asia,
    ...countries_north_america,
    ...countries_south_america,
    ...countries_oceania,
    ...countries_africa
] as const

export const continents = [
    {
        id: 'africa',
        label: 'Africa',
        countries: countries_africa
    },
    {
        id: 'asia',
        label: 'Asia',
        countries: countries_asia
    },
    {
        id: 'europe',
        label: 'Europe',
        countries: countries_europe
    },
    {
        id: 'north-america',
        label: 'North America',
        countries: countries_north_america
    },
    {
        id: 'south-america',
        label: 'South America',
        countries: countries_south_america
    },
    {
        id: 'oceania',
        label: 'Oceania',
        countries: countries_oceania
    },
]

export const country_translations_en: Record<string, string> = {
    'AR': 'Argentina',
    'AU': 'Australia',
    'AT': 'Austria',
    'BE': 'Belgium',
    'BR': 'Brazil',
    'CA': 'Canada',
    'CL': 'Chile',
    'DK': 'Denmark',
    'FI': 'Finland',
    'FR': 'France',
    'DE': 'Germany',
    'GR': 'Greece',
    'HK': 'Hong Kong',
    'IN': 'India',
    'ID': 'Indonesia',
    'IT': 'Italy',
    'JP': 'Japan',
    'KR': 'South Korea',
    'MY': 'Malaysia',
    'MX': 'Mexico',
    'NL': 'Netherlands',
    'NZ': 'New Zealand',
    'NO': 'Norway',
    'CN': 'China',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PH': 'Philippines',
    'RU': 'Russia',
    'SA': 'Saudi Arabia',
    'ZA': 'South Africa',
    'ES': 'Spain',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'TW': 'Taiwan',
    'TR': 'Turkey',
    'GB': 'United Kingdom',
    'US': 'United States',
}

export const country_translations: Record<string, string> = {
    'AR': 'Argentyna',
    'AU': 'Australia',
    'AT': 'Austria',
    'BE': 'Belgia',
    'BR': 'Brazylia',
    'CA': 'Kanada',
    'CL': 'Chile',
    'DK': 'Dania',
    'FI': 'Finlandia',
    'FR': 'Francja',
    'DE': 'Niemcy',
    'GR': 'Grecja',
    'HK': 'Hongkong',
    'IN': 'Indie',
    'ID': 'Indonezja',
    'IT': 'Włochy',
    'JP': 'Japonia',
    'KR': 'Korea Południowa',
    'MY': 'Malezja',
    'MX': 'Meksyk',
    'NL': 'Holandia',
    'NZ': 'Nowa Zelandia',
    'NO': 'Norwegia',
    'CN': 'Chiny',
    'PL': 'Polska',
    'PT': 'Portugalia',
    'PH': 'Filipiny',
    'RU': 'Rosja',
    'SA': 'Arabia Saudyjska',
    'ZA': 'Republika Południowej Afryki',
    'ES': 'Hiszpania',
    'SE': 'Szwecja',
    'CH': 'Szwajcaria',
    'TW': 'Tajwan',
    'TR': 'Turcja',
    'GB': 'Wielka Brytania',
    'US': 'Stany Zjednoczone',
}

export const language_to_user_interface_language: Record<string, string | null> = {
    ar: null,
    eu: null,
    bn: null,
    bg: null,
    ca: null,
    'zh-hans': 'zh-CN',
    'zh-hant': 'zh-TW',
    hr: null,
    cs: null,
    da: 'da-DK',
    nl: 'nl-NL',
    en: 'en-US',
    'en-gb': 'en-GB',
    et: null,
    fi: 'fi-FI',
    fr: 'fr-FR',
    gl: null,
    de: 'de-DE',
    el: 'el-GR',
    gu: null,
    he: null,
    hi: null,
    hu: null,
    is: null,
    it: 'it-IT',
    ja: 'ja-JP',
    jp: 'ja-JP',
    kn: null,
    ko: 'ko-KR',
    lv: null,
    lt: null,
    ms: null,
    ml: null,
    mr: null,
    nb: 'no-NO',
    pl: 'pl-PL',
    'pt-br': 'pt-BR',
    'pt-pt': null,
    pa: null,
    ro: null,
    ru: 'ru-RU',
    sr: null,
    sk: null,
    sl: null,
    es: 'es-ES',
    sv: 'sv-SE',
    ta: null,
    te: null,
    th: null,
    tr: 'tr-TR',
    uk: null,
    vi: null,
} as const

export const country_to_search_lang: Record<string, string | null> = {
    AR: 'es',        // Argentyna - hiszpański
    AU: 'en',        // Australia - angielski
    AT: 'de',        // Austria - niemiecki
    BE: 'nl',        // Belgia - WIELOJĘZYCZNA (nl + fr oficjalne), wybrano nl; alternatywnie 'fr'
    BR: 'pt-br',      // Brazylia - portugalski (Brazylia)
    CA: 'en',        // Kanada - WIELOJĘZYCZNA (en + fr oficjalne), wybrano en; alternatywnie 'fr'
    CL: 'es',        // Chile - hiszpański
    DK: 'da',        // Dania - duński
    FI: 'fi',        // Finlandia - fiński
    FR: 'fr',        // Francja - francuski
    DE: 'de',        // Niemcy - niemiecki
    GR: 'el',        // Grecja - grecki
    HK: 'zh-hant',    // Hong Kong - chiński tradycyjny (brak dedykowanego kodu HK)
    IN: 'hi',        // Indie - WIELOJĘZYCZNE, wybrano hindi; alternatywnie 'en' (też oficjalny)
    ID: null,        // Indonezja - BRAK odpowiednika (indonezyjski nie występuje w search_lang)
    IT: 'it',        // Włochy - włoski
    JP: 'ja',        // Japonia - japoński (w search_lang jest też duplikat 'jp')
    KR: 'ko',        // Korea Południowa - koreański
    MY: 'ms',        // Malezja - malajski
    MX: 'es',        // Meksyk - hiszpański
    NL: 'nl',        // Holandia - niderlandzki
    NZ: 'en',        // Nowa Zelandia - angielski
    NO: 'nb',        // Norwegia - norweski (search_lang ma tylko wariant 'nb' - Bokmål)
    CN: 'zh-hans',    // Chiny - chiński uproszczony
    PL: 'pl',        // Polska - polski
    PT: 'pt-pt',      // Portugalia - portugalski (Portugalia)
    PH: null,        // Filipiny - BRAK odpowiednika (filipino/tagalog nie występuje w search_lang)
    RU: 'ru',        // Rosja - rosyjski
    SA: 'ar',        // Arabia Saudyjska - arabski
    ZA: null,        // RPA - BRAK jednoznacznego odpowiednika (wiele języków urzędowych, 'en' to za mało precyzyjne)
    ES: 'es',        // Hiszpania - hiszpański (uwaga: w search_lang są też 'ca' i 'gl' - regionalne)
    SE: 'sv',        // Szwecja - szwedzki
    CH: 'de',        // Szwajcaria - WIELOJĘZYCZNA (de + fr + it oficjalne), wybrano de; alternatywnie 'fr'/'it'
    TW: 'zh-hant',    // Tajwan - chiński tradycyjny
    TR: 'tr',        // Turcja - turecki
    GB: 'en-gb',      // Wielka Brytania - angielski (UK)
    US: 'en',        // Stany Zjednoczone - angielski
} as const