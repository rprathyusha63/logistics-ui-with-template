import { VendorProduct } from "./vendor-product.model";

export class VendorProductListResponse {
    constructor(
        public headers:Object,
        public body:VendorProduct
      ){}
}
