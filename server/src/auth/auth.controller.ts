import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	Req,
	Res,
	UseFilters,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthActiveDto, AuthDto, RegisterDto } from './auth.dto'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { AuthExceptionFilter } from './auth.exception.filter'

@Controller('auth')
export class AuthController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
		private jwtService: JwtService
	) {}

	@UseFilters(AuthExceptionFilter)
	@UsePipes(new ValidationPipe({ transform: true }))
	@HttpCode(HttpStatus.CREATED)
	@Post('registration')
	async register(@Body() body: RegisterDto) {
		try {
			const { email, password, name } = body

			const isCandidate = await this.userService.isCandidate(email)

			if (isCandidate) {
				return {
					message: `Пользователь с таким ${email} эл.почтой уже существует`,
					type: 'warn',
					data: [],
					register: ''
				}
			}

			const isRegister = await this.authService.createUser(email, password, name)

			if (isRegister) {
				return {
					message: 'Пользователь успешно создан',
					type: 'success',
					data: [],
					register: email
				}
			}

			return {
				message: 'Ошибка. Не удалось зарегистироваться',
				type: 'warn',
				data: [],
				register: ''
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@UseFilters(AuthExceptionFilter)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('login')
	async login(@Body() body: AuthDto, @Res() res) {
		try {
			const user = await this.userService.user(body.email)

			if (!user) {
				return res.status(303).json({
					message: 'Неправильный email или пароль',
					type: 'success',
					data: [],
					accessToken: ''
				})
			}

			const { name, active, password, id_user, email, profile_img } = user

			const isPassword = await this.authService.isPassword(body.password, password)

			if (!isPassword) {
				return res.status(303).json({
					message: 'Неправильный email или пароль',
					type: 'success',
					data: [],
					accessToken: ''
				})
			}

			const accessToken = this.jwtService.sign({
				id_user: id_user,
				email: email,
				name: name,
				active: active
			})

			if (active) {
				return res
					.status(202)
					.cookie('accessToken', accessToken, {
						maxAge: 30 * 24 * 60 * 60 * 1000,
						httpOnly: true
					})
					.json({
						message: 'Авторизация прошла успешно',
						type: 'success',
						data: { id_user, email, name, active, profile_img: profile_img || '' },
						accessToken
					})
			}

			res.status(202).json({
				message: 'Авторизация прошла успешно',
				type: 'success',
				data: { id_user, email, name, active, profile_img: profile_img || '' },
				accessToken
			})
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@UseFilters(AuthExceptionFilter)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('active-account')
	async activeAccount(@Body() body: AuthActiveDto, @Res() res) {
		try {
			const user = await this.userService.user(body.email)

			if (!user) {
				return res.status(303).json({
					message: 'Некоррентные данные',
					type: 'warn',
					data: [],
					active: false
				})
			}

			const { code, active, id_user, email, name } = user

			if (user.code == body.code) {
				await this.userService.activeAccount(code, email)

				const accessToken = this.jwtService.sign({ id_user, email, name, active })

				return res
					.status(200)
					.cookie('accessToken', accessToken, {
						maxAge: 30 * 24 * 60 * 60 * 1000,
						httpOnly: true
					})
					.json({
						message: 'Аккаунт актирован',
						type: 'success',
						data: { id_user, email, name, active: true },
						active: accessToken
					})
			}

			res.status(303).json({
				message: 'Вы ввели неправильный код',
				type: 'warn',
				data: [],
				active: ''
			})
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Get('check-token')
	async checkToken(@Req() req) {
		try {
			// const { accessToken } = req.cookies
			const accessToken =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjozNywiZW1haWwiOiJkYXNpaHViMDJAZ21haWwuY29tIiwibmFtZSI6ItCU0LDRgdGC0LDQvSIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjc5MDMzNDQ3fQ.o0_KvV2pROw1TKWsJYYcM_W0bRCfvAM1fJvCLQe99I8'
			if (!accessToken) {
				return {
					message: 'Вы не авторизованы',
					type: 'warn',
					data: '',
					accessToken: ''
				}
			}

			const data = this.jwtService.verify(accessToken)

			const user = await this.userService.user(data.email)
			if (!user) {
				return {
					message: 'Вы не авторизованы',
					type: 'warn',
					data: {},
					accessToken: ''
				}
			}

			const { id_user, email, name, active, profile_img } = user

			return {
				message: 'Авторизация прошла усешно',
				type: 'success',
				data: { id_user, email, name, active, profile_img: profile_img || '' },
				accessToken
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Get('logout')
	async logout(@Res() res) {
		try {
			res.status(200).clearCookie('accessToken').json({
				message: 'Вы вышли',
				type: 'success',
				data: [],
				logout: true
			})
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@Post('generate-code')
	async generateCode(@Body() { email }: { email: string }) {
		try {
			const user = await this.userService.changeCode(email)

			if (user) {
				return {
					message: 'Удалось генерировать код',
					type: 'success'
				}
			}

			return {
				message: 'Генерация кода прошла успешно',
				type: 'success'
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
