'use client'

import { Search } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { View } from "./view";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Autosuggest, AutosuggestWrapper } from "./search/autosuggest";
import { useSearchQueryStore } from "@/stores/useSearchQueryStore";

export function SearchBar() {

    const router = useRouter()
    const pathname = usePathname()

    const query = useSearchQueryStore(s => s.query)
    const setQuery = useSearchQueryStore(s => s.setQuery)
    const buildParams = useSearchQueryStore(s => s.buildParams)

    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<any>(undefined);

    const handleSearch = () => {
        if (!query) return
        const params = buildParams()
        router.push(`/search?${params}`)
        inputRef.current?.blur();
    }

    if (pathname !== '/search') return null

    return (
        <View className="flex-row justify-start items-center gap-4">
            <Logo size='sm' />
            <View>
                <AutosuggestWrapper>
                    <Input
                        className='min-w-70'
                        value={query}
                        ref={inputRef}
                        onChange={e => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch()
                        }}
                    />
                    <Autosuggest
                        className="absolute top-full mt-4"
                        query={query}
                        visible={isFocused}
                        onSelect={v => {  setQuery(v); handleSearch(); }}
                    />
                </AutosuggestWrapper>
            </View>
            <Button onClick={handleSearch}>
                Szukaj
                <Search />
            </Button>
        </View>
    )
}