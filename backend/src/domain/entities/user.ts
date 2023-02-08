import Email from "../email"
import Name from "../name"
import Password from "../password"
import Username from "../username"

export default class User {
    constructor(readonly email: Email,readonly password: Password,readonly name: Name,readonly username: Username,readonly id?:string) {
    }

    public getUser() {
        const user = {
            name:this.name.value,
            username:this.username.value,
            password:this.password.value,
            email:this.email.value,
            id: this.id
        }
        return user
    }
}