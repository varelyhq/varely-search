import { View } from "@/components/view"

export default function AskLayout({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 h-full p-6 min-h-0">
            {children}
        </View>
    )
}