import { ResultsContainer } from "@/components/results-container"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <ResultsContainer>
            {children}
        </ResultsContainer>
    )
}