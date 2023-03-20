import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InsertResult, Like, Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { MailService } from '../mail/mail.service'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
		private mailService: MailService
	) {}

	async isCandidate(email: string): Promise<boolean> {
		try {
			const candidate = await this.userEntity.findOne({ where: { email } })
			return Boolean(candidate)
		} catch (e) {
			console.log(e)
		}
	}

	async user(email: string): Promise<UserEntity> {
		try {
			return await this.userEntity.findOne({ where: { email } })
		} catch (e) {
			console.log(e)
		}
	}

	async userId(id_user: number): Promise<UserEntity> {
		try {
			return await this.userEntity.findOne({ where: { id_user } })
		} catch (e) {
			console.log(e)
		}
	}

	async createUser(email: string, name: string, password: string): Promise<InsertResult> {
		try {
			const code = await this.mailService.sendMail(email)
			return await this.userEntity.insert({ email, name, code, password })
		} catch (e) {
			console.log(e)
		}
	}

	async activeAccount(code: string, email: string) {
		try {
			const user = await this.userEntity.findOne({ where: { email, code } })
			user.active = true
			await this.userEntity.save(user)
		} catch (e) {
			console.log(e)
		}
	}

	async changeCode(email: string): Promise<UserEntity> {
		try {
			const code = await this.mailService.sendMail(email)
			const user = await this.userEntity.findOne({ where: { email, code } })
			user.code = code

			return user
		} catch (e) {
			console.log(e)
		}
	}

	async saveProfileImg(fileName: string, user: UserEntity) {
		try {
			user.profile_img = fileName
			await this.userEntity.save(user)
		} catch (e) {
			console.log(e)
		}
	}

	async deleteProfileImg(id_user: number) {
		try {
			const user = await this.userEntity.findOne({ where: { id_user } })
			user.profile_img = ''
			await this.userEntity.save(user)
		} catch (e) {
			console.log(e)
		}
	}

	async changePassword(id_user: number, password: string) {
		try {
			const hashPassword = await bcrypt.hash(password, 7)

			const user = await this.userEntity.findOne({ where: { id_user } })
			user.password = hashPassword
			await this.userEntity.save(user)
		} catch (e) {
			console.log(e)
		}
	}

	async changeName(id_user: number, name: string) {
		try {
			const user = await this.userEntity.findOne({ where: { id_user } })
			user.name = name
			await this.userEntity.save(user)
		} catch (e) {
			console.log(e)
		}
	}

	async search(name: string, id_user: number): Promise<UserEntity[]> {
		try {
			// return await this.userEntity.find({
			// 	take: 20,
			// 	where: { name: Like(`%${name}%`), active: true },
			// 	select: { name: true, id_user: true, profile_img: true, email: true }
			// })
			return await this.userEntity.query(
				`select name, id_user, profile_img, email from users where "name" like '%${name}%' and id_user != ${id_user} and active = true limit 20`
			)
		} catch (e) {
			console.log(e)
		}
	}
}
