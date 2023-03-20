import { http } from '../hooks/http'
import { IUser } from '../models/IUser'

interface IResCheck {
	data: IUser
	accessToken: string
}

class AppService {
	async checkToken(): Promise<IResCheck> {
		return await http('/auth/check-token')
	}

	async logout() {
		await http('/auth/logout')
	}
}

export default new AppService()
