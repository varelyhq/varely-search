'use client'

import { Logo } from "@/components/logo"
import { SearchInput } from "@/components/search/search-input"
import { Container } from "@/components/ui/container"
import { Flex } from "@/components/ui/flex"
import { Particles } from "@/components/ui/particles"
import { useTheme } from "next-themes"

export default function Page() {

    const { theme } = useTheme()

    return (
        <Flex className="flex-1">
            <Particles className="absolute inset-0" color={theme === 'light' ? "#000" : '#fff'} />
            <Container className="relative flex-1 items-center my-0!">

                <Flex className="h-full w-full max-w-xl gap-10 justify-center items-center -translate-y-[5vh] md:-translate-y-[8vh]">
                    <Logo />
                    <SearchInput />
                </Flex>
            </Container>
        </Flex>
    )
}
