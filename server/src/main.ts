import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ChatGateway } from './chat/chat.gateway'

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule, { cors: true })
		const PORT = process.env.PORT

		app.setGlobalPrefix('api')
		app.get(ChatGateway)
		app.enableCors({ origin: 'http://localhost:3000' })

		app.use(cookieParser())
		app.use(logger('dev'))

		await app.listen(PORT, () => console.log(`Server is working in port ${PORT}..`))
	} catch (e) {
		console.log(e)
	}
}
bootstrap()
