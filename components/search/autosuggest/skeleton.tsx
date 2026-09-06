import { CommandItem } from "@/components/ui/command";
import { Flex } from "@/components/ui/flex";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomInt } from "@/lib/utils";
import { Search } from "lucide-react";
import { memo } from "react";

export const AutosuggestSkeleton = memo(() => {

    const width = getRandomInt(32, 256)

    return (
        <CommandItem>
            <Search />
            <Flex className="h-5 justify-end">
                <Skeleton className='h-4' style={{ width: `${width}px` }} />
            </Flex>
        </CommandItem>
    )
})