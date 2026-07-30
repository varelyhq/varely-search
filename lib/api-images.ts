import { apiClient } from "./api-client";
import { ImageSearchResponseType } from "@/types/images-type";

type Response = {
    data: ImageSearchResponseType | null
    error: string | null
}

export async function getImages(params: string): Promise<Response> {
    return await apiClient<ImageSearchResponseType>({ endpoint: 'search/images', params })
}