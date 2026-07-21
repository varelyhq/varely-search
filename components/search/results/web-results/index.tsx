import { View } from "@/components/view";
import { Web } from "@/types/SearchType";
import Link from "next/link";
import { Thumbnail } from "./thumbnail";

export function WebResults({ data }: { data: Web }) {

    return (
        <View className="max-w-156 gap-8">
            {data.results.map((result, index) => (
                <View key={index} className="flex-row gap-2 justify-between">
                    <View className="gap-1">
                        <Link href={result.url}>
                            <View className="flex-row gap-2">
                                <h2 className="text-blue-500 visited:text-purple-500 hover:underline">{result.title}</h2>
                            </View>
                        </Link>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: result.description }} />
                    </View>
                    {result?.thumbnail && <Thumbnail thumbnail={result.thumbnail} />}
                </View>
            ))}
        </View>
    )
}