import { Warehouse } from "./warehouse.model";

export class User {
    constructor(
        public userId?: string,
        public username?: string,
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public roleName?: String,
        public warehouseId?: String,
        public warehouse?: Warehouse
      ) {
    
      }
}
