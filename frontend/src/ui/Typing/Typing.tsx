import { FC } from 'react'
import styles from './styles.module.less'

const Typing: FC = () => {
	return (
		<div className={styles.loader}>
			<div className={`${styles.loader__dot} ${styles.dot_1}`} />
			<div className={`${styles.loader__dot} ${styles.dot_2}`} />
			<div className={`${styles.loader__dot} ${styles.dot_3}`} />
		</div>
	)
}

export default Typing
