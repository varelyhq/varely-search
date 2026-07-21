'use client'

import { Search } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { View } from "./view";
import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Autosuggest, AutosuggestWrapper } from "./search/autosuggest";

export function SearchBar() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get("q") ?? "")
    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<any>(undefined);

    const push = (final_query: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("q", final_query)
        router.push(`${pathname}?${params.toString()}`)
        inputRef.current?.blur();
    }

    const handleSearch = () => {
        if (query) push(query)
    }

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
                        onSelect={v => { push(v); setQuery(v); }}
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