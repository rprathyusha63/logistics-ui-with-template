export class AuthTokenResponse {
    constructor( 
        public jwttoken?: string,
        public username?: string,
        public email?: string){}
}
