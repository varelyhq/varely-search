import { EmptyQuery } from "@/components/empty-query";
import { Flex } from "@/components/ui/flex";
import { paramsToString } from "@/lib/utils";
import { ParamsType } from "@/types/params-type";

export default async function Page({ searchParams }: ParamsType) {

    const originalParams = await searchParams

    if (!originalParams.q) return <EmptyQuery />

    const params = paramsToString(originalParams)

    // const { data, error } = await getMaps(readyParams)
    // if (error || !data) return <SearchError />

    return (
        <Flex className="max-w-156 gap-8">
            Mapki!!!1!
        </Flex>
    )
}