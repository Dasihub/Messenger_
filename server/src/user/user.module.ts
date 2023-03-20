import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { MailModule } from '../mail/mail.module'
import { FileModule } from '../file/file.module'

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [TypeOrmModule.forFeature([UserEntity]), MailModule, FileModule],
	exports: [UserService]
})
export class UserModule {}
