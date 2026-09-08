import Link from "next/link"
import { Flex } from "./flex"
import { cn } from "@/lib/utils"

export function NewsItemThumbnail({ className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img className={cn("h-28 w-auto object-cover rounded-lg", className)} {...rest} />
    )
}

export function NewsItemTitle({ children }: { children?: string }) {
    return <h3 className="text-sm font-medium line-clamp-2">{children}</h3>
}

export function NewsItemAge({ children }: { children?: string }) {
    return <span className="text-muted-foreground text-xs">{children}</span>
}

export function NewsItemMeta({ children }: { children: React.ReactNode }) {
    return (
        <Flex className="flex-row items-center gap-1">
            {children}
        </Flex>
    )
}

export function NewsItemMetaFavicon({ className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img className={cn("rounded h-4 w-4", className)} {...rest} />
    )
}

export function NewsItemMetaPath({ children }: { children?: string }) {
    return (
        <span className="text-muted-foreground text-xs">{children}</span>
    )
}

export function NewsItem({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="flex flex-col gap-2 hover:bg-muted p-3 rounded-lg">
            {children}
        </Link>
    )
}