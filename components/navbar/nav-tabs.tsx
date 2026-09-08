'use client'

import { buildParams } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Flex } from "../ui/flex"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { SlidersHorizontal } from "lucide-react"
import { Separator } from "../ui/separator"
import { SearchSettings } from "./search-settings"
import Link from "next/link"

function NavTab({ children, active, href }: { children: React.ReactNode, active: boolean, href: string }) {
    return (
        <Link href={href}>
            <Button variant={active ? 'secondary' : 'ghost'}>{children}</Button>
        </Link>
    )
}

export function NavTabs() {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [settingsVisible, setSettingsVisible] = useState(false)

    const ask_params = buildParams(searchParams, { freshness: undefined, offset: undefined, safe_search: undefined })
    const search_params = buildParams(searchParams, { freshness: undefined, offset: '0' })
    const images_params = buildParams(searchParams, { freshness: undefined, offset: undefined })
    const videos_params = search_params // buildParams(searchParams, { freshness: undefined, offset: '0' })
    const news_params = search_params // buildParams(searchParams, { freshness: undefined, offset: '0' })
    const maps_params = search_params // buildParams(searchParams, { freshness: undefined, offset: '0' })

    return (
        <Flex className="gap-3">
            <Flex className="flex-row gap-1 ml-48">
                <NavTab active={pathname === '/ask'} href={"/ask?" + ask_params}>Zapytaj AI</NavTab>
                <NavTab active={pathname === '/search'} href={"/search?" + search_params}>Wszystko</NavTab>
                <NavTab active={pathname === '/images'} href={"/images?" + images_params}>Grafika</NavTab>
                <NavTab active={pathname === '/videos'} href={"/videos?" + videos_params}>Filmy</NavTab>
                <NavTab active={pathname === '/news'} href={"/news?" + news_params}>Wiadomości</NavTab>
                {/* <NavTab active={pathname === '/maps'} href={"/maps?" + maps_params}>Mapy</NavTab> */}
                <Tooltip>
                    <TooltipTrigger render={
                        <Button variant='ghost' size='icon' onClick={() => setSettingsVisible(!settingsVisible)}>
                            <SlidersHorizontal />
                        </Button>
                    }>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                        Filtry
                    </TooltipContent>
                </Tooltip>
            </Flex>
            <Separator />
            {settingsVisible && <SearchSettings />}
        </Flex>
    )
}