import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ChatEntity } from './chat.entity'
import { ArrayContains, InsertResult, Repository } from 'typeorm'

@Injectable()
export class ChatService {
	constructor(@InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>) {}

	async selectChat(id_user: number, receiver_id: number): Promise<ChatEntity[]> {
		try {
			return await this.chatEntity.find({
				where: { users_ids: ArrayContains([id_user, receiver_id]) }
			})
		} catch (e) {
			console.log(e)
		}
	}

	async createChat(id_user: number, receiver_id: number): Promise<InsertResult> {
		try {
			return await this.chatEntity.insert({ id_user, users_ids: [id_user, receiver_id] })
		} catch (e) {
			console.log(e)
		}
	}

	async selectChatForUserId(id_user: number): Promise<ChatEntity[]> {
		try {
			return await this.chatEntity.find({ where: { id_user } })
		} catch (e) {
			console.log(e)
		}
	}
}
