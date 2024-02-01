import { Warehouse } from "./warehouse.model";

export class WarehouseListResponse {
    constructor(
        public headers: Object,
        public body: Warehouse
    ) {}
}
