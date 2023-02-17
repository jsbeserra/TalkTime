import Messenger from "src/domain/messenger"
import SendMessage from "src/aplication/use-case/messages/send-message/send-message";
import { Server } from "http"
import { Server as IoServer, Socket } from "socket.io"

export default class SocketIoAdpter implements Messenger {
    // REFATORAR COM URGENCIA
    private io: IoServer
    private socket: Socket
    constructor(httpserver: Server) {
        this.io = new IoServer(httpserver, {
            path: '/socket.io',
            cors: {
                origin: '*',
            }
        })
    }

    private clients = []

    async deliver(senderUsername: string, recipientUsername: string, message: string, send_at: Date): Promise<void> {
        const target = this.clients.find(user => user.username === recipientUsername)
        if (!target) return
        this.socket.broadcast.to(target.id).emit('messages', { senderUsername, message, send_at });
    }

    async collect(callback: SendMessage): Promise<void> {
        this.io.on('connection', (socket) => {
            console.log("socket conectado")
            this.clients.push({
                id: socket.id,
                username: socket.handshake.query.senderUsername
            })

            this.socket = socket.on('messages', async (body: any) => {
                const { senderUsername, recipientUsername, message, send_at } = body
                try{
                    await callback.exec({ senderUsername, recipientUsername, message, send_at })
                }catch(err:any){
                    console.log(err.message)
                }
            })
            this.disconect()
        })
    }

    disconect() {
        this.socket.on("disconnect", () => {
            const index = this.clients.findIndex(user => user.username)
            this.clients.splice(index, 1)
        });
    }
}