import {WrapInComponentIfExistsDirective} from "../app/directives/wrap-in-component-if-exists";
import {AssetPathDirective} from "../app/directives/asset-path.directive";
import {IssetDirective} from "../app/directives/isset.directive";
import {IsEmptyDirective} from "../app/directives/is-empty.directive";
import {CustomRowDirective} from "../app/components/elements/tables-lists/table/custom-row.directive";


export const UCP_DIRECTIVES: any[] = [
  WrapInComponentIfExistsDirective,
  AssetPathDirective,
  IssetDirective,
  AssetPathDirective,
  CustomRowDirective,
  IsEmptyDirective
]
