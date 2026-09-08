'use client'

import { useState } from "react"
import { Clapperboard } from "lucide-react"
import { Flex } from "@/components/ui/flex"
import { VideoThumbnail } from "@/components/ui/video"
import { VideoThumbnailSimple } from "@/types/search-type"

export function SafeThumbnail({ thumbnail }: { thumbnail: VideoThumbnailSimple }) {

    const [error, setError] = useState(false)

    if (!thumbnail || error) return (
        <Flex className="h-full items-center justify-center">
            <Clapperboard className="size-8 text-muted-foreground" />
        </Flex>
    )

    return (
        <VideoThumbnail src={thumbnail.src} alt='' onError={() => setError(true)} />
    )
}