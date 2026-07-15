import "./globals.css"

import { Geist_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { View } from "@/components/view";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
        >
            <body>
                <ThemeProvider>
                    <View className={'min-h-screen bg-background'
                        // + ' bg-blue-50 bg-[radial-gradient(#bedbff_1.5px,transparent_1.5px)] [background-size:24px_24px]'
                    }>
                        {/* <Navbar /> */}
                        {/* <h2 className="text-2xl">cos tam</h2> */}
                        {children}
                        <Footer />
                    </View>
                </ThemeProvider>
            </body>
        </html >
    )
}
