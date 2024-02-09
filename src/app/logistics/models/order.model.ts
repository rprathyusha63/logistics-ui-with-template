import { Accessorials } from "./accessorials.model";
import { Product } from "./product.model";
import { Vendor } from "./vendor.model";
import { Warehouse } from "./warehouse.model";

export class Order {
    constructor(
        public orderId ?: string,
        public warehouseId?: string,
        public vendorId?: String, 
        public productId?: String,
        public accessorialId?: String,
        public warehouse?: Warehouse,
        public vendor?: Vendor,
        public product?: Product,
        public accessorials?: Accessorials,
        public shippingAddress?: String,
        public condition?: String,
        public totalPrice?:number,
        public status?: String,
        public receivedOn?: Date,
        public processedOn?: Date,
        public shippedOn?: Date,
        public paymentMode?: String,
        public billingAddress?: String,
        public paymentConfirmationNumber?: String,
        
        ){}
}
