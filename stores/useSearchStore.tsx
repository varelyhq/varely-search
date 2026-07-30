import { create } from "zustand"
import { usePreferencesStore } from "./usePreferencesStore"
import { country_to_search_lang, language_to_user_interface_language } from "@/constants/languages"
import { getSearch } from "@/lib/api-search"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type SearchState = {
    query: string,
    offset: number,
    loading: boolean,
    setQuery: (query: string) => void
    setLoading: (loading: boolean) => void
    setOffset: (offset: number, router: AppRouterInstance) => void
    buildParams: () => string
    getSearchResults: (router: AppRouterInstance) => Promise<void>
}

const defaults = {
    query: '',
    offset: 0,
    loading: false
}

export const useSearchStore = create<SearchState>()(
    (set, get) => ({
        ...defaults,
        setQuery: query => set({ query }),
        setLoading: loading => set({ loading }),
        setOffset: (offset, router) => {
            set({ offset, loading: true })
            const params = get().buildParams()
            router.push('/search?' + params)
        },
        buildParams: () => {
            const region = usePreferencesStore.getState().region;
            const stored_language = usePreferencesStore.getState().language

            const language = stored_language === 'default' ? (country_to_search_lang?.[region] || 'en') : stored_language
            const user_interface_language = language_to_user_interface_language[language] || 'en-US';

            return new URLSearchParams({
                q: get().query,
                offset: get().offset.toString(),
                country: region,
                search_language: language,
                user_interface_language: user_interface_language
            }).toString()
        },
        getSearchResults: async router => {
            const query = get().query
            if (!query.trim()) return

            set({ loading: true })

            const params = get().buildParams()

            // const { data, error } = await getSearch(params)

            // console.log(data, error)

            // if (error) {
            //     console.warn(error)
            //     set({ loading: false })
            //     return
            // }

            router.push('/search?' + params)
        }
    })
)