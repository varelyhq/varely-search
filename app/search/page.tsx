import { AISearchSummary } from "@/components/ask/ai-search-summary";
import { BottomNav } from "@/components/bottom-nav";
import { LoadingLayout } from "@/components/loading-layout";
import { SearchResults } from "@/components/search/results";
import { View } from "@/components/view"
import { getSearch } from "@/lib/api-search";

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {

    const params = await searchParams

    if (!params.q) {
        return <div>Wpisz coś, żeby wyszukać.</div>
    }

    const readyParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) readyParams.set(key, value)
    })

    const { data: results, error } = await getSearch(readyParams.toString())

    if (error || !results) return (
        <View className="flex-1">
            Wystąpił błąd
        </View>
    )

    return (
        <View className="flex-1">
            <LoadingLayout />
            <View className="mb-6">
                <AISearchSummary query={params.q} />
            </View>
            <SearchResults results={results} />
            <BottomNav />
        </View>
    )
}
