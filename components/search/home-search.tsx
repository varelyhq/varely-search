'use client'

import { Autosuggest, AutosuggestHandle } from "@/components/search/autosuggest"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useSearchStore } from "@/stores/useSearchStore"
import { SearchIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import { KeyboardEvent, useRef, useState } from "react"
import { Flex } from "../ui/flex"

export function HomeSearch() {

    const router = useRouter()

    const query = useSearchStore(s => s.query)
    const setQuery = useSearchStore(s => s.setQuery)
    const getSearchResults = useSearchStore(s => s.getSearchResults)

    const [isFocused, setIsFocused] = useState(false)
    const autosuggestRef = useRef<AutosuggestHandle>(null)

    const onSubmit = () => {
        if (!query.trim()) return
        getSearchResults(router)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            autosuggestRef.current?.moveSelection(1)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            autosuggestRef.current?.moveSelection(-1)
        } else if (e.key === "Enter") {
            const wasSuggestionSelected = autosuggestRef.current?.confirmSelection()
            if (!wasSuggestionSelected) onSubmit()
        } else if (e.key === "Escape") {
            autosuggestRef.current?.clearSelection()
        }
    }

    const handleSuggestionSelect = (value: string) => {
        setQuery(value)
        onSubmit()
    }

    return (
        <Flex className="relative gap-4">
            <InputGroup>
                <InputGroupInput
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={onKeyDown}
                    onSubmit={onSubmit}
                    autoComplete='off'
                    placeholder="Wyszukaj coś..."
                />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align='inline-end'>
                    <Button size='sm' variant='ghost' onClick={onSubmit}>Szukaj</Button>
                </InputGroupAddon>
            </InputGroup>

            {isFocused && (
                <Flex className="absolute top-full left-0 right-0 z-50 max-h-[min(16rem,calc(100vh-6rem))] overflow-y-auto pr-2 mt-4">
                    <Autosuggest
                        ref={autosuggestRef}
                        query={query}
                        onSelect={handleSuggestionSelect}
                        visible={isFocused}
                    />
                </Flex>
            )}
        </Flex>
    )
}