'use client'

import { Button } from "@/components/ui/button"
import { useSearchStore } from "@/stores/useSearchStore"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function SeeMoreVideosButton() {

    const buildParams = useSearchStore(s => s.buildParams)

    return (
        <Link href={`/videos?${buildParams()}`} className='ml-auto'>
            <Button variant='secondary' size='sm'>
                Zobacz wszystkie
                <ArrowRight />
            </Button>
        </Link>
    )
}