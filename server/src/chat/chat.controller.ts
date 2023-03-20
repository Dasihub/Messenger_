import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	Get,
	Param
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { AccessChatDto } from './chat.dto'

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post('access')
	async accessChat(@Body() body: AccessChatDto) {
		try {
			const { id_user, receiver_id } = body

			const isChat = await this.chatService.selectChat(id_user, receiver_id)

			if (!isChat.length) {
				const { raw } = await this.chatService.createChat(id_user, receiver_id)

				if (raw.length) {
					return {
						message: 'Чат успешно подключено',
						type: 'success',
						data: { ...raw[0], users_ids: [id_user, receiver_id], id_user }
					}
				}

				return {
					message: 'Ошибка при подключение комнаты',
					type: 'error',
					data: []
				}
			}
			return {
				message: 'Чат успешно подключено',
				type: 'success',
				data: isChat
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Get(':id_user')
	async getChats(@Param() { id_user }: { id_user: number }) {
		try {
			const chats = await this.chatService.selectChatForUserId(id_user)

			return {
				message: 'Данные успешно получены',
				type: 'success',
				data: chats
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
