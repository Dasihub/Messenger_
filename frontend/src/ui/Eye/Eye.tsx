import {FC} from 'react'
import styles from './styles.module.less'
import { IEyeProps } from './IEye'

const Eye: FC<IEyeProps> = ({ setIsVisiblePassword, isVisiblePassword }) => {
	const change = () => {
		setIsVisiblePassword(pre => (pre = !pre))
	}

	return (
		<>
			<svg
				className={styles.eye}
				onClick={change}
				width='88'
				height='60'
				viewBox='0 0 88 60'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M44 0C24 0 6.92 12.44 0 30C6.92 47.56 24 60 44 60C64 60 81.08 47.56 88 30C81.08 12.44 64 0 44 0ZM44 50C32.96 50 24 41.04 24 30C24 18.96 32.96 10 44 10C55.04 10 64 18.96 64 30C64 41.04 55.04 50 44 50ZM44 18C37.36 18 32 23.36 32 30C32 36.64 37.36 42 44 42C50.64 42 56 36.64 56 30C56 23.36 50.64 18 44 18Z'
					fill='#6E00FF'
				/>
			</svg>
			{isVisiblePassword && (
				<span
					onClick={setIsVisiblePassword.bind(null, pre => (pre = false))}
					className={styles.br}
				/>
			)}
		</>
	)
}

export default Eye
