'use client'

import { Flex } from "@/components/ui/flex"
import { cn } from "@/lib/utils"
import { Thumbnail } from "@/types/search-type"
import Image from "next/image"
import { useState } from "react"

function InfoboxGalleryImage({ image, onError, className }: { image: Thumbnail, onError?: () => void, className?: string }) {

    const [error, setError] = useState(false)

    const handleError = () => {
        setError(true)
        if (onError) onError()
    }

    if (error) return null

    return (
        <Flex className={cn("relative aspect-[3/3] rounded-lg overflow-hidden", className)}>
            <Image
                fill
                src={image.src} alt={image.alt || ''}
                className="object-cover hover:scale-110 duration-200"
                onError={handleError}
            />
        </Flex>
    )
}

export function InfoboxGallery({ images }: { images: Thumbnail[] }) {

    const [errors, setErrors] = useState(0)

    const increaseError = () => {
        setErrors(prev => prev + 1)
    }

    if (!images?.length) return null

    const firstImage = images[0]
    const rest = images.slice(1)

    const isSingle = errors === images.length - 1

    return (
        <Flex className={`gap-2 grid ${isSingle ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <InfoboxGalleryImage image={firstImage} className={isSingle ? 'aspect-video' : ''} />
            <Flex className="gap-2 grid grid-cols-2 grid-rows-2">
                {rest.map((image, index) => (
                    <InfoboxGalleryImage key={index} image={image} onError={increaseError} />
                ))}
            </Flex>
        </Flex>
    )
}