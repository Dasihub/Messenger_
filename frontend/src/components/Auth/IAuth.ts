import { ChangeEvent, FormEvent } from 'react'

export interface IAuthProps {
	email: string
	password: string
	warning: string
	loader: boolean
	isVisiblePassword: boolean
	setIsVisiblePassword: (pre: (pre: boolean) => boolean) => void
	change: (e: ChangeEvent<HTMLInputElement>) => void
	loginApi: (e: FormEvent) => void
}
