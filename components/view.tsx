import { forwardRef, type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const View = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
    ({ className, ...props }, ref) => {
        return <div ref={ref} className={cn("flex flex-col", className)} {...props} />
    }
)

View.displayName = "View"
