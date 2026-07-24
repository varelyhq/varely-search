import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Spinner } from "@/components/ui/spinner";
import { View } from "@/components/view";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AutosuggestWrapper({ children }: { children: React.ReactNode }) {
    return (
        <View className="relative w-full">
            {children}
        </View>
    )
}

type AutosuggestProps = {
    query: string,
    visible?: boolean
    className?: string
    onSelect?: (value: string) => void
}

export function Autosuggest({ query, visible, className = '', onSelect = () => { } }: AutosuggestProps) {

    const [results, setResults] = useState<{ query: string }[]>([])
    const [loading, setLoading] = useState(false)

    const timeoutRef = useRef<any>(0)

    const fetchNewSuggestions = async (params: { [key: string]: string }) => {
        const autosuggest_api_url = 'https://n8n.varely.co/webhook/autosuggest';
        const autosuggestParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) autosuggestParams.set(key, value)
        })

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)

        const url = `${autosuggest_api_url}?${autosuggestParams.toString()}`

        try {
            const res = await fetch(url, { signal: controller.signal })

            if (!res.ok) {
                throw new Error(`Autosuggest API returned ${res.status}`)
            }

            const results = await res.json()
            setResults(results.results)

        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                throw new Error('Autosuggest request timed out')
            }
            throw err
        } finally {
            clearTimeout(timeout)
            setLoading(false)
        }
    }

    useEffect(() => {

        setLoading(true);

        if (query) {
            timeoutRef.current = setTimeout(() => {
                fetchNewSuggestions({ q: query })
            }, 250);
        }
        else {
            setResults([]);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        }

    }, [query]);

    const hidden = !visible || (!query && (!results.length || !visible))

    return (
        <View className={`w-full ${hidden && 'hidden'} ${className}`}>
            <Command className="rounded-lg border relative">
                <CommandList className="max-h-96">
                    <CommandEmpty>Loading...</CommandEmpty>
                    <CommandGroup>
                        {results.map((suggestion, index) => (
                            <CommandItem
                                onSelect={onSelect}
                                onMouseDown={e => e.preventDefault()}
                                key={index}
                            >
                                <Search />
                                <span>{suggestion.query}</span>
                            </CommandItem>
                        ))}
                        {loading && <Spinner className="absolute top-3 right-3" />}
                    </CommandGroup>
                    {/* <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                    </CommandGroup> */}
                </CommandList>
            </Command>
        </View>
    )
}
