import Messenger from "src/domain/messenger"
import SendMessage from "src/aplication/use-case/messages/send-message/send-message";
import { createServer, Server } from "http"
import { Server as IoServer } from "socket.io"

export default class SocketIoAdpter implements Messenger {
    private server: Server
    private io

    constructor(httpserver: any) {
        this.server = createServer(httpserver);
        this.io = new IoServer(this.server)
    }

    async deliver(recipient: string, message: string): Promise<void> {
        this.io.emit(recipient, message)
    }

    async collect(callback: SendMessage): Promise<void> {
        this.io.on('messages', async (messagebody: any) => {
            const { senderUsername, recipientUsername, message, send_at } = messagebody
            await callback.exec({ recipientUsername, message, send_at, senderUsername })
        })
    }

}