"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Flex } from "@/components/ui/flex";
import { NewsType, NewsResult, Thumbnail } from "@/types/search-type";
import { Newspaper, Text } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function NewsThumbnail({ thumbnail }: { thumbnail: Thumbnail }) {

    const [error, setError] = useState(false)

    if (error) return (
        <Flex className="h-28 w-auto items-center justify-center">
            <Text className="size-12 text-muted-foreground" />
        </Flex>
    )

    return (
        <Image
            src={thumbnail.src}
            alt={thumbnail.alt || ''}
            width={thumbnail.width || 100}
            height={thumbnail.height || 100}
            className="h-28 w-auto object-cover rounded-lg"
            onError={() => setError(true)}
        />
    )
}

export function NewsSingle({ data }: { data: NewsResult }) {

    return (
        <Link href={data.url} className="">
            <Flex className="gap-2 hover:bg-muted p-3 rounded-lg">
                <NewsThumbnail thumbnail={data.thumbnail} />
                <Flex className="flex-row items-center gap-1">
                    <img src={data.meta_url.favicon} className="rounded h-4 w-4" />
                    <span className="text-muted-foreground text-xs">{data.meta_url.netloc}</span>
                </Flex>
                <h3 className="text-sm font-medium line-clamp-2">{data.title}</h3>
                <span className="text-muted-foreground text-xs">{data.age}</span>
            </Flex>
        </Link>
    )
}

export function News({ data }: { data: NewsType }) {

    if (!data) return null;

    return (
        <Flex className="gap-6">
            <Flex className="flex-row items-center gap-2">
                <Newspaper size={16} className="text-muted-foreground" />
                <h2 className="font-medium">Wiadomości</h2>
            </Flex>
            <Flex className="flex-1 gap-6 xgrid grid-cols-2">
                <Carousel className="flex-1">
                    <CarouselContent>
                        {data.results.map((item, index) => (
                            <CarouselItem className="pl-1 basis-1/3" key={index}>
                                <NewsSingle data={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Flex>
        </Flex>
    )
}