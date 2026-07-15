import { Infobox, Web } from "@/types/SearchType";
import { Card, CardContent, CardDescription } from "./ui/card";
import { View } from "./view";
import Link from "next/link";
import Image from "next/image";

function InfoBox({ infobox }: { infobox: Infobox }) {

    if (infobox?.type !== 'graph') return null;

    return (
        <Card className="max-w-96">
            {infobox.results.map((e, i) => (
                <CardContent key={i}>
                    <h3>{e.title}</h3>
                    <p>{e.description}</p>
                    <p>family friendly: {e.family_friendly ? 'Yes' : 'No'}</p>
                    <CardDescription>
                        <p>{e.long_desc}</p>
                    </CardDescription>
                </CardContent>
            ))}
            {/* url // https://en.wikipedia.org/wiki/PewDiePie
        is_source_local // false
        is_source_both // false */}
        </Card>
    )
}

function WebResults({ data }: { data: Web }) {

    return (
        <View className="max-w-156 gap-8">
            {data.results.map((result, index) => (
                <View key={index} className="gap-1">
                    <Link href={result.url}>
                        <View className="flex-row gap-2">
                            {result.thumbnail?.src && (
                                <Image
                                    unoptimized
                                    width={24}
                                    height={24}
                                    src={result.thumbnail.src}
                                    alt={result.thumbnail.alt || ''}
                                    className="rounded"
                                />
                            )}
                            <h2 className="text-blue-500 visited:text-purple-500 hover:underline">{result.title}</h2>
                        </View>
                    </Link>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: result.description }} />
                </View>
            ))}
        </View>
    )
}

export function SearchResults({ results }: any) {

    if (results.type !== 'search') return null

    return (
        <View className="container mx-auto">
            <View className="flex-row gap-4 items-start pt-8">
                <WebResults data={results.web} />
                <InfoBox infobox={results.infobox} />
            </View>
        </View>
    )
}