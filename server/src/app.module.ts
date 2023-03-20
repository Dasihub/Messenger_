import * as path from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { UserEntity } from './user/user.entity'
import { FileModule } from './file/file.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ChatModule } from './chat/chat.module'
import { ChatEntity } from './chat/chat.entity'
import { MessageEntity } from './chat/message.entity'

@Module({
	providers: [],
	controllers: [],
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			database: process.env.PG_DATABASE,
			host: process.env.PG_HOST,
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			port: Number(process.env.PG_PORT),
			synchronize: true,
			entities: [UserEntity, ChatEntity, MessageEntity]
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'public')
		}),
		UserModule,
		AuthModule,
		MailModule,
		FileModule,
		ChatModule
	]
})
export class AppModule {}
