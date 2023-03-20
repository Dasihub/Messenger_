import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'

interface ChatRoom {
	users: string[]
	messages: string[]
}

@WebSocketGateway()
export class ChatGateway {
	private chatRooms: Map<string, ChatRoom> = new Map()

	@WebSocketServer()
	server: Server

	@SubscribeMessage('startChat')
	handleStartChat(client, recipientIds: string[]) {
		const senderId = client.handshake.query.userId
		const userIds = [...recipientIds, senderId]
		const roomName = userIds.sort().join('')

		let chatRoom = this.chatRooms.get(roomName)

		if (!chatRoom) {
			chatRoom = { users: userIds, messages: [] }
			this.chatRooms.set(roomName, chatRoom)
		}

		client.join(roomName)
		client.emit('chatRoomStarted', { roomName, messages: chatRoom.messages })
	}

	@SubscribeMessage('changeChatRoom')
	handleChangeChatRoom(client, recipientIds: string[]) {
		const senderId = client.handshake.query.userId
		const userIds = [...recipientIds, senderId]
		const newRoomName = userIds.sort().join('')
		const oldRoomName = Object.keys(client.rooms).find(roomName => roomName !== client.id)

		let newChatRoom = this.chatRooms.get(newRoomName)

		if (!newChatRoom) {
			newChatRoom = { users: userIds, messages: [] }
			this.chatRooms.set(newRoomName, newChatRoom)
		}

		client.join(newRoomName)
		client.emit('chatRoomStarted', { roomName: newRoomName, messages: newChatRoom.messages })

		const oldChatRoom = this.chatRooms.get(oldRoomName)
		oldChatRoom.users.forEach(userId => {
			// @ts-ignore
			const userSocket = this.server.sockets.connected[userId]
			if (userSocket && userSocket.id !== client.id) {
				userSocket.leave(oldRoomName)
				userSocket.join(newRoomName)
				userSocket.emit('chatRoomChanged', newRoomName)
			}
		})

		newChatRoom.messages.push(...oldChatRoom.messages)
		oldChatRoom.messages = []

		this.chatRooms.delete(oldRoomName)
	}

	@SubscribeMessage('sendMessage')
	handleMessage(client, message: string, roomName: string) {
		const chatRoom = this.chatRooms.get(roomName)
		chatRoom.messages.push(`${client.handshake.query.username}: ${message}`)

		const recipientIds = chatRoom.users.filter(userId => userId !== client.id)
		recipientIds.forEach(userId => {
			// @ts-ignore
			const userSocket = this.server.sockets.connected[userId]
			if (userSocket) {
				userSocket.emit('messageReceived', `${client.handshake.query.username}: ${message}`)
			}
		})
	}
}
