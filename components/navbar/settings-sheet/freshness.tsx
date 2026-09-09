'use client'

import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { freshness, freshness_translations } from "@/constants/search-settings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildParams } from "@/lib/utils";

export function Freshness() {

    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const [isOpen, setOpen] = useState(false)

    const onValueChange = (newFreshness: string | null) => {
        newFreshness = newFreshness !== null ? newFreshness : params.get('freshness') || ''
        const readyParams = buildParams(params, { freshness: newFreshness })
        router.push(pathname + '?' + readyParams)
    }

    return (
        <Field>
            <FieldLabel>Data publikacji</FieldLabel>
            <Select open={isOpen} onOpenChange={setOpen} onValueChange={onValueChange} defaultValue=''>
                <SelectTrigger className='md:min-w-48'>
                    <SelectValue placeholder="Wybierz okres czasu">
                        {freshness_translations[params.get('freshness') || '']}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                        {freshness.map(item => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
}