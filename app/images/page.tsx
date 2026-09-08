import { EmptyQuery } from "@/components/empty-query";
import { SearchError } from "@/components/search/search-error";
import { GalleryItem } from "@/components/gallery-item";
import { Flex } from "@/components/ui/flex";
import { getImages } from "@/lib/api-images";
import { paramsToString } from "@/lib/utils";
import { ParamsType } from "@/types/params-type";

export default async function Page({ searchParams }: ParamsType) {

    const originalParams = await searchParams
    if (!originalParams.q) return <EmptyQuery />

    const params = paramsToString(originalParams)
    const { data, error } = await getImages(params)
    if (error || !data) return <SearchError />

    const columnCount = 6
    const columns: (typeof data.results)[] = Array.from({ length: columnCount }, () => [])

    data.results.forEach((image, index) => {
        columns[index % columnCount].push(image);
    })

    return (
        <Flex className="flex-1 flex-row gap-4 w-full">
            {columns.map((col, colIndex) => (
                <Flex key={colIndex} className="flex-1 gap-4 min-w-0">
                    {col.map((image, index) => <GalleryItem key={index} image={image} />)}
                </Flex>
            ))}
        </Flex>
    )
}