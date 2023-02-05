import User from "../../entities/user";
import UserData from "./userData";

export interface UserRepository {
    create(user:UserData):Promise<void>
    findByUserName(username:string):Promise<User | undefined>
    findByEmail(email:string):Promise<User | undefined>
    delete(username:string):Promise<boolean>
    update(user:UserData):Promise<UserData>
}

