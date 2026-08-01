'use client'

import { useEffect, useRef, useState } from "react";
import { View } from "../view";
import { AnimatedText } from "./animated-text";
import { apiClient } from "@/lib/api-client";
import { AIResponseType, UsageType } from "@/stores/useChatStore";
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker";
import { Spinner } from "../ui/spinner";
import { Bot, Check, Copy } from "lucide-react";
import { Button } from "../ui/button";

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
        <View className="flex-row gap-3 justify-between">
            <Marker role='status'>
                <MarkerIcon>
                    <Spinner />
                </MarkerIcon>
                <MarkerContent className="shimmer">
                    <span className="font-medium">Pomocny AI</span> generuje podsumowanie...
                </MarkerContent>
            </Marker>
        </View>
    )
}

export function AISearchSummary({ query }: { query: string }) {

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

        setResponse(null)
        getAISummary()

    }, [query])

    return (
        <View className="max-w-156">
            {response ? (
                <View className="text-sm gap-1">
                    <View className="flex-1 flex-row gap-2 items-center">
                        <Bot size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            Zużycie tokenów: <strong>{response.usage.total_tokens}</strong>
                        </span>
                        <View className="ml-auto">
                            <CopyMessageButton content={response.message.content} />
                        </View>
                    </View>
                    <AnimatedText content={response.message.content} shouldAnimate />
                </View>
            ) : <LoadingSummary />
            }
        </View>
    )
}