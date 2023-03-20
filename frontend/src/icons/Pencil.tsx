import { FC } from 'react'
import { IIconProps } from '../models/IIcon'

const Pencil: FC<IIconProps> = ({ className, onClick }) => {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			onClick={onClick}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z'
				fill='#6E00FF'
			/>
		</svg>
	)
}

export default Pencil
