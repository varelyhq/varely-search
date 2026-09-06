'use client'

import { useSearchStore } from "@/stores/useSearchStore";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { useRouter } from "next/navigation";
import { Flex } from "../ui/flex";

export function BottomNav() {

    const router = useRouter()

    const offset = useSearchStore(s => s.offset)
    const setOffset = useSearchStore(s => s.setOffset)

    const items = [...Array(10).keys()]

    const prevPage = offset !== 0 ? () => setOffset(offset - 1, router) : () => { }
    const nextPage = offset !== 9 ? () => setOffset(offset + 1, router) : () => { }

    return (
        <Flex className="mt-8">
            <Pagination className="justify-start">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious text="Poprzedni" onClick={prevPage} />
                    </PaginationItem>

                    {items.map(item => (
                        <PaginationItem key={item}>
                            <PaginationLink
                                isActive={item === offset}
                                onClick={() => setOffset(item, router)}
                            >
                                {item + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext text="Następny" onClick={nextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Flex>
    )
}