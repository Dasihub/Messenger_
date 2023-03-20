import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

@Module({
	providers: [MailService],
	imports: [
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: configService.get('SMTP_HOST'),
					port: Number(configService.get('process.env.SMTP_PORT')),
					secure: true,
					auth: {
						user: configService.get('SMTP_USER'),
						pass: configService.get('SMTP_PASSWORD')
					}
				}
			})
		})
	],
	exports: [MailService]
})
export class MailModule {}
