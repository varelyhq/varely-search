import { VideosType, VideoSearchResultItem } from "@/types/search-type";
import { Film } from "lucide-react";
import { SeeMoreVideosButton } from "./see-more-button";
import { Flex } from "@/components/ui/flex";
import { VideoAge, Video as VideoBase, VideoContent, VideoDuration, VideoFavicon, VideoImage, VideoMeta, VideoSource, VideoTitle } from "@/components/ui/video";
import { Section, SectionHeader, SectionIcon, SectionTitle } from "@/components/ui/section";
import { SafeThumbnail } from "./safe-thumbnail";

export function Video({ data }: { data: VideoSearchResultItem }) {
    const video = data

    const source = (video?.video?.publisher && video?.video?.creator)
        ? `${video.video.publisher} · ${video.video.creator}`
        : video.meta_url.netloc

    return (
        <VideoBase href={video.url}>
            <VideoImage>
                <SafeThumbnail thumbnail={video.thumbnail} />
                <VideoDuration>{video.video.duration}</VideoDuration>
            </VideoImage>
            <VideoContent>
                <VideoMeta>
                    <VideoFavicon src={video.meta_url.favicon} />
                    <VideoSource>{source}</VideoSource>
                </VideoMeta>
                <VideoTitle>{video.title}</VideoTitle>
                <VideoAge>{video.age}</VideoAge>
            </VideoContent>
        </VideoBase>
    )
}

export function Videos({ data }: { data: VideosType }) {

    if (!data) return null

    return (
        <Section>
            <SectionHeader>
                <SectionIcon icon={Film} />
                <SectionTitle>Filmy</SectionTitle>
                <SeeMoreVideosButton />
            </SectionHeader>
            <Flex className="grid grid-cols-2 gap-2">
                {data.mutated_by_goggles && 'mutated_by_goggles'}
                {data.results.map((video, index) => <Video data={video} key={index} />)}
            </Flex>
        </Section>
    )
}