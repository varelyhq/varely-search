'use client'

import { useSearchQueryStore } from "@/stores/useSearchQueryStore";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { View } from "../view";

export function BottomNav() {

    const offset = useSearchQueryStore(s => s.offset)
    const setOffset = useSearchQueryStore(s => s.setOffset)

    const items = [...Array(10).keys()]

    const prevPage = offset !== 0 ? () => setOffset(offset - 1) : () => { }
    const nextPage = offset !== 9 ? () => setOffset(offset + 1) : () => { }

    return (
        <View className="mt-8">
            <Pagination className="justify-start">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={prevPage} />
                    </PaginationItem>

                    {items.map(item => (
                        <PaginationItem key={item}>
                            <PaginationLink
                                isActive={item === offset}
                                onClick={() => setOffset(item)}
                            >
                                {item + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext onClick={nextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </View >
    )
}