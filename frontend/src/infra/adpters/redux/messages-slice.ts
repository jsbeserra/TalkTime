import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MessagesCache{
    username:string
    messages:Message[]
	lastMessage: Message
	amountOfNewMessages:number
}

interface Message {
    me?:boolean
    message:string,
	sendAt:number
}

interface MessagesCacheState {
    chat:MessagesCache[]
}

const initialState:MessagesCacheState = {
	chat:[]
}
interface inputMessage {
    username:string
    me?:boolean
    message:any,
	sendAt: number
}
export const MessagesCacheSlice= createSlice({
	name:'messagesCache',
	initialState,
	reducers:{
		addMessage:(state,action:PayloadAction<inputMessage>)=>{
			const {username,message,me,sendAt} = action.payload
			const exist = state.chat.find(e=>e.username === username)
			if (!exist){
				state.chat.push({
					messages:[{
						message,
						me,
						sendAt
					}],
					username:username,
					lastMessage:{
						message,
						sendAt,
						me
					},
					amountOfNewMessages: 1
				})
				return
			}
			exist.messages.push({
				message,
				me,
				sendAt
			})
			exist.lastMessage = {
				message,
				sendAt,
				me
			}
			exist.amountOfNewMessages += 1
		},
		resetAmountOfNewMessages:(state,action:PayloadAction<{username:string}>)=>{
			const {username} = action.payload
			const chat =state.chat.find(x=>x.username === username)
			if (chat) chat.amountOfNewMessages = 0
		}
	}
})

export default MessagesCacheSlice.reducer
export const {addMessage,resetAmountOfNewMessages} = MessagesCacheSlice.actions
