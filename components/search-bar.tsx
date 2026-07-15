'use client'

import { Search } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { View } from "./view";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get("q") ?? "")

    function handleSearch() {
        const params = new URLSearchParams(searchParams.toString())
        if (query) {
            params.set("q", query)
        } else {
            params.delete("q")
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <View className="flex-row justify-start items-center gap-4">
            <Logo size='sm' />
            <View>
                <Input 
                className='min-w-70'
                value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch()
                    }}
                />
            </View>
            <Button onClick={handleSearch}>
                Szukaj
                <Search />
            </Button>
        </View>
    )
}