'use client';

import { ThumbnailType } from "@/types/SearchType";
import Image from "next/image";
import { useState } from "react";

export function Thumbnail({ thumbnail }: { thumbnail: ThumbnailType }) {

    const [error, setError] = useState<any>(undefined);

    if (!thumbnail || error) return null;

    return (
        <Image
            unoptimized
            width={96}
            height={96}
            src={thumbnail.src}
            alt={thumbnail.alt || ''}
            className="rounded-lg object-cover w-24 h-24"
            onError={e => setError(e)}
        />
    )
}