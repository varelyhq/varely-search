// app/search/error.tsx
'use client' // error.tsx MUSI być client component

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { Flex } from "@/components/ui/flex";

export default function SearchError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // wyślij do Sentry / loggera
        console.error(error)
    }, [error])

    return (
        <Flex className="flex-1 justify-center items-center gap-4 p-8">
            <h2>Ups, coś poszło nie tak 😕</h2>
            <p className="text-muted-foreground">Nie udało się pobrać wyników wyszukiwania.</p>
            <Button onClick={() => reset()}>Spróbuj ponownie</Button>
        </Flex>
    )
}