'use client'

import { View } from "@/components/view"
import { Thumbnail } from "@/types/search-type"
import Image from "next/image"
import { useState } from "react"

function InfoboxGalleryImage({ image }: { image: Thumbnail }) {

    const [error, setError] = useState<any>(false)

    if (error) return null

    return (
        <View className="relative aspect-[3/3] rounded-lg overflow-hidden">

            <Image
                fill
                src={image.src} alt={image.alt || ''}
                className="object-cover hover:scale-110 duration-200"
                onError={setError}
            />
        </View>
    )
}

export function InfoboxGallery({ images }: { images: Thumbnail[] }) {

    if (!images.length) return null

    const firstImage = images[0]
    const rest = images.slice(1)

    return (
        <View className="gap-2 grid grid-cols-2">
            <InfoboxGalleryImage image={firstImage} />
            <View className="gap-2 grid grid-cols-2 grid-rows-2">
                {rest.map((image, index) => (
                    <InfoboxGalleryImage key={index} image={image} />
                ))}
            </View>
        </View>
    )
}