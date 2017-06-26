import {Injectable} from "@angular/core";
import {TransferState} from "../../system/transfer-state/transfer-state";
import {isNullOrUndefined} from "util";

@Injectable()
export class Cache {
  _cache = {};

  constructor(protected transferState: TransferState) {
  }

  has(key: string): boolean {
    return !isNullOrUndefined(this.transferState.get(key));

  }

  set(key: string, value: any): void {
    this.transferState.set(key, value);
  }

  get(key: string): any {
    return this.transferState.get(key);
  }

  clear(): void {
    // TODO
  }
}
