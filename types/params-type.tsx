export type SearchParamsType = {
    q: string
    offset: string
    freshness: string
    safe_search: string
    country: string
    search_language: string
    user_interface_language: string
}

export type ParamsType = {
    searchParams: Promise<SearchParamsType>
}