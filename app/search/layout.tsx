import { View } from "@/components/view"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 p-6 container mx-auto">
            <View className="flex-1">{children}</View>
        </View>
    )
}