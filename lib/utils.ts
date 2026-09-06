import { country_to_search_lang, language_to_user_interface_language } from "@/constants/languages"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export function buildParams(query: string, offset: string) {
    const region = usePreferencesStore.getState().region
    const stored_language = usePreferencesStore.getState().language

    const language = stored_language === 'default' ? (country_to_search_lang?.[region] || 'en') : stored_language
    const user_interface_language = language_to_user_interface_language[language] || 'en-US'

    return new URLSearchParams({
        q: query,
        offset: offset,
        // freshness: '0',
        country: region,
        search_language: language,
        user_interface_language: user_interface_language
    }).toString()
}
