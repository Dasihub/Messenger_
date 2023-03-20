import { ChangeEvent, CSSProperties } from 'react'

export interface IInputProps {
	type?: 'text' | 'password' | 'email' | 'number'
	id?: string
	style?: CSSProperties
	name?: string
	value: string
	label?: string
	error?: string
	placeholder?: string
	title?: string
	isVisiblePassword?: boolean
	required?: boolean
	readOnly?: boolean
	maxLength?: number
	max?: number
	min?: number
	onFocus?: () => void
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	autoComplete?: 'off' | 'on'
}
