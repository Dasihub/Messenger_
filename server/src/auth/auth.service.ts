import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async createUser(email: string, password: string, name: string): Promise<boolean> {
		try {
			const hashPassword = await bcrypt.hash(password, 7)
			const { raw } = await this.userService.createUser(email, name, hashPassword)

			if (raw.length) {
				return true
			}
			return false
		} catch (e) {
			console.log(e)
		}
	}

	async isPassword(password: string, hashPassword: string): Promise<boolean> {
		try {
			return await bcrypt.compare(password, hashPassword)
		} catch (e) {
			console.log()
		}
	}
}
