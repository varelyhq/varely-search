export const freshness = [
    { label: "Wszystko", value: '' },
    { label: "Wczoraj", value: 'pd' },
    { label: "Poprzedni tydzień", value: 'pw' },
    { label: "Poprzedni miesiąc", value: 'pm' },
    { label: "Poprzedni rok", value: 'py' },
]

export const freshness_translations: Record<string, string> = {
    '': 'Wszystko',
    'pd': 'Wczoraj',
    'pw': 'Poprzedni tydzień',
    'pm': 'Poprzedni miesiąc',
    'py': 'Poprzedni rok'
}

export const safe_search = [
    { label: "Ściśle", value: "strict" },
    { label: "Umiarkowanie", value: "moderate" },
    { label: "Wył.", value: "off" },
]

export const safe_search_translations = {
    strict: 'Ściśle',
    moderate: 'Umiarkowanie',
    off: 'Wyłączone'
}