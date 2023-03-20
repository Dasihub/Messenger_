import { FC } from 'react'
import styles from './styles.module.less'
import { X } from '../../icons'
import { IModalProps } from './IModal'

const Modal: FC<IModalProps> = ({ children, title, hideModal, style }) => {
	const hide = () => {
		hideModal()
	}

	return (
		<div className={styles.fon}>
			<div style={style} className={styles.modal}>
				<div className={styles.modal__header}>
					<h2>{title}</h2>
					<div className={styles.modal__header__x__container} onClick={hide}>
						<X onClick={hideModal} className={styles.modal__header__x} />
					</div>
				</div>
				<div className={styles.br} />
				{children}
			</div>
		</div>
	)
}

export default Modal
