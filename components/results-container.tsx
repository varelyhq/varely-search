import { Container } from "./ui/container";

export function ResultsContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container className="px-4 py-6 max-w-283 my-0!">
            {children}
        </Container>
    )
}