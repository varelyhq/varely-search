'use client'

import { useState } from "react"
import { Flex } from "./ui/flex"
import Link from "next/link"
import Image from "next/image"
import { ImageSearchResponseType } from "@/types/images-type"
import { ImageIcon } from "lucide-react"

export function GalleryItem({ image }: { image: ImageSearchResponseType['results'][0] }) {

    const [error, setError] = useState(false)

    return (
        <Flex className="block group min-w-0">
            <Link href={image.url}>
                {error ?
                    <Flex className="items-center justify-center h-24">
                        <ImageIcon className="size-12 text-muted-foreground" />
                    </Flex>
                    :
                    <Image
                        src={image.thumbnail.src}
                        height={image.thumbnail.height || 100}
                        width={image.thumbnail.width || 100}
                        alt=''
                        onError={e => setError(true)}
                        className="w-full h-auto max-w-full rounded-lg overflow-hidden"
                    />
                }
                <Flex className="flex-row gap-1 mt-2 mb-1">
                    <img src={image.meta_url.favicon} alt='' className="size-4" />
                    <span className="text-xs text-muted-foreground line-clamp-1 group-hover:underline">{image.source}</span>
                </Flex>
                <span className="text-xs line-clamp-1 group-hover:underline">{image.title}</span>
            </Link>
        </Flex>
    )
}