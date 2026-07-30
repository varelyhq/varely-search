import { Button } from "@/components/ui/button";
import { View } from "@/components/view"
import { getImages } from "@/lib/api-images";
import { ImageSearchResponseType } from "@/types/images-type";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>
}

function MasonryGallery({ results }: { results: ImageSearchResponseType }) {

    const columnCount = 6;
    const columns: (typeof results.results)[] = Array.from({ length: columnCount }, () => []);

    results.results.forEach((image, index) => {
        columns[index % columnCount].push(image);
    });

    return (
        <View className="flex-row gap-4 w-full">
            {columns.map((col, colIndex) => (
                <View key={colIndex} className="flex-1 gap-4 min-w-0">
                    {col.map((image, index) => (
                        <View key={index} className="xrelative block group min-w-0">
                            <Link href={image.url}>
                                <Image
                                    src={image.thumbnail.src}
                                    height={image.thumbnail.height}
                                    width={image.thumbnail.width}
                                    alt=''
                                    className="w-full h-auto max-w-full rounded-lg overflow-hidden"
                                />
                                <View className="flex-row gap-1 mt-2 mb-1">
                                    <img src={image.meta_url.favicon} alt='' className="size-4" />
                                    <span className="text-xs text-muted-foreground line-clamp-1 group-hover:underline">{image.source}</span>
                                </View>
                                <span className="text-xs line-clamp-1 group-hover:underline">{image.title}</span>
                            </Link>
                            {/* <Link href={image.thumbnail.src} target='_blank'>
                                <Button size='icon-sm' variant='outline' className='absolute top-2 right-2 hidden group-hover:flex'>
                                    <ArrowUpRight />
                                </Button>
                            </Link> */}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

export default async function Page({ searchParams }: SearchPageProps) {

    const params = await searchParams

    if (!params.q) {
        return <div>Wpisz coś, żeby wyszukać.</div>
    }

    const readyParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) readyParams.set(key, value)
    })

    console.log('readyParams:', readyParams)

    const { data: results, error } = await getImages(readyParams.toString())

    if (error || !results) return (
        <View>
            Wystąpił błąd...
        </View>
    )

    return (
        <View className="flex-1">
            <MasonryGallery results={results} />
        </View>
    )
}
