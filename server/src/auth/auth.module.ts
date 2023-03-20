import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('SECRET_KEY')
			}),
			inject: [ConfigService]
		}),
		UserModule
	]
})
export class AuthModule {}
