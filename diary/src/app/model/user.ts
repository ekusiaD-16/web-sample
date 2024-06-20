export class User {
    userId  : string;
    email   : string;
    password: string;

    isLogin : boolean;

    constructor(userId:string,email:string,password:string) {
        this.userId     = userId;
        this.email      = email;
        this.password   = password;
        this.isLogin    = false;
    }
}