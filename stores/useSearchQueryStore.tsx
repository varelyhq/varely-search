import { create } from "zustand"
import { usePreferencesStore } from "./usePreferencesStore"
import { country_to_search_lang, language_to_user_interface_language } from "@/constants/languages"

type SearchQueryState = {
    query: string,
    setQuery: (query: string) => void
    buildParams: () => void
}

const defaults = {
    query: '' as string
}

export const useSearchQueryStore = create<SearchQueryState>()(
    (set, get) => ({
        ...defaults,
        setQuery: query => set({ query }),
        buildParams: () => {
            const region = usePreferencesStore.getState().region;
            const stored_language = usePreferencesStore.getState().language

            const language = stored_language === 'default' ? (country_to_search_lang?.[region] || 'en') : stored_language
            const user_interface_language = language_to_user_interface_language[language] || 'en-US';

            return new URLSearchParams({
                q: get().query,
                country: region,
                search_language: language,
                user_interface_language: user_interface_language
            }).toString()
        }
    })
)