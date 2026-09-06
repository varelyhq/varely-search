import { WebResult, WebResults } from "./web-results";
import { Video, Videos } from "./videos";
import { Query } from "./query";
import { View } from "@/components/view";
import { SearchResponse, SearchResponseItems } from "@/types/search-type";
import { News, NewsSingle } from "./news";
import { Infoboxes } from "./infobox";
import { Faq, FaqSingle } from "./faq";
import { Location, Locations } from "./locations";
import { Discussion, Discussions } from "./discussions";

export function SearchResults({ results }: { results: SearchResponse }) {

    const SearchResult = ({ type, all, index }: { type: keyof SearchResponseItems, all: boolean, index: number }) => {

        const elements: { [key: string]: any } = {
            'web': {
                all: WebResults,
                single: WebResult
            },
            'videos': {
                all: Videos,
                single: Video
            },
            'news': {
                all: News,
                single: NewsSingle
            },
            'faq': {
                all: Faq,
                single: FaqSingle
            },
            'locations': {
                all: Locations,
                single: Location
            },
            'discussions': {
                all: Discussions,
                single: Discussion
            }
        }

        const Element = elements[type]?.[all ? 'all' : 'single']
        const data = all ? results[type] : results[type].results[index]

        if (Element && data) return <Element data={data} />
        return null
    }

    return (
        <View>
            <Query query={results.query} />
            <View className="flex-row gap-24 items-start">
                <View className="max-w-156 gap-8">
                    {results.mixed.main.map((mix, index) => (
                        <SearchResult
                            key={index}
                            type={mix.type}
                            all={mix.all}
                            index={mix.index}
                        />
                    ))}
                </View>
                <Infoboxes data={results.infobox} />
            </View>
        </View>
    )
}