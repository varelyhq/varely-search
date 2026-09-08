import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { AutosuggestSkeleton } from "./skeleton";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

export type AutosuggestHandle = {
    isSelecting: boolean
}

type AutosuggestProps = {
    ref?: React.Ref<AutosuggestHandle>
    query: string,
    visible?: boolean
    className?: string
    onSelect?: (value: string) => void
}

export function Autosuggest({ ref, query, visible, className = '', onSelect = () => { } }: AutosuggestProps) {

    const [results, setResults] = useState<{ query: string }[]>([])
    const [loading, setLoading] = useState(false)

    const [index, setIndex] = useState(-1)

    const timeoutRef = useRef<any>(0)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    const fetchNewSuggestions = async (query: string) => {
        const url = `https://n8n.varely.co/webhook/autosuggest?q=${query}`

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)

        try {
            const res = await fetch(url, { signal: controller.signal })

            if (!res.ok) throw new Error(`Autosuggest API returned ${res.status}`)

            const results = await res.json()
            setResults(results.results)
            setIndex(-1)
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
        setLoading(true)
        if (query) timeoutRef.current = setTimeout(() => fetchNewSuggestions(query), 250)
        else setResults([])
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [query])

    useEffect(() => {
        if (!visible || !results.length) return

        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key

            if (key === 'Enter') {
                if (index === -1) return false
                const suggestion = results[index]
                if (!suggestion) return false
                onSelect(suggestion.query)
                return
            }

            if (!['ArrowDown', 'ArrowUp'].includes(key)) return

            const values = { 'ArrowDown': 1, 'ArrowUp': -1 }

            setIndex(prev => { // @ts-ignore
                let newIndex = prev + values[key]
                if (newIndex < 0) newIndex = results.length - 1
                if (newIndex >= results.length) newIndex = 0
                return newIndex
            })
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [visible, results, index])

    useEffect(() => {
        itemRefs.current[index]?.scrollIntoView({ block: 'nearest' })
    }, [index])

    useImperativeHandle(ref, () => ({
        isSelecting: index !== -1
    }), [index])

    const hidden = !visible || (!query && (!results.length || !visible))

    return (
        <Command
            value={String(index)}
            onValueChange={v => setIndex(Number(v))}
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
                                ref={el => { itemRefs.current[index] = el }}
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
}