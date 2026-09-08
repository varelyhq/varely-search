'use client'

import { Button } from '@/components/ui/button'
import { Flex } from "@/components/ui/flex";

export function SearchError({ error, reset }: { error?: Error & { digest?: string }, reset?: () => void }) {

    const isDev = process.env.NODE_ENV === 'development'

    return (
        <Flex className="flex-1 justify-center items-center gap-4 p-8 text-center">
            <h2>Ups, coś poszło nie tak 😕</h2>
            <p className="text-muted-foreground">Nie udało się pobrać wyników wyszukiwania.</p>

            {error && <>
                {isDev ? (
                    <>
                        <pre className="max-w-full overflow-auto text-left text-xs bg-muted p-4 rounded-md text-destructive">
                            {error.name}: {error.message}
                            {'\n\n'}
                            {error.stack}
                        </pre>
                        {error.digest && (
                            <p className="text-xs text-muted-foreground">
                                Kod błędu: {error.digest}
                            </p>
                        )}
                    </>
                ) : (
                    error.digest && (
                        <p className="text-xs text-muted-foreground">
                            Kod błędu: {error.digest}
                        </p>
                    )
                )}
            </>
            }

            {reset && <Button onClick={() => reset()}>Spróbuj ponownie</Button>}
        </Flex>
    )
}