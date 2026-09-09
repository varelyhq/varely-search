'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildParams, cn } from "@/lib/utils";

export function BottomNav() {

    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const items = [...Array(10).keys()]

    const offset = params.get('offset') ? parseInt(params.get('offset') || '0') : 0

    const changePageOffset = (newOffset: number) => {
        const readyParams = buildParams(params, { offset: newOffset.toString() })
        router.push(pathname + '?' + readyParams)
    }

    const prevPage = offset > 0 ? () => changePageOffset(offset - 1) : undefined
    const nextPage = offset < 9 ? () => changePageOffset(offset + 1) : undefined

    return (
        <Pagination className="justify-start mt-8 max-w-full">
            <PaginationContent className="flex flex-wrap">
                <PaginationItem>
                    <PaginationPrevious text="Poprzedni" onClick={prevPage} className="cursor-pointer" />
                </PaginationItem>

                {items.map(item => (
                    <PaginationItem key={item}>
                        <PaginationLink
                            isActive={item === offset}
                            onClick={item === offset ? undefined : () => changePageOffset(item)}
                            className={cn(item === offset ? '' : 'cursor-pointer')}
                        >
                            {item + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext text="Następny" onClick={nextPage} className="cursor-pointer" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}