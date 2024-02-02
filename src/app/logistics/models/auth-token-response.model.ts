import { Warehouse } from "./warehouse.model";

export class AuthTokenResponse {
    constructor( 
        public jwttoken?: string,
        public username?: string,
        public email?: string,
        public warehouse ?: Warehouse
        ){}
}
