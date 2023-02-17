export default interface Messenger {
    deliver(senderUsername:string, recipientUsername: string, message: string,send_at:Date):Promise<void>
    collect(callback:any):Promise<void>
}