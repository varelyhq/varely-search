import { VideosType } from "@/types/search-type";
import { View } from "../view";
import { Video } from "../search/results/videos";
import { WebResultVideo } from "../search/results/web-results";

export function Videos({ data }: { data: VideosType }) {

    console.log(data.results[0])

    return (
        <View className="gap-10">
            {data.results.map((video, index) => <WebResultVideo key={index} data={video} />)}
        </View>
    )
}