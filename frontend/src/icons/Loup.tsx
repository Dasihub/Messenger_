import {FC} from 'react'
import styles from '../ui/LeftHeader/styles.module.less'
import { IIconProps } from '../models/IIcon'

const Loup: FC<IIconProps> = ({ className, onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={className}
			style={{ cursor: 'pointer' }}
			viewBox='0 0 43 43'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M17.9166 32.25C21.0968 32.2494 24.1853 31.1847 26.6904 29.2257L34.5666 37.1018L37.1 34.5684L29.2239 26.6923C31.1839 24.1869 32.2492 21.0977 32.25 17.9167C32.25 10.0136 25.8197 3.58334 17.9166 3.58334C10.0136 3.58334 3.58331 10.0136 3.58331 17.9167C3.58331 25.8197 10.0136 32.25 17.9166 32.25ZM17.9166 7.16668C23.8453 7.16668 28.6666 11.9881 28.6666 17.9167C28.6666 23.8453 23.8453 28.6667 17.9166 28.6667C11.988 28.6667 7.16665 23.8453 7.16665 17.9167C7.16665 11.9881 11.988 7.16668 17.9166 7.16668Z'
				fill='#7C7C7C'
			/>
		</svg>
	)
}

export default Loup
