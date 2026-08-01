import { NewsType } from "@/types/search-type";
import { apiClient } from "./api-client";

type Response = {
    data: NewsType | null
    error: string | null
}

export async function getNews(params: string): Promise<Response> {
    return await apiClient<NewsType>({ endpoint: 'search/news', params })
}