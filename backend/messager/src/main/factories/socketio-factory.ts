import RedisAdpter from 'src/infra/adpters/redis-adpter'
import SocketIoAdpter from 'src/infra/adpters/socketio-adpter'
import SocketRepositoryRedis from 'src/infra/repository/socket-repository-redis'

export const makeSocketIo = () => {
	const redisAdpter = new RedisAdpter()
	const socketRepositoryRedis = new SocketRepositoryRedis(redisAdpter)
	const socketIoAdpter2 = new SocketIoAdpter(socketRepositoryRedis)
	return socketIoAdpter2
}