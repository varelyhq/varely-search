import { NewsResult, NewsType } from "@/types/search-type";
import { WebResult } from "../search/results/web-results";
import { Flex } from "../ui/flex";

// TODO: FIX TYPING

export function NewsItem({ data }: { data: NewsResult }) {
    return (
        <Flex>
            <WebResult data={data} />
        </Flex>
    )
}

export function News({ data }: { data: NewsType }) {

    return (
        <Flex className="gap-10">
            {data.results.map((item, index) => <NewsItem key={index} data={item} />)}
        </Flex>
    )
}