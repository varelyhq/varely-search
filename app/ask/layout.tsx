import { Flex } from "@/components/ui/flex"

export default function AskLayout({ children }: { children: React.ReactNode }) {
    return (
        <Flex className="flex-1 h-full p-6 min-h-0">
            {children}
        </Flex>
    )
}