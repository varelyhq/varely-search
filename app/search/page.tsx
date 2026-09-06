import { AISearchSummary } from "@/components/ask/ai-search-summary";
import { BottomNav } from "@/components/bottom-nav";
import { SearchResults } from "@/components/search/results";
import { WebResultsSkeletons } from "@/components/search/results/web-results";
import { Flex } from "@/components/ui/flex";
import { getSearch } from "@/lib/api-search";
import { Suspense } from "react";

type SearchPageProps = {
    searchParams: Promise<{ q?: string; offset?: string; }>
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

    const queryKey = readyParams.toString()

    return (
        <Flex className="flex-1">
            {params.offset === '0' &&
                <Flex className="mb-6">
                    <AISearchSummary query={params.q} />
                </Flex>
            }
            <Suspense key={queryKey} fallback={<WebResultsSkeletons />}>
                <SearchResultsContent queryString={queryKey} />
            </Suspense>
            <BottomNav />
        </Flex>
    )
}

async function SearchResultsContent({ queryString }: { queryString: string }) {

    const { data: results, error } = await getSearch(queryString)

    if (error || !results) return <Flex className="flex-1">Wystąpił błąd</Flex>

    return <SearchResults results={results} />
}
