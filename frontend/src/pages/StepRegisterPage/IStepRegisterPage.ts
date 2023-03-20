import { IUser } from '../../models/IUser'

export interface IForm {
	name: string
	email: string
	password: string
	password_2: string
}

export interface IWarning {
	password: string
	register: string
	code: string
}
