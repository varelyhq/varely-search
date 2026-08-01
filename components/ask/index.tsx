import { View } from "../view";
import { Messages } from "./messages";
import { SendMessageBar } from "./send-message-bar";

export function AskAI() {
    return (
        <View className="flex-1 h-full justify-between gap-4 min-h-0">
            <View className="h-full min-h-0">
                <Messages />
            </View>
            <SendMessageBar />
        </View>
    )
}