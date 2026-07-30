import { SearchResponse } from "@/types/search-type";
import { apiClient } from "./api-client";

type Response = {
    data: SearchResponse | null
    error: string | null
}

export async function getSearch(params: string): Promise<Response> {
    return await apiClient<SearchResponse>({ endpoint: 'search', params })
}