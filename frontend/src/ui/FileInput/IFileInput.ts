import { ChangeEvent, CSSProperties } from 'react'

export interface IFileInputProps {
	id: string
	label: string
	value: string
	accept?: string
	isLabel: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	style?: CSSProperties
	deleteImg: () => void
}
