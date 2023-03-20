import { IUser } from '../models/IUser'
import { http } from '../hooks/http'
import { IMessage } from '../models/IMessage'

export interface IResAuth extends IMessage {
	data: IUser
	accessToken: string
}

class AuthService {
	async auth(email: string, password: string): Promise<IResAuth> {
		return await http('/auth/login', 'POST', {
			email: email,
			password: password
		})
	}

	async activeAccount(code: string, email: string): Promise<string> {
		const { active } = await http('/auth/active-account', 'POST', { code, email })
		return active
	}

	async generateCode(code: string, email: string) {
		await http('/auth/generate-code', 'POST', { email })
	}
}

export default new AuthService()
