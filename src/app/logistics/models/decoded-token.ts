export class DecodedToken {
    constructor( 
        public exp?: number,
        public iat?: number,
        public sub?: string){}
}
