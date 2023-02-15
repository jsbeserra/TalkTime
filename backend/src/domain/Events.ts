export interface Events {
    on(event:string,callback: () => any): Promise<void>
    listen(event:string,callback: () => any): Promise<void>
    send(event:string,callback: () => any): Promise<void>
}