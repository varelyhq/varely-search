import { SearchResultItem } from "@/types/SearchType";
import { Discussions } from "./discussions";
import { WebResults } from "./web-results";
import { Videos } from "./videos";
import { Query } from "./query";
import { Infobox } from "./infobox";
import { View } from "@/components/view";

export function SearchResults({ results }: { results: SearchResultItem }) {

    if (results.type !== 'search') return null

    return (
        <View className="container mx-auto">
            <Query query={results.query} />
            <View className="flex-row gap-20 items-start pt-6">
                <WebResults data={results.web} />
                <Infobox infobox={results.infobox} />
            </View>
            <Discussions discussions={results.discussions} />
            <Videos videos={results.videos} />
        </View>
    )
}