import { country_to_search_lang, language_to_user_interface_language } from "@/constants/languages"
import { usePreferencesStore } from "@/stores/usePreferencesStore"
import { SearchParamsType } from "@/types/params-type"
import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export function buildParams(NextJsParams: ReadonlyURLSearchParams, replaceKeys?: Partial<Record<keyof SearchParamsType, string>>) {
    const params = Object.fromEntries(NextJsParams.entries())

    if (replaceKeys) {
        (Object.entries(replaceKeys) as [keyof SearchParamsType, string][]).forEach(([key, value]) => {
            if (value) params[key] = value
            else if (Object.hasOwn(params, key) && !value) delete params[key]
        })
    }

    const region = usePreferencesStore.getState().region
    const stored_language = usePreferencesStore.getState().language
    const safe_search = usePreferencesStore.getState().safeSearch

    const language = stored_language === 'default' ? (country_to_search_lang?.[region] || 'en') : stored_language
    const user_interface_language = language_to_user_interface_language[language] || 'en-US'

    const rest = {
        country: region,
        search_language: language,
        user_interface_language: user_interface_language,
        ...(Object.hasOwn(params, 'safe_search') ? {} : { safe_search: safe_search }),
    }

    return new URLSearchParams({ ...params, ...rest }).toString()
}

export function paramsToString(nextJsParams: { [key: string]: string }) {
    const readyParams = new URLSearchParams()
    Object.entries(nextJsParams).forEach(([key, value]) => {
        if (value !== undefined) readyParams.set(key, value)
    })
    return readyParams.toString()
}