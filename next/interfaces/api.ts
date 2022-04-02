export interface ContractInfo {
    name: string;
    description: string;
    image: string;
    external_link?: string;
    seller_fee_basis_points?: number;
    fee_recipient?: string;
}
export interface ProjectInfo {
    name: string;
    description: string;
    image: string;
    external_url?: string;
    attributes?: Attribute[];
    goal: number;
    socials: string[]
}
export interface Attribute {
    trait_type: string;
    value: string | number;
    display_type?: string
}