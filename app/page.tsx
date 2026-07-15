'use client'
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { View } from "@/components/view"
import { SearchIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function Page() {

    const router = useRouter()
    const [query, setQuery] = useState('')

    const onSubmit = () => {
        if (!query.trim()) return
        const params = new URLSearchParams({ q: query }) // , sort: 'relevance' // router.push(`/search?q=${encodeURIComponent(query)}`)
        router.push(`/search?${params.toString()}`)
    }

    return (
        <View className="flex-1 items-center justify-center">
            <View className="max-w-md min-w-0 gap-8">

                <Logo />

                <View className="gap-4 items-center">
                    <InputGroup>
                        <InputGroupInput
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") onSubmit()
                            }}
                            onSubmit={onSubmit}
                            placeholder="Wyszukaj coś w Varely Search..."
                        />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    <View className="flex-row gap-4">
                        <Button size='lg' onClick={onSubmit}>Szukaj</Button>
                        <Button size='lg' variant='outline'>Szczęśliwy traf</Button>
                    </View>
                </View>

            </View>
        </View>
    )
}
