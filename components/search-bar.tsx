'use client'

import { Search, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { View } from "./view";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Autosuggest, AutosuggestWrapper } from "./search/autosuggest";
import { useSearchStore } from "@/stores/useSearchStore";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Separator } from "./ui/separator";

export function SearchBar() {

    const router = useRouter()
    const pathname = usePathname()

    const query = useSearchStore(s => s.query)
    const setQuery = useSearchStore(s => s.setQuery)
    const buildParams = useSearchStore(s => s.buildParams)

    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<any>(undefined);

    const handleSearch = () => {
        if (!query) return
        const params = buildParams()
        router.push(`/search?${params}`)
        inputRef.current?.blur();
    }

    const clearQuery = () => {
        setQuery('')
        inputRef.current?.focus();
    }

    if (pathname === '/') return null

    return (
        <View className="flex-row justify-start items-center gap-4">

            <View className="w-32">
                <Logo size='sm' />
            </View>

            <View className="w-xl">
                <AutosuggestWrapper>
                    <InputGroup className="max-w-xl w-xl h-12">
                        <InputGroupInput
                            placeholder="Wyszukaj coś..."
                            value={query}
                            ref={inputRef}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch()
                            }}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Button onClick={clearQuery} size='icon' variant='ghost'>
                                <X />
                            </Button>
                            <Separator orientation='vertical' className='h-6 my-auto' />
                            <Button onClick={handleSearch} variant='ghost'>
                                Szukaj
                                <Search />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {/* <Input
                        // className='min-w-70'
                        className='min-w-140 h-12'
                        value={query}
                        ref={inputRef}
                        onChange={e => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch()
                        }}
                    /> */}
                    <Autosuggest
                        className="absolute top-full mt-4"
                        query={query}
                        visible={isFocused}
                        onSelect={v => { setQuery(v); handleSearch(); }}
                    />
                </AutosuggestWrapper>
            </View>
            {/* <Button onClick={handleSearch}>
                Szukaj
                <Search />
            </Button> */}
        </View>
    )
}