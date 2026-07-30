import { View } from "@/components/view"

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {

    const params = await searchParams

    if (!params.q) {
        return <div>Wpisz coś, żeby wyszukać.</div>
    }

    // const results = await getNews(params)

    return (
        <View className="flex-1">
            news
        </View>
    )
}
