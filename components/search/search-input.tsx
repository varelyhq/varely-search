'use client'

import { Search, X } from "lucide-react";
import { Flex } from "../ui/flex";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Button } from "../ui/button";
import { Autosuggest } from "./autosuggest";
import { KeyboardEvent, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buildParams } from "@/lib/utils";
import { Separator } from "../ui/separator";

export function SearchInput() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)

    const clearQuery = () => {
        setQuery('')
        inputRef.current?.focus()
    }

    const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            inputRef.current?.blur()
            await onSubmit()
        }
    }

    const onSubmit = async () => {
        const params = buildParams(query, '0')
        router.push('/search?' + params)
    }

    const onSuggestionSelect = (suggestion: string) => {
        setQuery(suggestion)
        inputRef.current?.blur()
        const params = buildParams(suggestion, '0')
        router.push('/search?' + params)
    }

    return (
        <Flex className="relative gap-4 w-full">
            <InputGroup className="max-h-12 h-12">
                <InputGroupInput
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSubmit={onSubmit}
                    autoComplete='off'
                    placeholder="Wyszukaj coś..."
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    {query &&
                        <Button onClick={clearQuery} size='icon' variant='ghost'>
                            <X />
                        </Button>
                    }
                    <Separator orientation='vertical' className='h-6 my-auto' />
                    <Button size='sm' variant='ghost' onClick={onSubmit}>Szukaj</Button>
                </InputGroupAddon>
            </InputGroup>

            <Autosuggest
                // ref={autosuggestRef}
                visible={isFocused}
                query={query}
                onSelect={onSuggestionSelect}
            />
        </Flex>
    )
}