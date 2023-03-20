import { IsEmail, Length } from 'class-validator'

export class RegisterDto {
	@IsEmail({}, { message: 'Неправильная эл.почта' })
	readonly email: string

	readonly name: string

	@Length(4, 99, { message: 'Минимальный пароль 4 значения' })
	readonly password: string
}

export class AuthDto {
	readonly email: string
	readonly password: string
}

export class AuthActiveDto {
	@IsEmail({}, { message: 'Неправильная эл.почта' })
	readonly email: string

	@Length(4, 99, { message: 'Минимальный пароль 4 значения' })
	readonly code: string
}
