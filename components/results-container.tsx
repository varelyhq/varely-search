import { cn } from "@/lib/utils";
import { Container } from "./ui/container";

export function ResultsContainer({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <Container className={cn("px-4 py-6 max-w-283 my-0! h-full", className)}>
            {children}
        </Container>
    )
}