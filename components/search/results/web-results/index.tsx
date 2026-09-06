import Link from "next/link";
import { Thumbnail } from "./thumbnail";
import { Movie as MovieType, Product as ProductType, SearchResult, WebType } from "@/types/search-type";
import { DeepResults } from "./deep-results";
import { CirclePlay, Star } from "lucide-react";
import { Video } from "../videos";
import Image from "next/image";
import { Flex } from "@/components/ui/flex";
import { Skeleton } from "@/components/ui/skeleton";

function ReviewStars({ value, maxValue = 5 }: { value: number, maxValue?: number }) {

    const stars = [...Array(maxValue).keys()]

    return (
        <Flex className="flex-row gap-1">
            {stars.map(star => (
                <Star key={star} size={14} className={`text-amber-500 ${star < value ? 'fill-amber-500' : ''}`} />
            ))}
        </Flex>
    )
}

function Product({ product }: { product: ProductType }) {

    if (!product) return null

    return (
        <Flex className="gap-1 mt-1">
            <span className="text-sm font-medium">{product.name}</span>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description }} />
            <Flex className='flex-row items-center gap-1'>
                {product?.rating?.ratingValue &&
                    <>
                        <ReviewStars value={product.rating.ratingValue} />
                        <span className="text-xs text-muted-foreground">
                            {product.rating.ratingValue} ({product.rating.reviewCount} opinii)
                        </span>
                    </>
                }
                {product?.offers?.length && <span className="text-xs text-muted-foreground"> · </span>}
                {product.offers.map((offer, index) => (
                    <span key={index} className="text-xs text-muted-foreground">
                        <b>Cena</b> {offer.price} {offer.priceCurrency}
                    </span>
                ))}
            </Flex>
        </Flex>
    )
}

function Movie({ movie }: { movie: MovieType }) {

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

export function WebResultVideo({ data }: { data: SearchResult }) {
    return (
        <Flex className="flex-row gap-2 justify-between">
            <Flex className="gap-2 w-full">

                <Link href={data.url}>
                    <Flex className="gap-2">
                        <Flex className="flex-row gap-2 items-center">
                            <img src={data.meta_url.favicon} className="w-5 h-5 rounded" />
                            <Flex className="">
                                <span className="text-sm">
                                    {data?.profile?.name || data?.video?.publisher || data?.meta_url?.netloc}
                                </span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                    {data.meta_url.netloc}{' '}
                                    {data.meta_url.path}
                                </span>
                            </Flex>
                        </Flex>
                        <Flex className="flex-row gap-2">
                            <h2 className="text-blue-600 visited:text-purple-500 hover:underline">{data.title}</h2>
                        </Flex>
                    </Flex>
                </Link>

                <Flex className="flex-row gap-3">
                    <Link href={data.url} className="flex-1/4">
                        <Flex className="relative aspect-video h-full">
                            <Image
                                src={data.video?.thumbnail?.src || data.thumbnail?.src}
                                alt={data.video?.thumbnail?.alt || data.thumbnail?.alt}
                                className="rounded-lg object-cover h-full"
                                fill
                            />
                            <span className="bg-white/50 text-xs absolute bottom-1 right-1 rounded-full py-0.5 px-1">
                                {data.video?.duration}
                            </span>
                            <CirclePlay
                                size={32}
                                className="absolute text-white/75 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-index-20"
                            />
                        </Flex>
                    </Link>
                    <Flex className="flex-3/4">
                        <span className="text-muted-foreground text-sm">
                            {data.description}
                        </span>
                        <span className="text-muted-foreground text-xs mt-auto">
                            <span className="font-medium">Opublikowane {' '}</span>
                            {data.age}
                        </span>
                    </Flex>
                </Flex>

            </Flex>

            <DeepResults deep_results={data.deep_results} />

        </Flex>
    )
}

export function WebResult({ data }: { data: SearchResult }) {

    const result = data

    if (data.subtype === 'video') return <WebResultVideo data={data} />

    return (
        <Flex className="flex-row gap-2 justify-between">
            <Flex className="gap-1">
                <Link href={result.url}>
                    <Flex className="group gap-2">
                        <Flex className="flex-row gap-2 items-center">
                            <img src={result.meta_url.favicon} className="w-5 h-5 rounded" />
                            <Flex className="">
                                <span className="text-sm">{result.profile.name}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                    {result.meta_url.netloc}{' '}
                                    {result.meta_url.path}
                                </span>
                            </Flex>
                        </Flex>
                        <Flex className="flex-row gap-2">
                            <h2 className="text-blue-600 visited:text-purple-500 group-hover:underline">{result.title}</h2>
                        </Flex>
                    </Flex>
                </Link>

                {!(result.product && result.product.name && result.product.description) &&
                    <p className="text-sm text-muted-foreground">
                        <span className="italic">{result.age && `${result.age} · `}</span>
                        <span dangerouslySetInnerHTML={{ __html: result.description }} />
                    </p>
                }

                <Product product={result.product} />
                <Movie movie={result.movie} />
                <DeepResults deep_results={result.deep_results} />

            </Flex>
            <Thumbnail thumbnail={result.thumbnail} />
        </Flex>
    )
}

export function WebResultSkeleton() {
    return (
        <Flex className="flex-row gap-6 justify-between">
            <Flex className="flex-1 gap-1">
                <Flex className="gap-2">
                    <Flex className="flex-row gap-2 items-center">
                        <Skeleton className="w-5 h-5 rounded shrink-0" />
                        <Flex className="gap-1">
                            <Skeleton className="h-3.5 w-24" />
                            <Skeleton className="h-3 w-40" />
                        </Flex>
                    </Flex>
                    <Skeleton className="h-5 w-3/4" />
                </Flex>
                <Flex className="gap-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </Flex>
            </Flex>
            <Skeleton className="h-20 w-20 shrink-0 rounded" />
        </Flex>
    )
}

export function WebResultsSkeletons() {
    return (
        <Flex className="max-w-156 gap-8">
            {[...Array(10).keys()].map(key => <WebResultSkeleton key={key} />)}
        </Flex>
    )
}

export function WebResults({ data }: { data: WebType }) {

    return (
        <Flex className="max-w-156 gap-8">
            {data.results.map((result, index) => (
                <WebResult key={index} data={result} />
            ))}
        </Flex>
    )
}