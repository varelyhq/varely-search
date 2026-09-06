'use client'

import Link from "next/link";
import { DeepResults as DeepResultsType } from "@/types/search-type";
import { Button } from "@/components/ui/button";
import { MoreVertical, X } from "lucide-react";
import { useState } from "react";
import { Flex } from "@/components/ui/flex";

export function DeepResults({ deep_results }: { deep_results: DeepResultsType }) {

    if (!deep_results) return null

    const DeepResultsButtons = () => {

        const [showMore, setShowMore] = useState(false)

        const buttons = showMore ? deep_results.buttons : deep_results.buttons.slice(0, 3)

        return (
            <Flex className="flex-row flex-wrap gap-1">
                {buttons.map((button, index) => (
                    <Link key={index} href={button.url}>
                        <Button variant='secondary' size='sm'>
                            {button.title}
                        </Button>
                    </Link>
                ))}
                <Button variant='secondary' size='icon-sm' onClick={() => setShowMore(!showMore)}>
                    {!showMore && <MoreVertical />}
                    {showMore && <X />}
                </Button>
            </Flex>
        )
    }

    return (
        <Flex className="gap-2 mt-1">
            {deep_results.buttons && <DeepResultsButtons />}
            {/* {deep_results.images && deep_results.images.map((image, index) => (
            ))} */}
        </Flex>
    )
}
