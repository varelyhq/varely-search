import { View } from "./view"

export function Footer() {
    return (
        <footer className="grid grid-cols-3 bg-muted border-t border-t-border p-4">
            <a href="#author" className="justify-self-start">O autorze</a>
            <View>
                <p className="text-center">Stworzone z ❤️ © 2026 Varely Search</p>
            </View>
            <a href="#about" className="justify-self-end text-muted-foreground text-right">Jak to działa?</a>
        </footer>
    )
}