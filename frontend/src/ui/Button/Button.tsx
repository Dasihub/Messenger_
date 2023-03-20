import {FC} from 'react'
import styles from './styles.module.less'
import { IButtonProps } from './IButton'
import { Loader } from '../index'

const Button: FC<IButtonProps> = ({ value, style, loader, disabled, onClick }) => {
	return (
		<button
			onClick={onClick}
			disabled={loader || disabled}
			className={styles.btn}
			style={style}
		>
			{loader ? (
				<Loader style={{ width: '30px' }} styleSpinner={{ stroke: 'white' }} />
			) : (
				value
			)}
		</button>
	)
}

export default Button
