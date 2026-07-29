'use client'

import { Button } from "@/components/ui/button"
import { useSearchQueryStore } from "@/stores/useSearchQueryStore"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function SeeMoreVideosButton() {

    const buildParams = useSearchQueryStore(s => s.buildParams)

    return (
        <Link href={`/videos?${buildParams()}`} className='ml-auto'>
            <Button variant='secondary' size='sm'>
                Zobacz wszystkie
                <ArrowRight />
            </Button>
        </Link>
    )
}