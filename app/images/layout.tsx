import { Flex } from "@/components/ui/flex"

export default function ImagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <Flex className="flex-1 p-6">
            {children}
        </Flex>
    )
}