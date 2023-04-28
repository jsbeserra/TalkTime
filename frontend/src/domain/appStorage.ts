export interface AppStorage {
    saveUser(user:userStorage):void
    clear():void
}

export interface userStorage {
    token:string
    name:string
    username:string
    email:string
}