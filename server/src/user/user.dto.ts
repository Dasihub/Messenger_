export class UserChangePasswordDto {
	readonly id_user: number
	readonly password: string
}

export class UserChangeNamedDto {
	readonly id_user: number
	readonly name: string
}

export class UserDeleteProfileImgDto {
	readonly id_user: number
	readonly profile_img: string
}

export class UserSearch {
	id_user: number
	name: string
}
