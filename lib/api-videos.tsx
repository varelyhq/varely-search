import { VideosType } from "@/types/search-type";
import { apiClient } from "./api-client";

type Response = {
    data: VideosType | null
    error: string | null
}

export async function getVideos(params: string): Promise<Response> {
    return await apiClient<VideosType>({ endpoint: 'search/videos', params })
}