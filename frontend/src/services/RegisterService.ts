import { http } from '../hooks/http'
import { IMessage } from '../models/IMessage'
import { IUser } from '../models/IUser'

interface IResRegister extends IMessage {
	register: string
}

interface IResActive extends IMessage {
	data: IUser
	register: string
	active: string
}

class RegisterService {
	async register(email: string, password: string, name: string): Promise<IResRegister> {
		return await http('/auth/registration', 'POST', { email, password, name })
	}

	async activeAccount(code: string, email: string): Promise<IResActive> {
		return await http('/auth/active-account', 'POST', { code, email })
	}
}

export default new RegisterService()
