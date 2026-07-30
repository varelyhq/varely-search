"use client"

import { View } from "../view"
import { Button } from "../ui/button"
import { SlidersHorizontal, SquareArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { SettingsSheet } from "./settings-sheet"
import { Suspense, useState } from "react"
import { SearchBar } from "../search-bar"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "./theme-switcher"
import { useSearchQueryStore } from "@/stores/useSearchQueryStore"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { usePreferencesStore } from "@/stores/usePreferencesStore"

export function Navbar() {

    const pathname = usePathname()

    return (
        <>
            <View className="flex-row p-3 gap-2 sticky top-0 z-40 bg-background">

                {pathname === '/' &&
                    <Link href='https://github.com/varelyhq/varely-search/' target='_blank'>
                        <Button variant='outline'>
                            Github
                            <SquareArrowUpRight />
                        </Button>
                    </Link>
                }

                <Suspense fallback={null}>
                    <SearchBar />
                </Suspense>

                <View className="ml-auto flex-row gap-2 items-center">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                    <SettingsSheet />
                </View>

            </View>

            {pathname !== '/' && <NavTabs />}

        </>
    )
}

function NavTabs() {

    const pathname = usePathname()
    const buildParams = useSearchQueryStore(s => s.buildParams)

    const [settingsVisible, setSettingsVisible] = useState(false)

    return (
        <View className="gap-3">
            <View className="flex-row gap-1 ml-44">
                <NavTab active={pathname === '/ask'} href={"/ask?" + buildParams()}>Zapytaj</NavTab>
                <NavTab active={pathname === '/search'} href={"/search?" + buildParams()}>Wszystko</NavTab>
                <NavTab active={pathname === '/images'} href={"/images?" + buildParams()}>Grafika</NavTab>
                <NavTab active={pathname === '/news'} href={"/news?" + buildParams()}>Wiadomości</NavTab>
                <NavTab active={pathname === '/videos'} href={"/videos?" + buildParams()}>Filmy</NavTab>
                <NavTab active={pathname === '/maps'} href={"/maps?" + buildParams()}>Mapy</NavTab>
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant='ghost' size='icon' onClick={() => setSettingsVisible(!settingsVisible)}>
                            <SlidersHorizontal />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                        <p>Filtry</p>
                    </TooltipContent>
                </Tooltip>
            </View>
            <Separator />
            {settingsVisible && <SearchSettings />}
        </View>
    )

}

function SearchSettings() {

    const [isOpen, setOpen] = useState(false)
    const [isOpen2, setOpen2] = useState(false)

    const safeSearch = usePreferencesStore(store => store.safeSearch);
    const setSafeSearch = usePreferencesStore(store => store.setSafeSearch);

    const onValueChange = (value: 'strict' | 'moderate' | 'off' | null) => {
        if (value) setSafeSearch(value)
    }

    const items = [
        { label: "Dowolny okres czasu", value: "default" },
        { label: "Wczoraj", value: "yesterday" },
        { label: "Poprzedni tydzień", value: "week" },
        { label: "Poprzedni miesiąc", value: "month" },
        { label: "Poprzedni rok", value: "year" },
    ]

    const items2 = [
        { label: "Ściśle", value: "strict" },
        { label: "Umiarkowanie", value: "moderate" },
        { label: "Wył.", value: "off" },
    ]

    const translations = {
        strict: 'Ściśle',
        moderate: 'Umiarkowanie',
        off: 'Wyłączony'
    }

    return (
        <View className="flex-row gap-3 ml-44">

            <Select items={items} open={isOpen} onOpenChange={setOpen} defaultValue='default'>
                <SelectTrigger className='min-w-48'>
                    <SelectValue placeholder="Wybierz okres czasu" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                items={items}
                value={safeSearch}
                onValueChange={onValueChange}
                open={isOpen2}
                onOpenChange={setOpen2}
            >
                <SelectTrigger className='min-w-48'>
                    <SelectValue placeholder="Wybierz filtr wyszukiwania">
                        Bezpieczne wyszukiwanie: {translations[safeSearch]}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                        {items2.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </View>
    )
}

function NavTab({ children, active, href }: { children: React.ReactNode, active: boolean, href: string }) {
    return (
        <Link href={href}>
            <Button variant={active ? 'secondary' : 'ghost'}>{children}</Button>
        </Link>
    )
}