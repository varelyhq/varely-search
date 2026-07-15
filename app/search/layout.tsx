import { SearchBar } from "@/components/search-bar"
import { View } from "@/components/view"
import { Suspense } from "react"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 p-6">
            <Suspense fallback={null}>
                <SearchBar />
            </Suspense>
            <View className="flex-1">{children}</View>
        </View>
    )
}