import Link from "next/link"
import { View } from "./view"

export function Footer() {
    return (
        <footer className="grid grid-cols-1 md:grid-cols-3 bg-muted border-t border-t-border p-4 text-sm">
            <Link href='https://varely.co/pl/about-janek' target='_blank' className="justify-self-center md:justify-self-start">
                O autorze
            </Link>
            <View>
                <p className="text-center">Stworzone z ❤️ © 2026 Varely Search</p>
            </View>
            <Link href="#about" className="justify-self-center md:justify-self-end text-muted-foreground text-right">
                Jak to działa?
            </Link>
        </footer>
    )
}