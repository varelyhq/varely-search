import { AskAI } from "@/components/ask"
import { Flex } from "@/components/ui/flex";

export default function Page() {

    return (
        <Flex className="flex-1 max-w-2xl mx-auto h-full min-h-0">
            <AskAI />
        </Flex>
    )
}
