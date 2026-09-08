'use client'

import Link from "next/link";
import { DeepResults as DeepResultsType } from "@/types/search-type";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreVertical, X } from "lucide-react";
import { useState } from "react";
import { Flex } from "@/components/ui/flex";

export function DeepResults({ deep_results }: { deep_results: DeepResultsType }) {

    const [showMore, setShowMore] = useState(false)

    if (!deep_results || !deep_results?.buttons) return null

    const buttons = showMore ? deep_results.buttons : deep_results.buttons.slice(0, 3)

    return (
        <Flex className="flex-row flex-wrap gap-1 mt-1">
            {buttons.map((button, index) => (
                <Link key={index} href={button.url} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
                    {button.title}
                </Link>
            ))}
            {deep_results.buttons.length > 3
                ?
                <Button variant='secondary' size='icon-sm' onClick={() => setShowMore(!showMore)}>
                    {!showMore && <MoreVertical />}
                    {showMore && <X />}
                </Button>
                :
                null
            }
        </Flex>
    )
}