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

export function Navbar() {

    const pathname = usePathname()

    return (
        <>
            <Flex className="flex-row p-3 gap-2 sticky top-0 z-40 bg-background">

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
                        <Flex className="flex-row justify-start items-center gap-4">
                            <Flex className="w-36 items-center">
                                <Logo size='sm' />
                            </Flex>
                            <Flex className="w-xl">
                                <SearchInput />
                            </Flex>
                        </Flex>
                    </Suspense>
                    : null
                }

                <Flex className="ml-auto flex-row gap-2 items-center">
                    <Flex className="not-sm:hidden">
                        <ThemeSwitcher />
                    </Flex>
                    <LanguageSwitcher />
                    <SettingsSheet />
                </Flex>

            </Flex>

            {pathname !== '/' && <NavTabs />}

        </>
    )
}