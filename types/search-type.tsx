// =========================================================================
// Typy wspólne / bazowe (używane w wielu miejscach, żeby uniknąć duplikacji)
// =========================================================================

export type Coordinates = number[];

export type Thumbnail = {
    src: string;
    alt: string;
    height: number;
    width: number;
    bg_color: string;
    original: string;
    logo: boolean;
    duplicated: boolean;
    theme: string;
};

// "pictures.results" ma dokładnie taki sam kształt co Thumbnail
export type Picture = Thumbnail;

export type Profile = {
    name: string;
    url: string;
    long_name: string;
    img: string;
};

export type ExternalProfile = {
    type: "external";
    name: string;
    url: string;
    long_name: string;
    img: string;
};

export type Person = {
    type: "person";
    name: string;
    url: string;
    thumbnail: Thumbnail;
    email: string;
};

export type MetaUrl = {
    scheme: string;
    netloc: string;
    hostname: string;
    favicon: string;
    path: string;
};

export type Rating = {
    ratingValue: number;
    bestRating: number;
    reviewCount: number;
    profile: Profile;
    is_tripadvisor: boolean;
};

export type Icon = {
    href: string;
    sizes: string;
    rel: string;
    type: string;
    ext: string;
};

export type Action = {
    type: string;
    url: string;
};

export type Distance = {
    value: number;
    units: string;
};

export type Contact = {
    email: string;
    telephone: string;
};

export type PostalAddress = {
    type: "PostalAddress";
    country: string;
    postalCode: string;
    streetAddress: string;
    addressRegion: string;
    addressLocality: string;
    displayAddress: string;
};

export type OpeningHoursDay = {
    abbr_name: string;
    full_name: string;
    opens: string;
    closes: string;
};

export type OpeningHours = {
    current_day: OpeningHoursDay[];
    days: OpeningHoursDay[][];
};

export type ReviewItem = {
    title: string;
    description: string;
    date: string;
    rating: Rating;
    author: Person;
    review_url: string;
    language: string;
};

export type Reviews = {
    results: ReviewItem[];
    viewMoreUrl: string;
    reviews_in_foreign_language: boolean;
};

export type Pictures = {
    viewMoreUrl: string;
    results: Picture[];
};

export type ContactPoint = {
    type: string;
    name: string;
    url: string;
    thumbnail: Thumbnail;
    telephone: string;
    email: string;
};

// =========================================================================
// Wynik "bazowy" — wspólny szkielet dla wielu typów wyników wyszukiwania
// =========================================================================

export type BaseResult = {
    title: string;
    url: string;
    is_source_local: boolean;
    is_source_both: boolean;
    description: string;
    page_age: string;
    page_fetched: string;
    fetched_content_timestamp: number;
    profile: Profile;
    language: string;
    family_friendly: boolean;
};

// element tablicy "cluster" wewnątrz SearchResult / DiscussionResult
export type ClusterItem = BaseResult;

// element tablicy "results" wewnątrz LocationResult
export type LocationSubResult = BaseResult & {
    meta_url: MetaUrl;
};

// =========================================================================
// Button / News / Video (używane m.in. w deep_results)
// =========================================================================

export type ButtonResult = {
    type: "button_result";
    title: string;
    url: string;
};

export type NewsResult = BaseResult & {
    meta_url: MetaUrl;
    source: string;
    breaking: boolean;
    is_live: boolean;
    thumbnail: Thumbnail;
    age: string;
    extra_snippets: string[];
    icons: Icon[];
};

// "video" jako pole opisujące wideo (np. wewnątrz SearchResult, Recipe)
export type Video = {
    duration: string;
    views: string;
    creator: string;
    publisher: string;
    thumbnail: Thumbnail;
    tags: string[];
    author: Profile;
    requires_subscription: boolean;
};

// pełny wynik wideo w deep_results (rozszerzony o BaseResult)
export type VideoDeepResult = BaseResult & {
    type: "video_result";
    video: Video;
    meta_url: MetaUrl;
    thumbnail: Thumbnail;
    age: string;
    publisher: string;
};

export type ImageProperties = {
    url: string;
    resized: string;
    placeholder: string;
    height: number;
    width: number;
    format: string;
    content_size: string;
};

export type Image = {
    thumbnail: Thumbnail;
    url: string;
    properties: ImageProperties;
};

export type DeepResults = {
    news: NewsResult[];
    buttons: ButtonResult[];
    videos: VideoDeepResult[];
    images: Image[];
};

// =========================================================================
// Location / Restaurant
// =========================================================================

export type LocationResult = BaseResult & {
    type: "location_result";
    provider_url: string;
    coordinates: Coordinates;
    zoom_level: number;
    thumbnail: Thumbnail;
    postal_address: PostalAddress;
    opening_hours: OpeningHours;
    contact: Contact;
    price_range: string;
    rating: Rating;
    distance: Distance;
    profiles: ExternalProfile[];
    reviews: Reviews;
    pictures: Pictures;
    action: Action;
    serves_cuisine: string[];
    categories: string[];
    icon_category: string;
    timezone: string;
    timezone_offset: number;
    id: string;
    results: LocationSubResult[];
};

// =========================================================================
// Movie / Faq / Qa / Book / Article / Product
// =========================================================================

export type Movie = {
    name: string;
    description: string;
    url: string;
    thumbnail: Thumbnail;
    release: string;
    directors: Person[];
    actors: Person[];
    rating: Rating;
    duration: string;
    genre: string[];
    query: string;
};

export type FaqItem = {
    question: string;
    answer: string;
    title: string;
    url: string;
    meta_url: MetaUrl;
};

export type FaqType = {
    // items: FaqItem[];
    type: 'faq';
    results: FaqItem[];
};

export type QaAnswer = {
    text: string;
    author: string;
    upvoteCount: number;
    downvoteCount: number;
};

export type Qa = {
    question: string;
    answer: QaAnswer;
};

export type BookPrice = {
    price: string;
    priceCurrency: string;
};

export type Book = {
    title: string;
    author: Person[];
    date: string;
    price: BookPrice;
    pages: number;
    publisher: Person;
    rating: Rating;
};

export type ArticlePublisher = {
    type: string;
    name: string;
    url: string;
    thumbnail: Thumbnail;
    contact_points: ContactPoint[];
};

export type Article = {
    author: Person[];
    date: string;
    publisher: ArticlePublisher;
    thumbnail: Thumbnail;
    isAccessibleForFree: boolean;
};

export type Offer = {
    url: string;
    priceCurrency: string;
    price: string;
};

export type Product = {
    type: "Product";
    name: string;
    url: string;
    category: string;
    price: string;
    thumbnail: Thumbnail;
    description: string;
    offers: Offer[];
    rating: Rating;
    gtin: string;
    gtin8: string;
    gtin12: string;
    gtin13: string;
    gtin14: string;
};

export type CreativeWork = {
    name: string;
    rating: Rating;
    thumbnail: Thumbnail;
};

// music_recording ma dokładnie ten sam kształt co CreativeWork
export type MusicRecording = CreativeWork;

export type ReviewSchema = {
    type: "Review";
    name: string;
    thumbnail: Thumbnail;
    description: string;
    rating: Rating;
};

// =========================================================================
// Recipe
// =========================================================================

export type RecipeInstruction = {
    text: string;
    name: string;
    url: string;
    image: string[];
};

export type Recipe = {
    title: string;
    description: string;
    thumbnail: Thumbnail;
    url: string;
    domain: string;
    favicon: string;
    time: string;
    prep_time: string;
    cook_time: string;
    ingredients: string;
    instructions: RecipeInstruction[];
    servings: number;
    calories: number;
    publisher: string;
    rating: Rating;
    recipeCategory: string;
    recipeCuisine: string;
    video: Video;
};

// =========================================================================
// Software / Organization / dodatkowe dane
// =========================================================================

export type Software = {
    name: string;
    author: string;
    version: string;
    codeRepository: string;
    homepage: string;
    datePublished: string;
    is_npm: boolean;
    is_pypi: boolean;
    stars: number;
    forks: number;
    programmingLanguage: string;
};

export type Organization = {
    type: string;
    name: string;
    url: string;
    thumbnail: Thumbnail;
    contact_points: ContactPoint[];
};

export type SearchDataExtra = {
    forum_name: string;
    num_answers: number;
    score: string;
    title: string;
    question: string;
    top_comment: string;
};

// =========================================================================
// Pełny wynik wyszukiwania (używany w web.results i discussions.results)
// =========================================================================

export type SearchResult = BaseResult & {
    type: string;
    subtype: string;
    is_live: boolean;
    deep_results: DeepResults;
    schemas: unknown[];
    meta_url: MetaUrl;
    thumbnail: Thumbnail;
    age: string;
    location: LocationResult;
    restaurant: LocationResult;
    video: Video;
    movie: Movie;
    faq: FaqType;
    qa: Qa;
    book: Book;
    rating: Rating;
    article: Article;
    product: Product;
    product_cluster: Product[];
    cluster_type: string;
    cluster: ClusterItem[];
    creative_work: CreativeWork;
    music_recording: MusicRecording;
    review: ReviewSchema;
    recipe: Recipe;
    software: Software;
    organization: Organization;
    content_type: string;
    extra_snippets: string[];
    icons: Icon[];
    data: SearchDataExtra;
};

// =========================================================================
// Infobox
// =========================================================================

// export type LocationType = {
//     title: string,
//     url: string,
//     is_source_local: boolean,
//     is_source_both: boolean,
//     family_friendly: boolean,
//     type: string,
//     provider_url: string,
//     coordinates: number[][],
//     zoom_level: number,
//     postal_address: {
//         type: 'PostalAddress',
//         displayAddress: string
//     },
//     contact: { telephone: string },
//     profiles: [],
//     categories: []
// }

export type InfoboxResult = BaseResult & {
    type: "infobox";
    position: number;
    label: string;
    category: string;
    long_desc: string;
    thumbnail: Thumbnail;
    attributes: string[][];
    profiles: Profile[];
    website_url: string;
    ratings: Rating[];
    providers: ExternalProfile[];
    distance: Distance;
    images: Thumbnail[];
    movie: Movie;
    subtype: string;
    found_in_urls: string[];
    location?: LocationResult;
};

export type InfoboxType = {
    type: "graph";
    results: InfoboxResult[];
};

// =========================================================================
// Query
// =========================================================================

export type SearchOperators = {
    applied: boolean;
    cleaned_query: string;
    sites: string[];
};

export type QueryLanguage = {
    main: string;
};

export type Query = {
    original: string;
    show_strict_warning: boolean;
    altered: string;
    cleaned: string;
    safesearch: boolean;
    is_navigational: boolean;
    is_geolocal: boolean;
    local_decision: string;
    local_locations_idx: number;
    is_trending: boolean;
    is_news_breaking: boolean;
    ask_for_location: boolean;
    language: QueryLanguage;
    spellcheck_off: boolean;
    country: string;
    bad_results: boolean;
    should_fallback: boolean;
    lat: string;
    long: string;
    postal_code: string;
    city: string;
    header_country: string;
    more_results_available: boolean;
    state: string;
    custom_location_label: string;
    reddit_cluster: string;
    summary_key: string;
    search_operators: SearchOperators;
};

// =========================================================================
// Sekcje najwyższego poziomu (discussions, faq, locations, mixed, news, videos, web...)
// =========================================================================

export type DiscussionsType = {
    type: string;
    results: SearchResult[];
    mutated_by_goggles: boolean;
};

// faq na najwyższym poziomie odpowiedzi (inne niż Faq wewnątrz SearchResult)
export type TopLevelFaq = {
    type: string;
    results: FaqItem[];
};

export type LocationsProvider = Record<string, unknown>;

export type LocationsType = {
    type: string;
    results: LocationResult[];
    provider: LocationsProvider;
};

export type MixedItem = {
    type: keyof SearchResponseItems;
    index: number;
    all: boolean;
};

export type Mixed = {
    type: string;
    main: MixedItem[];
    top: MixedItem[];
    side: MixedItem[];
};

export type NewsType = {
    type: string;
    results: NewsResult[];
    mutated_by_goggles: boolean;
};

// wideo w sekcji "videos" ma nieco inny kształt statystyk (views: number, nie string)
export type VideoStats = {
    duration: string;
    views: number;
    creator: string;
    publisher: string;
    requires_subscription: boolean;
    tags: string[];
    author: Profile;
};

export type VideoThumbnailSimple = {
    src: string;
    original: string;
};

export type VideoSearchResultItem = {
    type: "video_result";
    url: string;
    title: string;
    description: string;
    age: string;
    page_age: string;
    page_fetched: string;
    fetched_content_timestamp: number;
    video: VideoStats;
    meta_url: MetaUrl;
    thumbnail: VideoThumbnailSimple;
};

export type VideosType = {
    type: string;
    results: VideoSearchResultItem[];
    mutated_by_goggles: boolean;
};

export type WebType = {
    type: string;
    results: SearchResult[];
    family_friendly: boolean;
};

export type Summarizer = {
    type: string;
    key: string;
};

export type RichHint = {
    vertical: string;
    callback_key: string;
};

export type Rich = {
    type: string;
    hint: RichHint;
};

// =========================================================================
// Typ główny odpowiedzi
// =========================================================================

export type SearchResponse = {
    type: string;
    query: Query;
    discussions: DiscussionsType;
    faq: TopLevelFaq;
    infobox: InfoboxType;
    locations: LocationsType;
    mixed: Mixed;
    news: NewsType;
    videos: VideosType;
    web: WebType;
    summarizer: Summarizer;
    rich: Rich;
};

export type SearchResponseItems = {
    discussions: DiscussionsType;
    faq: TopLevelFaq;
    infobox: InfoboxType;
    locations: LocationsType;
    news: NewsType;
    videos: VideosType;
    web: WebType;
};
