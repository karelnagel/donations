import { Address, ethereum } from "@graphprotocol/graph-ts"

export function param(name: string, value: ethereum.Value): ethereum.EventParam {
    return new ethereum.EventParam(name, value)
}

export function str(value: string): ethereum.Value {
    return ethereum.Value.fromString(value)
}

export function addr(value: string): ethereum.Value {
    return ethereum.Value.fromAddress(Address.fromString(value))
}
export const addresses=["0xa16081f360e3847006db660bae1c6d1b2e17ec2a",'0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7','0x00005a3a3b2a69de6dbf7f01ed13b2108b2c43e9','0x1115a3a3b2a69de6dbf7f01ed13b2108b2c43e1']
