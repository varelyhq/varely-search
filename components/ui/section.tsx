import { LucideIcon } from "lucide-react"
import { Flex } from "./flex"

export function SectionIcon({ icon: Icon }: { icon: LucideIcon }) {
    if (!Icon) return null
    return <Icon size={16} className="text-muted-foreground" />
}

export function SectionTitle({ children }: { children: string }) {
    return <h3 className="font-medium">{children}</h3>
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
    return (
        <Flex className="flex-row items-center gap-2">
            {children}
        </Flex>
    )
}

export function Section({ children }: { children: React.ReactNode }) {
    return (
        <Flex className='gap-3'>
            {children}
        </Flex>
    )
}