'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearchStore } from '@/stores/useSearchStore'

export function SearchInitializer() {

    const searchParams = useSearchParams()
    const setQuery = useSearchStore(s => s.setQuery)

    useEffect(() => {
        const q = searchParams.get('q')
        if (q) setQuery(q)
    }, [searchParams, setQuery])

    return null
}