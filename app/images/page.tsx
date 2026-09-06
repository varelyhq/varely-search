import { GalleryItem } from "@/components/gallery-item";
import { View } from "@/components/view"
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
        <View className="flex-row gap-4 w-full">
            {columns.map((col, colIndex) => (
                <View key={colIndex} className="flex-1 gap-4 min-w-0">
                    {col.map((image, index) => <GalleryItem key={index} image={image} />)}
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
