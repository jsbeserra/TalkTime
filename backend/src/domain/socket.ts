export interface Socket {
    on(event:string,callback: () => any): Promise<void>

}