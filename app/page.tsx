'use client'

import { Logo } from "@/components/logo"
import { Autosuggest } from "@/components/search/autosuggest"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { View } from "@/components/view"
import { useSearchStore } from "@/stores/useSearchStore"
import { SearchIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useState } from "react"

function SearchBar() {

    const router = useRouter()

    const query = useSearchStore(s => s.query)
    const setQuery = useSearchStore(s => s.setQuery)
    const getSearchResults = useSearchStore(s => s.getSearchResults)

    const [isFocused, setIsFocused] = useState(false)

    const onSubmit = () => {
        if (!query.trim()) return
        getSearchResults(router)
    }

    return (
        <>
            <View className="gap-4">
                <InputGroup>
                    <InputGroupInput
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onSubmit()
                        }}
                        onSubmit={onSubmit}
                        autoComplete='off'
                        placeholder="Wyszukaj coś w Varely Search..."
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
                <Autosuggest query={query} onSelect={onSubmit} visible={isFocused} />
            </View>

            <View className="flex-row justify-center gap-4">
                <Button size='lg' onClick={onSubmit}>Szukaj</Button>
                <Button size='lg' variant='outline'>Szczęśliwy traf</Button>
            </View>
        </>
    )
}

export default function Page() {

    return (
        <View className="flex-1 h-full items-center">
            <View className="flex-1 h-full max-w-md min-w-0 gap-8">

                <View className="min-h-23 max-h-88 h-80 justify-end">
                    <Logo />
                </View>

                <SearchBar />

            </View>
        </View>
    )
}
