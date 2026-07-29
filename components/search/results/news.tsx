import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { View } from "@/components/view";
import { NewsType, NewsResult } from "@/types/search-type";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export function NewsSingle({ data }: { data: NewsResult }) {

    return (
        <Link href={data.url} className="">
            <View className="gap-2 hover:bg-muted p-3 rounded-lg">
                <img src={data.thumbnail.src} className="h-28 w-auto object-cover rounded-lg" />
                <View className="flex-row items-center gap-1">
                    <img src={data.meta_url.favicon} className="rounded h-4 w-4" />
                    <span className="text-muted-foreground text-xs">{data.meta_url.netloc}</span>
                </View>
                <h3 className="text-sm font-medium line-clamp-2">{data.title}</h3>
                <span className="text-muted-foreground text-xs">{data.age}</span>
            </View>
        </Link>
    )
}

export function News({ data }: { data: NewsType }) {

    if (!data) return null;

    return (
        <View className="gap-6">
            <View className="flex-row items-center gap-2">
                <Newspaper size={16} className="text-muted-foreground" />
                <h2 className="font-medium">Wiadomości</h2>
            </View>
            <View className="flex-1 gap-6 xgrid grid-cols-2">
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
            </View>
        </View>
    )
}