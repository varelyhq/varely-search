import { Logo } from "@/components/logo"
import { Particles } from "@/components/particles"
import { SearchInput } from "@/components/search/search-input"
import { Container } from "@/components/ui/container"
import { Flex } from "@/components/ui/flex"
import { Suspense } from "react"

export default function Page() {

    return (
        <Flex className="flex-1">
            <Particles />
            <Container className="relative flex-1 items-center my-0!">
                <Flex className="h-full w-full max-w-xl gap-10 justify-center items-center -translate-y-[5vh] md:-translate-y-[8vh]">
                    <Logo />
                    <Suspense fallback={null}>
                        <SearchInput />
                    </Suspense>
                </Flex>
            </Container>
        </Flex>
    )
}