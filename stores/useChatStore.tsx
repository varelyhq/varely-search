import { apiClient } from "@/lib/api-client";
import { create } from "zustand";

export type MessageType = {
    id: string
    role: string
    content: string
    metadata?: any
}

export type UsageType = {
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
    completion_tokens_details: {
        reasoning_tokens: number
    }
}

export type AIResponseType = {
    message: MessageType
    usage: UsageType
    created: number
}

export type ChatState = {
    id: string | undefined
    isWaiting: boolean
    messages: MessageType[]
    sendMessage: (content: string) => Promise<void>
}

const defaults = {
    id: undefined,
    isWaiting: false,
    messages: []
}

export const useChatStore = create<ChatState>()((set, get) => ({
    ...defaults,

    sendMessage: async content => {
        const message = {
            id: crypto.randomUUID(),
            role: 'user',
            content
        }

        set({ messages: [...get().messages, message], isWaiting: true })

        const body = {
            conversation_id: get().id,
            content,
        }

        const { data, error } = await apiClient<AIResponseType>({ endpoint: 'search/ask-ai', method: 'POST', body })

        if (error || !data) {
            console.warn(error)
            return
        }

        const res_message = {
            ...data.message,
            id: crypto.randomUUID(),
            metadata: data.usage
        }

        set({ messages: [...get().messages, res_message], isWaiting: false })
    }
}))