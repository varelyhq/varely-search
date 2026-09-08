'use client'

import { Button } from "@/components/ui/button"
import { buildParams } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function SeeMoreVideosButton() {

    const params = useSearchParams()

    return (
        <Link href={`/videos?${buildParams(params, { offset: '0' })}`} className='ml-auto'>
            <Button variant='secondary' size='sm'>
                Zobacz wszystkie
                <ArrowRight />
            </Button>
        </Link>
    )
}