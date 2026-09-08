import { Flex } from "@/components/ui/flex"
import Link from "next/link"
import { ReviewStars } from "./review-stars"
import { Movie as MovieType } from "@/types/search-type"

export function Movie({ movie }: { movie: MovieType }) {

    if (!movie) return null

    return (
        <Flex className="max-w-96 gap-1 mt-1 overflow-hidden">
            <Flex className="flex-row gap-2">
                <span className="text-xs font-medium">Aktorzy</span>
                <span className="text-xs text-blue-600 whitespace-nowrap">
                    {movie.actors.slice(0, 3).map((actor, index) => (
                        <span key={index}>
                            <Link href={actor.url}>
                                {actor.name}
                            </Link>
                            {index < 2 ? ', ' : ''}
                        </span>
                    ))}
                </span>
            </Flex>
            <Flex className='flex-row items-center gap-1'>
                <ReviewStars value={movie.rating.ratingValue / 2} />
                <span className="text-xs text-muted-foreground">
                    {movie.rating.ratingValue} ({movie.rating.reviewCount} głosy)
                </span>
                {/* {movie?.offers?.length && <span className="text-xs text-muted-foreground"> · </span>}
                {movie.offers.map((offer, index) => (
                    <span key={index} className="text-xs text-muted-foreground">
                        <b>Cena</b> {offer.price} {offer.priceCurrency}
                    </span>
                ))} */}
            </Flex>
        </Flex>
    )
}