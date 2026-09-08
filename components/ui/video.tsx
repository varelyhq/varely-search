import Link from "next/link";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";

export function VideoThumbnail({ className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img className={cn("rounded-lg object-cover h-full", className)} {...rest} />
    )
}

export function VideoImage({ children }: { children?: React.ReactNode }) {
    return (
        <Flex className="relative flex-2/5 aspect-3/2 h-full">
            {children}
        </Flex>
    )
}

export function VideoDuration({ children }: { children?: string }) {
    return (
        <span className="bg-background/50 text-xs absolute bottom-1 right-1 rounded-full py-0.5 px-1">
            {children}
        </span>
    )
}

export function VideoFavicon({ src, alt }: { src: string, alt?: string }) {
    return (
        <img width={14} height={14} src={src} alt={alt || "Favicon"} className="justify-center shrink-0" />
    )
}

export function VideoSource({ children }: { children?: string }) {
    return (
        <span className="text-xs text-muted-foreground line-clamp-1">
            {children}
        </span>
    )
}

export function VideoMeta({ children }: { children?: React.ReactNode }) {
    return (
        <Flex className="flex-row items-center gap-2">
            {children}
        </Flex>
    )
}

export function VideoTitle({ children }: { children?: string }) {
    return (
        <h3 className="text-xs font-medium line-clamp-2">{children}</h3>
    )
}

export function VideoAge({ children }: { children?: string }) {
    return (
        <span className="text-xs text-muted-foreground mt-1">
            {children}
        </span>
    )
}

export function VideoContent({ children }: { children?: React.ReactNode }) {
    return (
        <Flex className="flex-3/5 gap-1">
            {children}
        </Flex>
    )
}

export function Video({ href, children }: { href: string, children?: React.ReactNode }) {
    return (
        <Link href={href} className="flex flex-row gap-3 bg-muted/50 hover:bg-muted p-3 rounded-lg">
            {children}
        </Link>
    )
}