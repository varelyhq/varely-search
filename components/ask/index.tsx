import { Messages } from "./messages";
import { Flex } from "@/components/ui/flex";
import { SendMessageBar } from "./send-message-bar";
import { Suspense } from "react";

export function AskAI() {
    return (
        <Flex className="flex-1 h-full justify-between gap-4 min-h-0">
            <Flex className="h-[calc(100vh-420px)] min-h-0">
                <Messages />
            </Flex>
            <Suspense fallback={null}>
                <SendMessageBar />
            </Suspense>
        </Flex>
    )
}