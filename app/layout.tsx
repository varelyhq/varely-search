import "./globals.css"

import { Geist_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { View } from "@/components/view";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import { SearchInitializer } from "@/components/search/search-init";
import NextTopLoader from 'nextjs-toploader';

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
            className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, 'h-screen')}
        >
            <body className="min-h-screen bg-background">
                <NextTopLoader color="#000000" height={3} showSpinner={false} />
                <Suspense fallback={null}>
                    <SearchInitializer />
                </Suspense>
                <ThemeProvider>
                    <TooltipProvider>
                        <View className={'h-screen bg-background'
                            // + ' bg-blue-50 bg-[radial-gradient(#bedbff_1.5px,transparent_1.5px)] [background-size:24px_24px]'
                        }>
                            <Suspense fallback={null}>
                                <Navbar />
                            </Suspense>
                            {children}
                            <Footer />
                        </View>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html >
    )
}
