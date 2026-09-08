import { Flex } from "@/components/ui/flex"
import { Skeleton } from "@/components/ui/skeleton"

export function WebResultSkeleton() {
    return (
        <Flex className="flex-row gap-6 justify-between">
            <Flex className="flex-1 gap-1">
                <Flex className="gap-2">
                    <Flex className="flex-row gap-2 items-center">
                        <Skeleton className="w-5 h-5 rounded shrink-0" />
                        <Flex className="gap-1">
                            <Skeleton className="h-3.5 w-24" />
                            <Skeleton className="h-3 w-40" />
                        </Flex>
                    </Flex>
                    <Skeleton className="h-5 w-3/4" />
                </Flex>
                <Flex className="gap-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </Flex>
            </Flex>
            <Skeleton className="h-20 w-20 shrink-0 rounded" />
        </Flex>
    )
}

export function WebResultsSkeletons() {
    return (
        <Flex className="max-w-156 gap-8">
            {[...Array(10).keys()].map(key => <WebResultSkeleton key={key} />)}
        </Flex>
    )
}