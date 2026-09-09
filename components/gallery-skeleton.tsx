import { Skeleton } from "@/components/ui/skeleton"
import { Flex } from "./ui/flex"

const TOTAL_ITEMS = 24

const HEIGHTS = [180, 240, 150, 210, 260, 170, 220, 190]

export function GallerySkeleton() {

    const items = [...Array(TOTAL_ITEMS).keys()]

    return (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-6 gap-4 w-full flex-1 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {items.map(index => (
                <GallerySkeletonItem
                    key={index}
                    height={HEIGHTS[index % HEIGHTS.length]}
                />
            ))}
        </div>
    )
}

function GallerySkeletonItem({ height }: { height: number }) {
    return (
        <Flex className="min-w-0">
            <Skeleton className="w-full" style={{ height }} />
            <Flex className="flex-row gap-1 mt-2 mb-1 items-center">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <Skeleton className="h-3 w-2/3" />
            </Flex>
            <Skeleton className="h-3 w-4/5" />
        </Flex>
    )
}