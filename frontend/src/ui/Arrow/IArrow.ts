import { CSSProperties } from 'react'

export interface IArrowProps {
	position?: 'left' | 'down' | 'right'
	style?: CSSProperties
	onClick?: () => void
}
