import { Flex } from "@/components/ui/flex"
import { Star } from "lucide-react"

export function ReviewStars({ value, maxValue = 5 }: { value: number, maxValue?: number }) {

    const stars = [...Array(maxValue).keys()]

    return (
        <Flex className="flex-row gap-1">
            {stars.map(star => (
                <Star key={star} size={14} className={`text-amber-500 ${star < value ? 'fill-amber-500' : ''}`} />
            ))}
        </Flex>
    )
}