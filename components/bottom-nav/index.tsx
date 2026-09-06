'use client'

import { useSearchStore } from "@/stores/useSearchStore";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { View } from "../view";
import { useRouter } from "next/navigation";

export function BottomNav() {

    const router = useRouter()

    const offset = useSearchStore(s => s.offset)
    const setOffset = useSearchStore(s => s.setOffset)

    const items = [...Array(10).keys()]

    const prevPage = offset !== 0 ? () => setOffset(offset - 1, router) : () => { }
    const nextPage = offset !== 9 ? () => setOffset(offset + 1, router) : () => { }

    return (
        <View className="mt-8">
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
        </View >
    )
}