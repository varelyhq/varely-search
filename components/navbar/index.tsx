"use client"

import { View } from "../view"
import { Button } from "../ui/button"
import { SquareArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { SettingsSheet } from "./settings-sheet"
import { Suspense } from "react"
import { SearchBar } from "../search-bar"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "./theme-switcher"

export function Navbar() {

    const pathname = usePathname()

    return (
        <View className="flex-row p-2 gap-2">

            {pathname !== '/search' &&
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

            <View className="ml-auto flex-row gap-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
                <SettingsSheet />
            </View>

        </View>
    )
}
