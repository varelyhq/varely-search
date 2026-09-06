import { VideosType } from "@/types/search-type";
import { WebResultVideo } from "../search/results/web-results";
import { Flex } from "../ui/flex";

export function Videos({ data }: { data: VideosType }) {

    console.log(data.results[0])

    return (
        <Flex className="gap-10">
            {data.results.map((video, index) => <WebResultVideo key={index} data={video} />)}
        </Flex>
    )
}