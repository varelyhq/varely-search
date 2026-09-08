'use client';

import { useState } from "react";
import { ResultThumbnail } from "@/components/ui/result";
import { Thumbnail } from "@/types/search-type";

export function SafeThumbnail({ thumbnail }: { thumbnail: Thumbnail }) {

    const [error, setError] = useState<boolean>(false)

    if (!thumbnail || !thumbnail.src || error) return null

    return (
        <ResultThumbnail src={thumbnail.src} alt={thumbnail.alt} onError={() => setError(true)} />
    )
}