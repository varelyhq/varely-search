import { Newspaper } from "lucide-react";
import { Section, SectionHeader, SectionIcon, SectionTitle } from "@/components/ui/section";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NewsItem, NewsItemAge, NewsItemMeta, NewsItemMetaFavicon, NewsItemMetaPath, NewsItemThumbnail, NewsItemTitle } from "@/components/ui/news-item";
import { NewsType } from "@/types/search-type";

export function NewsCarousel({ data }: { data: NewsType }) {

    if (!data) return null

    return (
        <Section>
            <SectionHeader>
                <SectionIcon icon={Newspaper} />
                <SectionTitle>Wiadomości</SectionTitle>
            </SectionHeader>
            <Carousel>
                <CarouselContent>
                    {data.results.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
                            <NewsItem href={item.url}>
                                <NewsItemThumbnail src={item.thumbnail.src} alt={item.thumbnail.alt} />
                                <NewsItemMeta>
                                    <NewsItemMetaFavicon src={item.meta_url.favicon} alt="" />
                                    <NewsItemMetaPath>{item.meta_url.netloc}</NewsItemMetaPath>
                                </NewsItemMeta>
                                <NewsItemTitle>{item.title}</NewsItemTitle>
                                <NewsItemAge>{item.age}</NewsItemAge>
                            </NewsItem>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='hidden md:inline-flex' />
                <CarouselNext className='hidden md:inline-flex' />
            </Carousel>
        </Section>
    )
}