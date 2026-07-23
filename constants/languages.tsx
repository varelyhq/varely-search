
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
]

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

export const country = [
    ...countries_europe,
    ...countries_asia,
    ...countries_north_america,
    ...countries_south_america,
    ...countries_oceania,
    ...countries_africa
]

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
]

export const country_translations: Record<string, string> = {
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
    // 'ALL': 'All',
}
