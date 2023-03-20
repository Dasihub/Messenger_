import { CSSProperties, ReactElement } from 'react'

export interface IModalProps {
	title: string
	children: ReactElement
	hideModal: () => void
	style?: CSSProperties
}
