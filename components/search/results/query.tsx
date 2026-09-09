import { Flex } from "@/components/ui/flex";
import { Query as QueryType } from "@/types/search-type";
import Link from "next/link";

export function Query({ query }: { query: QueryType }) {

    /*
        {query.bad_results && 'bad'}
        {query.city}
        {query.country}
        {query.header_country}
        {query.is_navigational && 'is_navigational'}
        {query.is_news_breaking && 'is_news_breaking'}
        {query.more_results_available && 'more_results_available'}
        {query.postal_code && 'postal_code'}
        {query.should_fallback && 'should_fallback'}
        {query.show_strict_warning && 'show_strict_warning'}
        {query.state}
    */

    if (!query.altered) return null

    return (
        <Flex className="mt-4">
            <span>
                Wyniki dla {' '}
                <Link href={`/search?q=${query.altered}`}>
                    <span className="text-blue-500 font-medium italic hover:underline">{query.altered}</span>
                </Link>
            </span>
            <span className="text-sm">
                Zamiast tego wyszukaj {' '}
                <Link href={`/search?q=${query.original}&spellcheck=false`}>
                    <span className="text-blue-500 hover:underline">{query.original}</span>
                </Link>
            </span>
        </Flex>
    )
}
