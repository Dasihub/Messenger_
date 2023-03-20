import { http } from '../hooks/http'
import { IMessage } from '../models/IMessage'
import { IUser } from '../models/IUser'

class MainService {
	async changeName(name: string, id_user: number | null): Promise<IMessage> {
		return await http('/user/change-name', 'PUT', { name, id_user })
	}
	async searchUsers(name: string, id_user: null | number): Promise<IUser[]> {
		const { data } = await http(`/user/search?name=${name}&id_user=${id_user}`)
		return data
	}

	async changePassword(password: string, id_user: number | null): Promise<IMessage> {
		return await http('/user/change-password', 'PUT', { password, id_user })
	}

	async deleteProfileImg(profile_img: string, id_user: number | null): Promise<IMessage> {
		return await http(
			`/user/profile-img?profile_img=${profile_img}&id_user=${id_user}`,
			'DELETE'
		)
	}
}

export default new MainService()
