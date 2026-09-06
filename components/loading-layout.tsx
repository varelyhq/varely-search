'use client'

import { useSearchStore } from "@/stores/useSearchStore"
import { useEffect } from "react"
import { Flex } from "@/components/ui/flex";
import { Spinner } from "./ui/spinner"

function LoadingMessage() {

    const loading = useSearchStore(s => s.loading)

    if (!loading) return null

    return (
        <Flex className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Spinner className="size-6" />
        </Flex>
    )
}

export function LoadingLayout() {

    const setLoading = useSearchStore(s => s.setLoading)

    console.log('LoadingLayout: working...')

    useEffect(() => {
        setLoading(false)
    })

    return <LoadingMessage />
}