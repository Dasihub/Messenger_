import { FC } from 'react'
import styles from './styles.module.less'

const Alert: FC<{ value: string }> = ({ value }) => {
	return <div className={styles.error}>{value}</div>
}

export default Alert
