import "./globals.css"

import { Geist_Mono, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Flex } from "@/components/ui/flex";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";

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
            <body className="flex min-h-screen bg-background">
                <NextTopLoader color="#000000" height={3} showSpinner={false} />
                <ThemeProvider>
                    <TooltipProvider>
                        <Flex className='flex-1'>
                            <Suspense fallback={null}>
                                <Navbar />
                            </Suspense>
                            {children}
                            <Footer />
                        </Flex>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}