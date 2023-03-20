import {FC} from 'react'
import styles from './styles.module.less'

const MyMessage: FC<{ value: string }> = ({ value }) => {
	return (
		<div className={styles.message}>
			<div className={styles.message__block}>{value}</div>
		</div>
	)
}

export default MyMessage
