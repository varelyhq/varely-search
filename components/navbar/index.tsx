"use client"

import { Button } from "../ui/button"
import { SquareArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./settings-sheet/language-switcher"
import { SettingsSheet } from "./settings-sheet"
import { Suspense } from "react"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "./theme-switcher"
import { Flex } from "../ui/flex"
import { SearchInput } from "../search/search-input"
import { Logo } from "../logo"
import { NavTabs } from "./nav-tabs"

function Settings() {
    return (
        <Flex className="flex-row gap-2 items-center">
            <ThemeSwitcher />
            <Flex className="not-md:hidden">
                <LanguageSwitcher />
            </Flex>
            <SettingsSheet />
        </Flex>
    )
}

export function Navbar() {

    const pathname = usePathname()

    return (
        <>
            <Flex className="md:flex-row p-3 gap-2 sticky top-0 z-40 bg-background justify-between">

                {pathname === '/' &&
                    <Link href='https://github.com/varelyhq/varely-search/' target='_blank'>
                        <Button variant='outline'>
                            Github
                            <SquareArrowUpRight />
                        </Button>
                    </Link>
                }

                {pathname !== '/' ?
                    <Suspense fallback={null}>
                        <Flex className="md:flex-row md:justify-start md:items-center gap-4 flex-1">
                            <Flex className="md:w-36 flex-row justify-between md:justify-center shrink-0">
                                <Logo size='sm' />
                                <Flex className="md:hidden">
                                    <Settings />
                                </Flex>
                            </Flex>
                            <Flex className="md:max-w-xl md:flex-1">
                                <SearchInput />
                            </Flex>
                        </Flex>
                    </Suspense>
                    : null
                }

                <Flex className="hidden md:flex">
                    <Settings />
                </Flex>

            </Flex>

            {pathname !== '/' && <NavTabs />}
        </>
    )
}