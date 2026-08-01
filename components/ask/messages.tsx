'use client'

import { Message, MessageContent } from "@/components/ui/message"
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import React, { useState } from "react"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { useChatStore } from "@/stores/useChatStore"
import { UnderMessageContent } from "./under-message-content"
import { TypingMessageMarker } from "./typing-message-marker"
import { AnimatedText } from "./animated-text"

function MessageScrollerWrapper({ children }: { children: React.ReactNode }) {
    return (
        <MessageScrollerProvider>
            <MessageScroller className="flex-1 min-h-0">
                <MessageScrollerViewport>
                    <MessageScrollerContent className="px-2">
                        {children}
                    </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
            </MessageScroller>
        </MessageScrollerProvider>
    )
}

export function Messages() {

    const messages = useChatStore(s => s.messages)

    const [prevMessages, setPrevMessages] = useState(messages)
    const [animatingId, setAnimatingId] = useState<string | null>(null)

    if (messages !== prevMessages) {
        const prevLen = prevMessages.length
        setPrevMessages(messages)
        const last = messages[messages.length - 1]
        if (messages.length > prevLen && last?.role === "assistant") {
            setAnimatingId(last.id)
        }
    }

    return (
        <MessageScrollerWrapper>
            {messages.map(message => (
                <MessageScrollerItem key={message.id} messageId={message.id} scrollAnchor={message.role === "user"}>
                    <Message align={message.role === "user" ? 'end' : 'start'}>
                        <MessageContent>
                            <Bubble className="group" variant={message.role === "user" ? 'outline' : 'muted'}>
                                <BubbleContent>
                                    <AnimatedText content={message.content} shouldAnimate={message.id === animatingId} />
                                </BubbleContent>
                                <UnderMessageContent message={message} />
                            </Bubble>
                        </MessageContent>
                    </Message>
                </MessageScrollerItem>
            ))}
            <TypingMessageMarker />
        </MessageScrollerWrapper>
    )
}