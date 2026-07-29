import { View } from "@/components/view";
import { VideosType, VideoSearchResultItem, SearchResult } from "@/types/search-type";
import { Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SeeMoreVideosButton } from "./see-more-button";

export function WebResultVideo({ data }: { data: SearchResult }) {
    return (
        <View>

        </View>
    )
}

export function Video({ data }: { data: VideoSearchResultItem }) {

    const video = data
    /*
        {video.fetched_content_timestamp}
        {video.meta_url.netloc}
        {video.meta_url.scheme} 
        {video.page_age}
    */

    return (
        <Link href={video.url} className="">
            <View className="flex-row gap-3 bg-muted/50 hover:bg-muted p-3 rounded-lg">

                <View className="relative flex-2/5 aspect-3/2 h-full">
                    {video.thumbnail &&
                        <Image
                            className="rounded-lg object-cover h-full"
                            fill
                            src={video.thumbnail.src}
                            alt={''}
                        />
                    }
                    <span className="bg-white/50 text-xs absolute bottom-1 right-1 rounded-full py-0.5 px-1">
                        {video.video.duration}
                    </span>
                </View>

                <View className="flex-3/5 gap-1">
                    <View className="flex-row items-center gap-2">
                        <View className="justify-center">
                            <Image width={14} height={14} src={video.meta_url.favicon} alt='Favicon' />
                        </View>
                        <View>
                            <span className='text-xs text-muted-foreground'>
                                {(video?.video?.publisher && video?.video?.creator)
                                    ? `${video.video.publisher} · ${video.video.creator}`
                                    : video.meta_url.netloc
                                }
                            </span>
                            {/* <span className="text-sm text-muted-foreground">{video.meta_url.netloc} {video.meta_url.path}</span> */}
                        </View>
                    </View>

                    <h3 className="text-xs font-medium line-clamp-2">{video.title}</h3>

                    <View className="mt-1">
                        <span className="text-xs text-muted-foreground">
                            {video.age}
                        </span>
                    </View>
                </View>

            </View>
        </Link>
    )
}

export function Videos({ data }: { data: VideosType }) {

    if (!data) return null

    return (
        <View className='gap-2'>
            <View className="flex-row items-center gap-2 ml-3">
                <Film size={16} className="text-muted-foreground" />
                <h3 className="font-medium">Filmy</h3>
                <SeeMoreVideosButton />
            </View>
            <View className="grid grid-cols-2 gap-2">
                {data.mutated_by_goggles && 'mutated_by_goggles'}
                {data.results.map((video, index) => (
                    <Video data={video} key={index} />
                ))}
            </View>
        </View>
    )
}