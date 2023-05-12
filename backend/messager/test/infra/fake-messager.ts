import Messenger from 'src/domain/messenger'

export default class FakeMessager implements Messenger{

	async deliver(recipient: string, message: string): Promise<void> {
		return
	}  
	async collect(callback): Promise<void> {
		return
	} 
}