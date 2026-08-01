'use client'

import { useChatStore } from "@/stores/useChatStore"
import { Marker, MarkerContent } from "../ui/marker"

export function TypingMessageMarker() {

    const isWaiting = useChatStore(s => s.isWaiting)

    if (!isWaiting) return null

    return (
        <Marker role="status">
            <MarkerContent className="shimmer">
                <span className="font-medium">Pomocny AI</span> pisze wiadomość...
            </MarkerContent>
        </Marker>
    )
}