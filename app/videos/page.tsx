import { getVideos } from "@/lib/api-videos"
import { Flex } from "@/components/ui/flex";
import { WebResultVideo } from "@/components/search/results/web-results/video";
import { paramsToString } from "@/lib/utils";
import { ParamsType } from "@/types/params-type";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyQuery } from "@/components/empty-query";
import { SearchError } from "@/components/search/search-error";

export default async function Page({ searchParams }: ParamsType) {

    const originalParams = await searchParams
    if (!originalParams.q) return <EmptyQuery />

    const params = paramsToString(originalParams)
    const { data, error } = await getVideos(params)

    if (error || !data) return <SearchError />

    return (
        <Flex className="max-w-156 gap-8">
            {/* @ts-ignore TODO: FIX TYPING!!! */}
            {data.results.map((video, index) => <WebResultVideo key={index} data={video} />)}
            <BottomNav />
        </Flex>
    )
}