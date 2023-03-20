import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): any {
		const { getResponse } = host.switchToHttp()
		const res = getResponse<Response>()
		const status = exception.getStatus()
		const message = exception.message

		res.status(status).json({
			message: 'Вы ввели неправильные данные',
			type: 'warn',
			data: []
		})
	}
}
