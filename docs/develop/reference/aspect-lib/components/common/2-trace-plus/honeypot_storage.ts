import {
    BigInt,
    ethereum,
    EthStateChange,
    State,
    StateChange,
    StateChangeProperties,
    StateKey,
    sys,
    TraceCtx
} from "@artela/aspect-libs";

export namespace HoneyPotState {
    export class balances_MappingValue extends StateChange<BigInt> {

        constructor(ctx: TraceCtx, addr: string, indices: Uint8Array[] = []) {
            super(new StateChangeProperties(ctx, addr, 'HoneyPot.balances', indices));
        }

        override unmarshalState(raw: EthStateChange): State<BigInt> {
            let valueHex = sys.utils.uint8ArrayToHex(raw.value);
            let value = BigInt.fromString(valueHex, 16);
            return new State(raw.account, value, raw.callIndex);
        }
    }

    export class balances extends StateKey<string> {

        constructor(ctx: TraceCtx, addr: string, indices: Uint8Array[] = []) {
            super(new StateChangeProperties(ctx, addr, 'HoneyPot.balances', indices));
        }

        @operator("[]")
        get(key: string): balances_MappingValue {
            // @ts-ignore
            return new balances_MappingValue(this.__properties__.ctx, this.__properties__.account,
                sys.utils.arrayCopyPush(this.__properties__.indices, this.parseKey(key)));
        }

        protected parseKey(key: string): Uint8Array {
            return ethereum.Address.fromHexString(key).encodeUint8Array();
        }

        childrenIndexValue(index: u64): ethereum.Address {
            return ethereum.Address.fromUint8Array(this.__children__[index]);
        }

        childChangeAt(index: u64): balances_MappingValue {
            // @ts-ignore
            return new balances_MappingValue(this.__properties__.ctx, this.__properties__.account,
                sys.utils.arrayCopyPush(this.__properties__.indices, this.__children__[index]));
        }
    }

    export class _balance_ extends StateChange<BigInt> {

        constructor(ctx: TraceCtx, addr: string, indices: Uint8Array[] = []) {
            super(new StateChangeProperties(ctx, addr, '.balance', indices));
        }

        override unmarshalState(raw: EthStateChange): State<BigInt> {
            let valueHex = sys.utils.uint8ArrayToHex(raw.value);
            let value = BigInt.fromString(valueHex, 16);
            return new State(raw.account, value, raw.callIndex);
        }
    }
}
