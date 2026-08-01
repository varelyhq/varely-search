import { LoadingLayout } from "@/components/loading-layout"
import { News } from "@/components/news"
import { NewsFilters } from "@/components/news/news-filters"
import { View } from "@/components/view"
import { getNews } from "@/lib/api-news"

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>
}

export default async function Page({ searchParams }: SearchPageProps) {

    const params = await searchParams

    if (!params.q) {
        return <div>Wpisz coś, żeby wyszukać.</div>
    }

    const readyParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) readyParams.set(key, value)
    })

    const { data, error } = await getNews(readyParams.toString())

    if (error || !data) return null

    return (
        <View className="flex-1">
            <View className="max-w-156 gap-10">
                <LoadingLayout />
                <NewsFilters />
                <News data={data} />
            </View>
        </View>
    )
}
