export type ConfidenceType = "low" | "medium" | "high";

export type ThumbnailType = {
    src: string;
    width: number;
    height: number;
};

export type ImagePropertiesType = {
    url: string;
    placeholder: string;
    width: number;
    height: number;
};

export type MetaUrlType = {
    scheme: string;
    netloc: string;
    hostname: string;
    favicon: string;
    path: string;
};

export type ImageResultType = {
    type: "image_result";
    title: string;
    url: string;
    source: string;
    page_fetched: string; // ISO date time: YYYY-MM-DDTHH:MM:SSZ
    thumbnail: ThumbnailType;
    properties: ImagePropertiesType;
    meta_url: MetaUrlType;
    confidence: ConfidenceType;
};

export type QueryInfoType = {
    // pola zapytania (nieopisane szczegółowo w dokumentacji)
    original: string;
    spellcheck_off: boolean
    show_strict_warning: boolean
    // [key: string]: unknown;
};

export type ExtraInfoType = {
    might_be_offensive: boolean;
};

export type ImageSearchResponseType = {
    type: "images";
    query: QueryInfoType;
    results: ImageResultType[];
    extra: ExtraInfoType;
};