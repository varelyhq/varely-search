import { NewsFilters } from "@/components/news-filters"
import { getNews } from "@/lib/api-news"
import { Flex } from "@/components/ui/flex";
import { WebResult } from "@/components/search/results/web-results";
import { paramsToString } from "@/lib/utils";
import { ParamsType } from "@/types/params-type";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyQuery } from "@/components/empty-query";
import { SearchError } from "@/components/search/search-error";

export default async function Page({ searchParams }: ParamsType) {

    const originalParams = await searchParams
    if (!originalParams.q) return <EmptyQuery />

    const params = paramsToString(originalParams)
    const { data, error } = await getNews(params)

    if (error || !data) return <SearchError />

    return (
        <Flex className="max-w-156 gap-8">
            <NewsFilters />
            {/* @ts-ignore TODO: FIX TYPING!!! */}
            {data.results.map((item, index) => <WebResult key={index} data={item} />)}
            <BottomNav />
        </Flex>
    )
}