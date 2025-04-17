// import internal dependencies
import { Address } from "./address";
import { Entity } from "./entity";

////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Customer extends Entity {
    name: string;
    address: Address;
}
