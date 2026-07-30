const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://n8n.varely.co/webhook'

type Method = 'GET' | 'POST'

type APIFetchOptions = {
    endpoint: 'search' | 'images' // np. 'search', 'images', 'news', 'videos'
    method?: Method
    params?: string
    body?: unknown
    timeoutMs?: number
}

type APIFetchResult<T> = {
    data: T | null
    error: string | null
}

export async function apiClient<T = unknown>({
    endpoint,
    method = 'GET',
    params,
    body,
    timeoutMs = 10000,
}: APIFetchOptions): Promise<APIFetchResult<T>> {

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {

        let url = `${API_BASE_URL}/${endpoint}`

        if (params) url += `?${params}`

        const res = await fetch(url, {
            method,
            signal: controller.signal,
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!res.ok) {
            return { data: null, error: `Request failed: ${res.status}` }
        }

        const data = (await res.json()) as T

        return { data, error: null }

    } catch (err) {

        if (err instanceof Error && err.name === 'AbortError') {
            return { data: null, error: 'Request timed out' }
        }

        return { data: null, error: err instanceof Error ? err.message : 'Unknown error' }

    } finally {
        clearTimeout(timeout)
    }
}
