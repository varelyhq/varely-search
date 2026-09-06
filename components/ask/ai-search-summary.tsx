'use client'

import { useEffect, useRef, useState } from "react";
import { Flex } from "@/components/ui/flex";
import { AnimatedText } from "./animated-text";
import { apiClient } from "@/lib/api-client";
import { AIResponseType, UsageType } from "@/stores/useChatStore";
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker";
import { Spinner } from "../ui/spinner";
import { Bot, Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

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

function LoadingSummary() {

    return (
        <Flex className="flex-row gap-3 justify-between">
            <Marker role='status'>
                <MarkerIcon>
                    <Spinner />
                </MarkerIcon>
                <MarkerContent className="shimmer">
                    <span className="font-medium">Pomocny AI</span> generuje podsumowanie...
                </MarkerContent>
            </Marker>
        </Flex>
    )
}

export function AISearchSummary({ query }: { query: string }) {

    const ai_summary = usePreferencesStore(s => s.ai_summary)

    const [response, setResponse] = useState<AIResponseType | null>(null)

    const getAISummary = async () => {

        const body = {
            content: query
        }

        const { data, error } = await apiClient<AIResponseType>({ endpoint: 'search/ask-ai', method: 'POST', body })

        if (error || !data) {
            console.warn(error)
            return
        }

        setResponse(data)

    }

    useEffect(() => {

        if (ai_summary) {
            setResponse(null)
            getAISummary()
        }

    }, [query, ai_summary])

    if (!ai_summary) return null

    return (
        <Flex className="max-w-156">
            {response ? (
                <Flex className="text-sm gap-1">
                    <Flex className="flex-1 flex-row gap-2 items-center">
                        <Bot size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            Zużycie tokenów: <strong>{response.usage.total_tokens}</strong>
                        </span>
                        <Flex className="ml-auto">
                            <CopyMessageButton content={response.message.content} />
                        </Flex>
                    </Flex>
                    <AnimatedText content={response.message.content} shouldAnimate />
                </Flex>
            ) : <LoadingSummary />
            }
        </Flex>
    )
}