import { Vendor } from "./vendor.model";

export class VendorListResponse {
    constructor(
        public headers:Object,
        public body:Vendor
      ){}
}

