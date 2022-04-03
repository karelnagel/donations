
export interface ContractInfo {
    name: string;
    description: string;
    external_link: string;
    seller_fee_basis_points: string;
    fee_recipient: string;
}
export interface OSContractInfo extends ContractInfo{
    image:string;
}
export const defaultContractInfo:ContractInfo={
    name:"",
    description:"",
    external_link:"",
    seller_fee_basis_points:"",
    fee_recipient:""
}
export const ContractInfoTypes = {
    Project: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'external_link', type: 'string' },
        { name: 'seller_fee_basis_points', type: 'string' },
        { name: 'fee_recipient', type: 'address' },
    ]
};
