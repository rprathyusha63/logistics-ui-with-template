import { User } from "./user.model";

export class UserListResponse {
    constructor(
        public headers:Object,
        public body:User
      ){}
}
