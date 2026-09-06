'use client'

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { MessageType } from "@/stores/useChatStore";
import { Flex } from "../ui/flex";

function CopyMessageButton({ content }: { content: string }) {

    const [isCopied, setIsCopied] = useState(false)

    const timeoutRef = useRef<any>(0)

    const copy = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        navigator.clipboard.writeText(content)
        setIsCopied(true)
        timeoutRef.current = setTimeout(() => setIsCopied(false), 1000)
    }

    return (
        <Button size='icon-xs' variant='ghost' onClick={copy} className='ml-auto'>
            {isCopied ? <Check /> : <Copy />}
        </Button>
    )
}

export function UnderMessageContent({ message }: { message: MessageType }) {
    return (
        <Flex className="group-hover:opacity-100 opacity-0 flex-row items-center">
            {message?.metadata?.total_tokens &&
                <span className="text-xs text-muted-foreground">
                    Zużyto tokenów: {message?.metadata?.total_tokens}
                </span>
            }
            <CopyMessageButton content={message.content} />
        </Flex>
    )
}