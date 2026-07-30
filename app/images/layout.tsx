import { View } from "@/components/view"

export default function ImagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 p-6">
            <View className="flex-1">{children}</View>
        </View>
    )
}