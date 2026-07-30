import { Button } from "@/components/ui/button";
import { View } from "@/components/view"
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
                        <View key={index} className="relative block group min-w-0">
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

    const results = await getImages(params)

    return (
        <View className="flex-1">
            <MasonryGallery results={results} />
        </View>
    )
}

async function getImages(params: { [key: string]: string }): Promise<ImageSearchResponseType> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const search_api_url = 'https://n8n.varely.co/webhook/search/images'; //|| process.env.SEARCH_API_URL;

    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, value)
    })

    const url = `${search_api_url}?${searchParams.toString()}`
    console.log(url)

    try {
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
            throw new Error(`Search API returned ${res.status}`)
        }

        return await res.json()
    } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('Search request timed out')
        }
        throw err
    } finally {
        clearTimeout(timeout)
    }
}