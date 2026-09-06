import { ResultsContainer } from "@/components/results-container"

export default function VideosLayout({ children }: { children: React.ReactNode }) {
    return (
        <ResultsContainer>
            {children}
        </ResultsContainer>
    )
}