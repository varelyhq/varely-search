import { Flex } from "@/components/ui/flex";
import { CirclePlay } from "lucide-react";
import Link from "next/link";
import { DeepResults } from "./deep-results";
import { SearchResult } from "@/types/search-type";
import { Result, ResultContent, ResultDescription, ResultFavicon, ResultHeader, ResultMeta, ResultMetaPath, ResultMetaTitle, ResultTitle, ResultTop } from "@/components/ui/result";
import { VideoDuration } from "@/components/ui/video";
import { cn } from "@/lib/utils";

function VideoThumbnail({ className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img className={cn("rounded-lg object-cover h-full w-full", className)} {...rest} />
}

function VideoPlayIcon() {
    return (
        <CirclePlay
            size={32}
            className="absolute text-white/75 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-index-20"
        />
    )
}

function VideoImage({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) {
    return (
        <Link href={href} className={cn("relative aspect-video h-full", className)}>
            {children}
        </Link>
    )
}

export function WebResultVideo({ data }: { data: SearchResult }) {

    const title = data?.profile?.name || data?.video?.publisher || data?.meta_url?.netloc

    return (
        <Result>
            <ResultContent>
                <Flex className="flex-row gap-2">
                    <VideoImage href={data.url} className="md:hidden h-auto w-1/3">
                        <VideoThumbnail
                            src={data.video?.thumbnail?.src || data.thumbnail?.src}
                            alt={data.video?.thumbnail?.alt || data.thumbnail?.alt}
                        />
                        <VideoDuration>{data.video.duration}</VideoDuration>
                        <VideoPlayIcon />
                    </VideoImage>
                    <ResultHeader href={data.url}>
                        <ResultTop>
                            <ResultFavicon src={data.meta_url.favicon} alt={data.meta_url.netloc} />
                            <ResultMeta>
                                <ResultMetaTitle>{title}</ResultMetaTitle>
                                <ResultMetaPath>{data.meta_url.netloc} {data.meta_url.path}</ResultMetaPath>
                            </ResultMeta>
                        </ResultTop>
                        <ResultTitle>{data.title}</ResultTitle>
                    </ResultHeader>
                </Flex>

                <Flex className="hidden md:flex flex-row gap-2">
                    <VideoImage href={data.url} className="flex-1/4">
                        <VideoThumbnail
                            src={data.video?.thumbnail?.src || data.thumbnail?.src}
                            alt={data.video?.thumbnail?.alt || data.thumbnail?.alt}
                        />
                        <VideoDuration>{data.video.duration}</VideoDuration>
                        <VideoPlayIcon />
                    </VideoImage>
                    <Flex className="flex-3/4">
                        <ResultDescription age={data.age} ageLocation='bottom'>
                            {data.description}
                        </ResultDescription>
                    </Flex>
                </Flex>

                <DeepResults deep_results={data.deep_results} />

            </ResultContent>
        </Result>
    )
}