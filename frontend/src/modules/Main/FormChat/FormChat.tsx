import { FC } from 'react'
import styles from './styles.module.less'
import { IFormChatProps } from './IFormChat'

const FormChat: FC<IFormChatProps> = ({ change, newMessage, submit, stopTyping }) => {
	return (
		<form className={styles.form} onSubmit={submit}>
			<input
				value={newMessage}
				id='input'
				type='text'
				onChange={change}
				placeholder='Message'
				autoComplete='off'
				onBlur={stopTyping}
			/>
			<button onSubmit={submit} type='submit'>
				<svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10.815 10.197L3.28302 11.453C3.19642 11.4675 3.11516 11.5044 3.0474 11.5603C2.97964 11.6161 2.92778 11.6888 2.89702 11.771L0.300019 18.728C0.0520188 19.368 0.721019 19.978 1.33502 19.671L19.335 10.671C19.4597 10.6087 19.5646 10.513 19.6379 10.3945C19.7111 10.2759 19.75 10.1394 19.75 10C19.75 9.86065 19.7111 9.72405 19.6379 9.60553C19.5646 9.48701 19.4597 9.39125 19.335 9.329L1.33502 0.329C0.721019 0.0219998 0.0520188 0.633 0.300019 1.272L2.89802 8.229C2.92863 8.31141 2.98044 8.3843 3.04821 8.4403C3.11598 8.49631 3.19731 8.53346 3.28402 8.548L10.816 9.803C10.8624 9.81112 10.9044 9.83532 10.9346 9.87136C10.9649 9.90739 10.9815 9.95294 10.9815 10C10.9815 10.0471 10.9649 10.0926 10.9346 10.1286C10.9044 10.1647 10.8624 10.1889 10.816 10.197H10.815Z'
						fill='#ffffff'
					/>
				</svg>
			</button>
		</form>
	)
}

export default FormChat
