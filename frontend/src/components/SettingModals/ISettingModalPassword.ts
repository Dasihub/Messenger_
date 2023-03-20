import { ChangeEvent, FormEvent } from 'react'

export interface ISettingModalPasswordProps {
	warning: string
	password: string
	password_2: string
	isVisiblePassword: boolean
	isVisiblePassword2: boolean
	hideModalPassword: () => void
	clickChangePassword: (e: FormEvent) => void
	changePassword: (e: ChangeEvent<HTMLInputElement>) => void
	setIsVisiblePassword: (pre: (pre: boolean) => boolean) => void
	setIsVisiblePassword2: (pre: (pre: boolean) => boolean) => void
}
