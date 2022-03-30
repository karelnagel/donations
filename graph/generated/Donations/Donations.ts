// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewProject extends ethereum.Event {
  get params(): NewProject__Params {
    return new NewProject__Params(this);
  }
}

export class NewProject__Params {
  _event: NewProject;

  constructor(event: NewProject) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get owner(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get goal(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get styling(): string {
    return this._event.parameters[5].value.toString();
  }

  get image(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Donations extends ethereum.SmartContract {
  static bind(address: Address): Donations {
    return new Donations("Donations", address);
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  projectCount(): BigInt {
    let result = super.call("projectCount", "projectCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_projectCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("projectCount", "projectCount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  titles(param0: BigInt): string {
    let result = super.call("titles", "titles(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toString();
  }

  try_titles(param0: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("titles", "titles(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokens(param0: string): Address {
    let result = super.call("tokens", "tokens(string):(address)", [
      ethereum.Value.fromString(param0)
    ]);

    return result[0].toAddress();
  }

  try_tokens(param0: string): ethereum.CallResult<Address> {
    let result = super.tryCall("tokens", "tokens(string):(address)", [
      ethereum.Value.fromString(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class StartProjectCall extends ethereum.Call {
  get inputs(): StartProjectCall__Inputs {
    return new StartProjectCall__Inputs(this);
  }

  get outputs(): StartProjectCall__Outputs {
    return new StartProjectCall__Outputs(this);
  }
}

export class StartProjectCall__Inputs {
  _call: StartProjectCall;

  constructor(call: StartProjectCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get coin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get goal(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get styling(): string {
    return this._call.inputValues[3].value.toString();
  }

  get image(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class StartProjectCall__Outputs {
  _call: StartProjectCall;

  constructor(call: StartProjectCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
