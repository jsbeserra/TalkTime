import { makeGetMessagesUseCase } from 'src/main/factories/get-messages'

describe('makeGetMessagesUseCase',()=>{
	test('Deve criar a controler MessagesController por meio da factory makeGetMessagesUseCase',()=>{
		expect(makeGetMessagesUseCase()).toBeTruthy()
	})
})