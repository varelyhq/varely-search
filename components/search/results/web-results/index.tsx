import { SearchResult as SearchResultType, WebType } from "@/types/search-type";
import { DeepResults } from "./deep-results";
import { Flex } from "@/components/ui/flex";
import { WebResultVideo } from "./video";
import { Product } from "./product";
import { Movie } from "./movie";
import { Result, ResultContent, ResultDescription, ResultFavicon, ResultHeader, ResultMeta, ResultMetaPath, ResultMetaTitle, ResultThumbnail, ResultTitle, ResultTop } from "@/components/ui/result";
import { SafeThumbnail } from "./safe-thumbnail";

export function WebResult({ data }: { data: SearchResultType }) {

    const result = data

    if (data.subtype === 'video') return <WebResultVideo data={data} />

    return (
        <Result>
            <ResultContent>
                <Flex className="flex-row gap-4">
                    <ResultHeader href={result.url}>
                        <ResultTop>
                            <ResultFavicon src={result.meta_url.favicon} alt={result.meta_url.netloc} />
                            <ResultMeta>
                                <ResultMetaTitle>{result.profile.name}</ResultMetaTitle>
                                <ResultMetaPath>{result.meta_url.netloc} {result.meta_url.path}</ResultMetaPath>
                            </ResultMeta>
                        </ResultTop>
                        <ResultTitle>{result.title}</ResultTitle>
                    </ResultHeader>
                    <SafeThumbnail thumbnail={result.thumbnail} className="h-full max-h-22 max-w-22 w-full md:hidden" />
                </Flex>

                <ResultDescription age={result.age}>{result.description}</ResultDescription>

                <Product product={result.product} />
                <Movie movie={result.movie} />
                <DeepResults deep_results={result.deep_results} />

            </ResultContent>
            <SafeThumbnail thumbnail={result.thumbnail} className="hidden md:block" />
        </Result>
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