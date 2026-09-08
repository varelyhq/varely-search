import { Flex } from "@/components/ui/flex"
import { ReviewStars } from "./review-stars"
import { Product as ProductType } from "@/types/search-type";

export function Product({ product }: { product: ProductType }) {

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