import { SearchResults } from "@/components/SearchResults";
import { View } from "@/components/view"

interface SearchPageProps {
    searchParams: Promise<{ q?: string; lucky?: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {

    const { q: query } = await searchParams

    if (!query) {
        return <div>Wpisz coś, żeby wyszukać.</div>
    }

    const results = await getSearchResults(query)

    return (
        <View className="flex-1">

            <SearchResults results={results} />

        </View>
    )
}

async function getSearchResults(query: string) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const search_api_url = 'https://n8n.varely.co/webhook/search'; //|| process.env.SEARCH_API_URL;
    
    console.log(`${search_api_url}?q=${encodeURIComponent(query)}`)
    
    try {
        const res = await fetch(
            `${search_api_url}?q=${encodeURIComponent(query)}`,
            {
                // headers: { Authorization: `Bearer ${process.env.SEARCH_API_KEY}` },
                cache: 'no-store',
                signal: controller.signal,
            }
        )

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