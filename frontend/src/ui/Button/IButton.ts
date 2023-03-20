import { CSSProperties, FormEvent } from 'react'

export interface IButtonProps {
	value: string
	loader?: boolean
	disabled?: boolean
	style?: CSSProperties
	onClick: (e: FormEvent) => void
}
