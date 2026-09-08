import { Flex } from "../ui/flex";
import { ResultsContainer } from "../results-container";
import { SafeSearchSelect } from "./safe-search-select";
import { Freshness } from "./settings-sheet/freshness";

export function SearchSettings() {

    return (
        <ResultsContainer className="flex-row gap-3 py-0">
            <Flex>
                <Freshness />
            </Flex>
            <Flex>
                <SafeSearchSelect />
            </Flex>
        </ResultsContainer>
    )
}