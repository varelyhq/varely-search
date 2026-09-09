'use client'

import { ListFilter } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Flex } from "./ui/flex";
import { freshness } from "@/constants/search-settings";
import { buildParams } from "@/lib/utils";

export function NewsFilters() {

    const router = useRouter()
    const params = useSearchParams()

    const handleClick = (newFreshness: string) => {
        const readyParams = buildParams(params, { freshness: newFreshness })
        router.push('/news?' + readyParams)
    }

    return (
        <Flex className="gap-2">
            <Flex className="flex-row items-center gap-2">
                <ListFilter size={12} />
                <span className="text-xs text-muted-foreground">Filtruj</span>
            </Flex>
            <Flex className="flex-row flex-wrap gap-2">
                {freshness.map(option => (
                    <Button
                        key={option.value}
                        size='xs'
                        variant={option.value === (params.get('freshness') || '') ? 'default' : 'outline'}
                        onClick={() => handleClick(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </Flex>
        </Flex>
    )
}