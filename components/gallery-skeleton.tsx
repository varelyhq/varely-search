import { Flex } from "@/components/ui/flex"
import { Skeleton } from "@/components/ui/skeleton"

const ITEMS_PER_COLUMN = 4

const HEIGHTS = [180, 240, 150, 210, 260, 170, 220, 190]

export function GallerySkeleton() {

    const columns = [...Array(6).keys()]
    const items = [...Array(ITEMS_PER_COLUMN).keys()]

    return (
        <Flex className="flex-1 flex-row gap-4 w-full">
            {columns.map(index => (
                <Flex key={index} className="flex-1 gap-4 min-w-0">
                    {items.map(itemIndex => (
                        <GallerySkeletonItem
                            key={itemIndex}
                            height={HEIGHTS[(index * ITEMS_PER_COLUMN + itemIndex) % HEIGHTS.length]}
                        />
                    ))}
                </Flex>
            ))}
        </Flex>
    )
}

function GallerySkeletonItem({ height }: { height: number }) {
    return (
        <Flex className="block min-w-0">
            <Skeleton className="w-full" style={{ height }} />
            <Flex className="flex-row gap-1 mt-2 mb-1 items-center">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <Skeleton className="h-3 w-2/3" />
            </Flex>
            <Skeleton className="h-3 w-4/5" />
        </Flex>
    )
}