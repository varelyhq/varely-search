import Link from "next/link";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";

export function ResultThumbnail({ width, height, className, loading, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            width={width || 96}
            height={height || 96}
            loading={loading || "lazy"}
            className={cn("rounded-lg object-cover w-24 h-24", className)}
            {...rest}
        />
    )
}

export function ResultFavicon({ src, alt }: { src: string, alt: string }) {
    return (
        <img src={src} alt={alt} className="w-5 h-5 rounded" />
    )
}

export function ResultMetaTitle({ children }: { children?: string }) {
    return (
        <span className="text-sm">{children}</span>
    )
}

export function ResultMetaPath({ children }: { children?: string | string[] }) {
    return (
        <span className="text-xs text-muted-foreground line-clamp-1">{children}</span>
    )
}

export function ResultMeta({ children }: { children?: React.ReactNode }) {
    return (
        <Flex>
            {children}
        </Flex>
    )
}

export function ResultTitle({ children }: { children?: String }) {
    return (
        <h2 className="text-blue-600 dark:text-blue-400 visited:text-purple-500 group-hover:underline line-clamp-2">{children}</h2>
    )
}

export function ResultTop({ children }: { children?: React.ReactNode }) {
    return (
        <Flex className="flex-row gap-2 items-center">{children}</Flex>
    )
}

export function ResultHeader({ href, children }: { href: string, children?: React.ReactNode }) {
    return (
        <Link href={href} className="flex flex-col group gap-2">{children}</Link>
    )
}

export function Result({ children }: { children?: React.ReactNode }) {
    return (
        <Flex className="flex-row gap-2 justify-between">{children}</Flex>
    )
}

export function ResultContent({ children }: { children?: React.ReactNode }) {
    return (
        <Flex className="gap-1 w-full">{children}</Flex>
    )
}

export function ResultDescription({ age, ageLocation = 'top', children }: { age?: string, ageLocation?: 'top' | 'bottom', children?: string }) {
    return (
        <>
            <p className="text-sm text-muted-foreground">
                {(age && ageLocation === 'top') ? <span className="italic">{age} · </span> : null}
                <span dangerouslySetInnerHTML={{ __html: children || '' }} />
            </p>
            {(age && ageLocation === 'bottom')
                ? (
                    <span className="text-muted-foreground text-xs mt-auto">
                        <span className="font-medium">Opublikowane {' '}</span>
                        {age}
                    </span>
                )
                :
                null
            }
        </>
    )
}