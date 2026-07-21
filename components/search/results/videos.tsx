import { View } from "@/components/view";
import { VideoResult, VideosType } from "@/types/SearchType";
import Image from "next/image";
import Link from "next/link";

function Video({ video }: { video: VideoResult }) {

    /*
        {video.fetched_content_timestamp}
        {video.meta_url.netloc}
        {video.meta_url.scheme} 
        {video.page_age}
    */

    return (
        <Link href={video.url}>
            <View className="gap-1">

                <View className="flex-row gap-2">
                    <View className="justify-center">
                        <Image width={20} height={20} src={video.meta_url.favicon} alt='Favicon' />
                    </View>
                    <View>
                        <span className='text-sm font-medium'>{video.video.publisher} · {video.video.creator}</span>
                        <span className="text-sm text-muted-foreground">{video.meta_url.hostname} {video.meta_url.path}</span>
                    </View>
                </View>

                <h3 className="font-medium">{video.title}</h3>

                <View className="flex-row gap-4">
                    <View className="relative flex-1/4 aspect-video h-fit">
                        {video.thumbnail &&
                            <Image
                                className="rounded-lg object-cover"
                                fill
                                src={video.thumbnail.src}
                                alt={video.thumbnail.alt || ''}
                                aria-logo={video.thumbnail.logo}
                                aria-original={video.thumbnail.original}
                            />
                        }
                        <span className="bg-white/50 text-xs absolute bottom-1 left-1 rounded-full py-0.5 px-1">
                            {video.video.duration}
                        </span>
                    </View>

                    <View className="justify-between flex-3/4">
                        <span className="text-sm text-muted-foreground">
                            {video.description}
                        </span>

                        <span className="text-sm">
                            {video.age}
                        </span>
                    </View>
                </View>

            </View>
        </Link>
    )
}

export function Videos({ videos }: { videos: VideosType }) {

    if (!videos) return null;

    return (
        <View className="mt-8 gap-6 max-w-156 gridx grid-cols-2">
            {videos.mutated_by_goggles && 'mutated_by_goggles'}
            {videos.results.map((video, index) => (
                <Video video={video} key={index} />
            ))}
        </View>
    )
}