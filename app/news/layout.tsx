import { View } from "@/components/view"

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 container pt-5 pb-10 px-29 mx-auto">
            {children}
        </View>
    )
}