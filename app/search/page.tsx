import { AISearchSummary } from "@/components/ask/ai-search-summary";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyQuery } from "@/components/empty-query";
import { SearchResults } from "@/components/search/results";
import { WebResultsSkeletons } from "@/components/search/results/web-results/skeleton";
import { SearchError } from "@/components/search/search-error";
import { Flex } from "@/components/ui/flex";
import { getSearch } from "@/lib/api-search";
import { paramsToString } from "@/lib/utils";
import { ParamsType } from "@/types/params-type";
import { Suspense } from "react";

async function SearchResultsContent({ params }: { params: string }) {

    const { data, error } = await getSearch(params)
    if (error || !data) return <SearchError />

    return <SearchResults results={data} />
}

export default async function Page({ searchParams }: ParamsType) {

    const originalParams = await searchParams
    if (!originalParams.q) return <EmptyQuery />

    const params = paramsToString(originalParams)

    return (
        <Flex className="flex-1">
            {originalParams.offset === '0' &&
                <Flex className="mb-6">
                    <AISearchSummary query={originalParams.q} />
                </Flex>
            }
            <Suspense key={params} fallback={<WebResultsSkeletons />}>
                <SearchResultsContent params={params} />
            </Suspense>
            <BottomNav />
        </Flex>
    )
}