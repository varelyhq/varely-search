import { WebResult, WebResults } from "./web-results";
import { Videos } from "./videos";
import { Query } from "./query";
import { SearchResponse, SearchResponseItems } from "@/types/search-type";
import { Infoboxes } from "./infobox";
import { Faq } from "./faq";
import { Location, Locations } from "./locations";
import { Discussions } from "./discussions";
import { Flex } from "@/components/ui/flex";
import { NewsCarousel } from "./news-carousel";

export function SearchResults({ results }: { results: SearchResponse }) {

    const SearchResult = ({ type, all, index }: { type: keyof SearchResponseItems, all: boolean, index: number }) => {

        const elements: { [key: string]: { all: any, single: any } } = {
            'web': {
                all: WebResults,
                single: WebResult
            },
            'videos': {
                all: Videos,
                single: () => null
            },
            'news': {
                all: NewsCarousel,
                single: () => null
            },
            'faq': {
                all: Faq,
                single: () => null
            },
            'locations': {
                all: Locations,
                single: Location
            },
            'discussions': {
                all: Discussions,
                single: () => null
            }
        }

        const Element = elements[type]?.[all ? 'all' : 'single']
        const data = all ? results[type] : results[type].results[index]

        if (Element && data) return <Element data={data} />
        return null
    }

    return (
        <Flex>
            <Query query={results.query} />
            <Flex className="flex-row gap-24 items-start">
                <Flex className="max-w-156 gap-8 w-full">
                    {results.mixed.main.map((mix, index) => (
                        <SearchResult key={index} type={mix.type} all={mix.all} index={mix.index} />
                    ))}
                </Flex>
                <Infoboxes data={results.infobox} />
            </Flex>
        </Flex>
    )
}