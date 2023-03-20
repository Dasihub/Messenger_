import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service'
import { FileService } from '../file/file.service'
import {
	UserChangeNamedDto,
	UserChangePasswordDto,
	UserDeleteProfileImgDto,
	UserSearch
} from './user.dto'

@Controller('user')
export class UserController {
	constructor(private userService: UserService, private fileService: FileService) {}

	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(FileInterceptor('img'))
	@Post('profile-img')
	async saveProfileImg(@Body() { id_user }: { id_user: number }, @UploadedFile() img) {
		try {
			const fileName: string = await this.fileService.saveProfileImg(img)
			const user = await this.userService.userId(id_user)
			if (user.profile_img.length) {
				await this.fileService.deleteProfileImg(user.profile_img)
			}
			await this.userService.saveProfileImg(fileName, user)

			return {
				message: 'Успешно',
				type: 'success',
				data: fileName
			}
		} catch (e) {
			console.log(e)
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.CREATED)
	@Delete('profile-img')
	async deleteProfileImg(@Query() query: UserDeleteProfileImgDto) {
		try {
			const { profile_img, id_user } = query
			await this.fileService.deleteProfileImg(profile_img)
			await this.userService.deleteProfileImg(id_user)

			return {
				message: 'Фото успешно удалено',
				type: 'success',
				data: []
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Put('change-password')
	async changePassword(@Body() body: UserChangePasswordDto) {
		try {
			const { id_user, password } = body

			await this.userService.changePassword(id_user, password)

			return {
				message: 'Пароль успешно изменен',
				type: 'success',
				data: []
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Put('change-name')
	async changeName(@Body() body: UserChangeNamedDto) {
		try {
			const { id_user, name } = body

			await this.userService.changeName(id_user, name)

			return {
				message: 'Имя успешно изменен',
				type: 'success',
				data: []
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	@HttpCode(HttpStatus.OK)
	@Get('search')
	async search(@Query() query: UserSearch) {
		try {
			const { name, id_user } = query
			const users = await this.userService.search(name, id_user)

			return {
				message: 'Имя успешно изменен',
				type: 'success',
				data: users
			}
		} catch (e) {
			throw new HttpException('Ошибка в сервере', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
