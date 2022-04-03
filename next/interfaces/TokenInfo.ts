export interface TokenInfo {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: Attribute[];
}
export interface Attribute {
    trait_type: string;
    value: string | number;
    display_type?: string
}
