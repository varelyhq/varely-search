import { GalleryItem } from "@/components/gallery-item";
import { Flex } from "@/components/ui/flex";
import { getImages } from "@/lib/api-images";
import { ImageSearchResponseType } from "@/types/images-type";

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
        <Flex className="flex-row gap-4 w-full">
            {columns.map((col, colIndex) => (
                <Flex key={colIndex} className="flex-1 gap-4 min-w-0">
                    {col.map((image, index) => <GalleryItem key={index} image={image} />)}
                </Flex>
            ))}
        </Flex>
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

    const { data: results, error } = await getImages(readyParams.toString())

    if (error || !results) return (
        <Flex>
            Wystąpił błąd...
        </Flex>
    )

    return (
        <Flex className="flex-1">
            <MasonryGallery results={results} />
        </Flex>
    )
}
