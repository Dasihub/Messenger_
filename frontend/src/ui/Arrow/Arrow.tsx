import {FC} from 'react'
import { IArrowProps } from './IArrow'
import styles from './styles.module.less'

const Arrow: FC<IArrowProps> = ({ position = 'left', style, onClick }) => {
	return (
		<div onClick={onClick} className={styles.btn}>
			<svg
				width='27'
				height='27'
				fill='none'
				className={styles[position]}
				viewBox='0 0 22 22'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M8.77242 5.43579L3.20825 11L8.77242 16.5641'
					style={style}
					strokeWidth='2'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
					className={styles.path}
				/>
				<path
					style={style}
					d='M18.7918 11H3.36426'
					strokeWidth='2'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
					className={styles.path}
				/>
			</svg>
		</div>
	)
}

export default Arrow
