import { Warehouse } from "./warehouse.model";

export class Vendor {
    constructor(
        public vendorId?: number,
        public warehouseId?: String,
        public warehouse?: Warehouse,
        public businessName?: String,
        public type?: String,
        public email?: String,
        public phone?: String,
        public location?: String
      ) {
    
      }
}
