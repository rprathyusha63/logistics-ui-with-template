import { Product } from "./product.model";

export class ProductListResponse {
    constructor(
        public headers:Object,
        public body:Product
      ){}
}
