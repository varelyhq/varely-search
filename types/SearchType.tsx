// ─────────────────────────────────────────────────────────────
// Wspólne / pomocnicze typy
// ─────────────────────────────────────────────────────────────

export type MetaUrl = {
    scheme: string;
    netloc: string;
    hostname: string;
    favicon: string;
    path: string;
}

export type Thumbnail = {
    src: string;
    original: string;
    alt?: string;
    logo?: boolean;
}

export type Profile = {
    name: string;
    url: string;
    long_name: string;
    img: string;
}

// ─────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────

export type SearchQuery = {
    original: string;
    show_strict_warning: boolean;
    is_navigational: boolean;
    is_news_breaking: boolean;
    spellcheck_off: boolean;
    country: string;
    bad_results: boolean;
    should_fallback: boolean;
    postal_code: string;
    city: string;
    header_country: string;
    more_results_available: boolean;
    state: string;
}

// ─────────────────────────────────────────────────────────────
// discussions
// ─────────────────────────────────────────────────────────────

export type DiscussionData = {
    forum_name: string;
    num_answers: number;
    score: string;
    title: string;
    question?: string;
    top_comment: string;
}

export type DiscussionResult = {
    title: string;
    url: string;
    is_source_local: boolean;
    is_source_both: boolean;
    description: string;
    fetched_content_timestamp: number;
    language: string;
    family_friendly: boolean;
    type: "discussion";
    subtype: string;
    is_live: boolean;
    meta_url: MetaUrl;
    age: string;
    data: DiscussionData;
}

export type Discussions = {
    type: "search";
    results: DiscussionResult[];
    mutated_by_goggles: boolean;
}

// ─────────────────────────────────────────────────────────────
// infobox
// ─────────────────────────────────────────────────────────────

export type InfoboxAttribute = [string, string | null];

export type InfoboxImage = {
    src: string;
    alt: string;
    original: string;
    logo: boolean;
}

export type InfoboxProvider = {
    type: "external";
    name: string;
    url: string;
    img: string;
}

export type InfoboxResult = {
    title: string;
    url: string;
    is_source_local: boolean;
    is_source_both: boolean;
    description: string;
    family_friendly: boolean;
    type: "infobox";
    position: number;
    category: string;
    long_desc: string;
    attributes: InfoboxAttribute[];
    profiles: Profile[];
    website_url: string;
    ratings: unknown[];
    providers: InfoboxProvider[];
    images: InfoboxImage[];
    subtype: string;
    found_in_urls: string[];
}

export type Infobox = {
    type: "graph";
    results: InfoboxResult[];
}

// ─────────────────────────────────────────────────────────────
// mixed
// ─────────────────────────────────────────────────────────────

export type MixedEntry = {
    type: "web" | "infobox" | "discussions" | "videos" | "news" | string;
    index?: number;
    all: boolean;
}

export type Mixed = {
    type: "mixed";
    main: MixedEntry[];
    top: MixedEntry[];
    side: MixedEntry[];
}

// ─────────────────────────────────────────────────────────────
// videos
// ─────────────────────────────────────────────────────────────

export type VideoMeta = {
    duration: string;
    creator: string;
    publisher: string;
}

export type VideoResult = {
    type: "video_result";
    url: string;
    title: string;
    description: string;
    age: string;
    page_age: string;
    fetched_content_timestamp: number;
    video: VideoMeta;
    meta_url: MetaUrl;
    thumbnail: Thumbnail;
}

export type Videos = {
    type: "videos";
    results: VideoResult[];
    mutated_by_goggles: boolean;
}

// ─────────────────────────────────────────────────────────────
// web
// ─────────────────────────────────────────────────────────────

export type DeepResultButton = {
    type: "button_result";
    title: string;
    url: string;
}

export type DeepResults = {
    buttons: DeepResultButton[];
}

export type WebResult = {
    title: string;
    url: string;
    is_source_local: boolean;
    is_source_both: boolean;
    description: string;
    page_age?: string;
    profile: Profile;
    language: string;
    family_friendly: boolean;
    type: "search_result";
    subtype: string;
    is_live: boolean;
    deep_results?: DeepResults;
    meta_url: MetaUrl;
    age?: string;
    thumbnail?: Thumbnail;
    extra_snippets?: string[];
}

export type Web = {
    type: "search";
    results: WebResult[];
    family_friendly: boolean;
}

// ─────────────────────────────────────────────────────────────
// Pojedynczy element odpowiedzi wyszukiwarki
// ─────────────────────────────────────────────────────────────

export type SearchResultItem = {
    type: "search";
    query: SearchQuery;
    discussions: Discussions;
    infobox: Infobox;
    mixed: Mixed;
    videos: Videos;
    web: Web;
}

// ─────────────────────────────────────────────────────────────
// Typ eksportowany — cała odpowiedź to tablica takich elementów
// ─────────────────────────────────────────────────────────────

export type SearchResultsType = SearchResultItem[];