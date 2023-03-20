import { FormEvent } from 'react'

export interface IActiveAccountProps {
	loader: boolean
	email: string
	back: () => void
	error: string
	handleActiveAccount: (code: string) => void
}
