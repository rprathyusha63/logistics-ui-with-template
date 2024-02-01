import { Product } from "./product.model";
import { Vendor } from "./vendor.model";

export class VendorProduct {
    constructor(
        public vendor?: Vendor,
        public product?: Product,
        public quantity?: number,
        public product_warehouse_plot?: String
      ) {
    
      }
}
