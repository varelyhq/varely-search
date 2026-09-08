'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Field, FieldLabel } from "../ui/field";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { safe_search, safe_search_translations } from "@/constants/search-settings";
import { Flex } from "../ui/flex";
import { buildParams } from "@/lib/utils";

export function SafeSearchSelect({ minW }: { minW?: boolean }) {

    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const safeSearch = usePreferencesStore(store => store.safeSearch)
    const setSafeSearch = usePreferencesStore(store => store.setSafeSearch)

    const onValueChange = (value: 'strict' | 'moderate' | 'off' | null) => {
        if (!value) return
        setSafeSearch(value)
        const readyParams = buildParams(params, { safe_search: value })
        router.push(pathname + '?' + readyParams)
    }

    return (
        <Field>
            <FieldLabel>Bezpieczne wyszukiwanie</FieldLabel>
            <Flex className="flex-row">
                <Select value={safeSearch} onValueChange={onValueChange}>
                    <SelectTrigger className={minW ? 'min-w-48' : ''}>
                        <SelectValue placeholder="Wybierz filtr wyszukiwania">
                            {safe_search_translations[safeSearch]}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                            {safe_search.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Flex>
        </Field>
    )
}