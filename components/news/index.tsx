import { NewsResult, NewsType } from "@/types/search-type";
import { View } from "../view";
import { WebResult } from "../search/results/web-results";

// TODO: FIX TYPING

export function NewsItem({ data }: { data: NewsResult }) {
    return (
        <View>
            <WebResult data={data} />
        </View>
    )
}

export function News({ data }: { data: NewsType }) {

    return (
        <View className="gap-10">
            {data.results.map((item, index) => <NewsItem key={index} data={item} />)}
        </View>
    )
}