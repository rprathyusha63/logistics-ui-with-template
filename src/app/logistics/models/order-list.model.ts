import { Order } from "./order.model";

export class OrderList {
    constructor(
        public headers:Object,
        public body:Order
      ){}
}
