import { BottomNav } from "@/components/bottom-nav";
import { SearchResults } from "@/components/search/results";
import { View } from "@/components/view"

type SearchPageProps = {
    searchParams: Promise<{ q?: string; spellcheck?: string; lucky?: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {

    const params = await searchParams

    if (!params.q) {
        return <div>Wpisz coś, żeby wyszukać.</div>
    }

    console.log('full_query:', params)
    const results = await getSearchResults(params)

    return (
        <View className="flex-1">
            <SearchResults results={results} />
            <BottomNav />
        </View>
    )
}

async function getSearchResults(params: { [key: string]: string }) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const search_api_url = 'https://n8n.varely.co/webhook/search'; //|| process.env.SEARCH_API_URL;

    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, value)
    })

    const url = `${search_api_url}?${searchParams.toString()}`
    console.log(url)

    try {
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
            throw new Error(`Search API returned ${res.status}`)
        }

        return await res.json()
    } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('Search request timed out')
        }
        throw err
    } finally {
        clearTimeout(timeout)
    }
}