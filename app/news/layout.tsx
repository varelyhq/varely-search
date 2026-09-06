import { ResultsContainer } from "@/components/results-container"

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ResultsContainer>
            {children}
        </ResultsContainer>
    )
}