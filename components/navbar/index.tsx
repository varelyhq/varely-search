"use client"

import { View } from "../view"
import { Button } from "../ui/button"
import { SquareArrowUpRight } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { SettingsSheet } from "./settings-sheet"

export function Navbar() {



    return (
        <View className="flex-row p-2 gap-2">

            <Link href='https://github.com/varelyhq/varely-search/' target='_blank'>
                <Button variant='outline'>
                    Github
                    <SquareArrowUpRight />
                </Button>
            </Link>

            <View className="ml-auto flex-row gap-2">
                <LanguageSwitcher />
                <SettingsSheet />
            </View>

        </View>
    )
}
