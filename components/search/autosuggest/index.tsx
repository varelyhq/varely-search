import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AutosuggestSkeleton } from "./skeleton";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

export function AutosuggestWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Flex className="relative w-full">
            {children}
        </Flex>
    )
}

type AutosuggestProps = {
    query: string,
    visible?: boolean
    className?: string
    onSelect?: (value: string) => void
}

// metody wystawiane na zewnątrz przez ref, żeby SearchBar mógł sterować zaznaczeniem
export type AutosuggestHandle = {
    moveSelection: (direction: 1 | -1) => void
    confirmSelection: () => boolean // true = wybrano podpowiedź, false = nic nie było zaznaczone
    clearSelection: () => void
}

export const Autosuggest = forwardRef<AutosuggestHandle, AutosuggestProps>(function Autosuggest(
    { query, visible, className = '', onSelect = () => { } },
    ref
) {

    const [results, setResults] = useState<{ query: string }[]>([])
    const [loading, setLoading] = useState(false)
    // aktywna (podświetlona) podpowiedź, sterowana strzałkami; wartość = index jako string
    const [activeValue, setActiveValue] = useState<string>('')

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

    // za każdym razem, gdy zmienia się lista wyników, czyścimy podświetlenie
    useEffect(() => {
        setActiveValue('')
    }, [results]);

    useImperativeHandle(ref, () => ({
        moveSelection(direction) {
            if (!results.length) return
            const currentIndex = activeValue === '' ? -1 : Number(activeValue)
            let nextIndex = currentIndex + direction
            if (nextIndex < 0) nextIndex = results.length - 1
            if (nextIndex >= results.length) nextIndex = 0
            setActiveValue(String(nextIndex))
        },
        confirmSelection() {
            if (activeValue === '') return false
            const idx = Number(activeValue)
            const suggestion = results[idx]
            if (!suggestion) return false
            onSelect(suggestion.query)
            return true
        },
        clearSelection() {
            setActiveValue('')
        }
    }), [results, activeValue, onSelect])

    const hidden = !visible || (!query && (!results.length || !visible))

    return (
        <Command
            value={activeValue}
            onValueChange={setActiveValue}
            className={cn('absolute top-full left-0 right-0 max-h-[min(16rem,calc(100vh-6rem))] overflow-hidden',
                `mt-3 border size-auto ${hidden && 'hidden'} ${className}`)}
        >
            <CommandList className="scrollbar-thin!">
                <CommandEmpty>Brak wyników wyszukiwania.</CommandEmpty>
                <CommandGroup>
                    {loading
                        ? [...Array(10).keys()].map(item => <AutosuggestSkeleton key={item} />)
                        : results.map((suggestion, index) => (
                            <CommandItem
                                key={index}
                                value={String(index)}
                                onSelect={!loading ? () => onSelect(suggestion.query) : undefined}
                                onMouseDown={e => e.preventDefault()}
                            >
                                <Search />
                                <span>{suggestion.query}</span>
                            </CommandItem>
                        ))}
                </CommandGroup>
            </CommandList>
            <BorderBeam duration={8} size={100} />
        </Command>
    )
})