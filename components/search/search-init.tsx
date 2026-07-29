'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearchQueryStore } from '@/stores/useSearchQueryStore'

export function SearchInitializer() {

    const searchParams = useSearchParams()
    const setQuery = useSearchQueryStore(s => s.setQuery)

    useEffect(() => {
        const q = searchParams.get('q')
        if (q) setQuery(q)
    }, [searchParams, setQuery])

    return null
}