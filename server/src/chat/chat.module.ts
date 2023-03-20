import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatEntity } from './chat.entity'
import { MessageEntity } from './message.entity'

@Module({
	controllers: [ChatController],
	providers: [ChatService, ChatGateway],
	imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity])]
})
export class ChatModule {}
