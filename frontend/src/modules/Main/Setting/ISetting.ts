export interface ISetting {
	handleChangeName: (newName: string) => void
	handleChangePassword: (password: string) => Promise<void>
	hideSetting: () => void
	handleImg: (FileImg?: File) => void
	deleteProfilePhoto: () => Promise<void>
	changePasswordLoader: boolean
	changeProfilePhotoLoader: boolean
}

export interface IFormPasswordChange {
	password: string
	password_2: string
}

export interface IModalSetting {
	profileImg: boolean
	name: boolean
	password: boolean
}
