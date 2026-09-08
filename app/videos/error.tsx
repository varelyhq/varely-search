'use client'

import { SearchError } from '@/components/search/search-error';

export default function ErrorLayout({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    return <SearchError error={error} reset={reset} />
}