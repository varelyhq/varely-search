import { ResultsContainer } from "@/components/results-container"

export default function MapsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ResultsContainer>
            {children}
        </ResultsContainer>
    )
}