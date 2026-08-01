'use client'

import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import { View } from "../view";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const freshness_options = [
    '', // all time
    'pd', // past 24h
    'pw', // past week
    'pm', // past month
    'py' // past year
]

export function NewsFilters() {

    const router = useRouter()
    const pathname = usePathname()

    const freshness = useSearchStore(s => s.freshness)
    const setFreshness = useSearchStore(s => s.setFreshness)

    const translations: any = {
        '': 'Wszystko',
        'pd': 'Wczoraj',
        'pw': 'Poprzedni tydzień',
        'pm': 'Poprzedni miesiąc',
        'py': 'Poprzedni rok'
    }

    return (
        <View className="gap-2">
            <View className="flex-row items-center gap-2">
                <ListFilter size={12} />
                <span className="text-xs text-muted-foreground">Filtruj</span>
            </View>
            <View className="flex-row gap-2">
                {freshness_options.map(option => (
                    <Button
                        key={option}
                        size='xs'
                        variant={option === freshness ? 'default' : 'outline'}
                        onClick={() => setFreshness(option, router, pathname)}
                    >
                        {translations[option]}
                    </Button>
                ))}
            </View>
        </View>
    )
}