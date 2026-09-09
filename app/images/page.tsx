import { EmptyQuery } from "@/components/empty-query";
import { SearchError } from "@/components/search/search-error";
import { GalleryItem } from "@/components/gallery-item";
import { getImages } from "@/lib/api-images";
import { paramsToString } from "@/lib/utils";
import { ParamsType } from "@/types/params-type";

export default async function Page({ searchParams }: ParamsType) {

    const originalParams = await searchParams
    if (!originalParams.q) return <EmptyQuery />

    const params = paramsToString(originalParams)
    const { data, error } = await getImages(params)
    if (error || !data) return <SearchError />

    return (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-6 gap-4 w-full flex-1 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {data.results.map((image, index) => (
                <GalleryItem key={index} image={image} />
            ))}
        </div>
    )
}