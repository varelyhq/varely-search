import { LoadingLayout } from "@/components/loading-layout"
import { Videos } from "@/components/videos"
import { View } from "@/components/view"
import { getVideos } from "@/lib/api-videos"

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

    const { data, error } = await getVideos(readyParams.toString())

    if (error || !data) return null

    return (
        <View className="flex-1">
            <View className="max-w-156 gap-10">
                <LoadingLayout />
                <Videos data={data} />
            </View>
        </View>
    )
}
