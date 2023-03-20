import { useMemo, memo, ChangeEvent, FormEvent, useState, useEffect, FC, useRef } from 'react'
import { InterlocutorMessage, Typing, MyMessage, Loader } from '../../../ui'
import FormChat from '../FormChat/FormChat'
import { useTypeSelector } from '../../../hooks/useTypeSelector'
import styles from './styles.module.less'
import { IChatProps } from './IChat'

const Chat: FC<IChatProps> = props => {
	const { id_user } = useTypeSelector(state => state.userReducer)
	const refChat = useRef<HTMLDivElement | null>(null)
	const [newMessage, setNewMessage] = useState<string>('')
	const [typing, setTyping] = useState<boolean>(false)

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		// props.socket.emit('typing', { idRoom: props.idRoom, id_user })
		setNewMessage(e.target.value)
	}

	const stopTyping = () => {
		// props.socket.emit('stop typing', { idRoom: props.idRoom, id_user })
	}

	const submit = (e: FormEvent) => {
		e.preventDefault()
		if (newMessage.length) {
			setNewMessage('')
			// props.socket.emit('stop typing', { idRoom: props.idRoom, id_user })
			props.handleMessage(newMessage)
		}
	}

	useEffect(() => {
		props.socket.on('stop typing', ({ id_user: getSocketIdUser }) => {
			if (getSocketIdUser != id_user) {
				setTyping(pre => (pre = false))
			}
		})
		props.socket.on('typing', ({ id_user: getSocketIdUser }) => {
			if (getSocketIdUser != id_user) {
				setTyping(pre => (pre = true))
			}
		})
	}, [props.socket])

	useEffect(() => {
		refChat.current?.scrollTo({ top: refChat.current?.scrollHeight })
	}, [props.messages, typing])

	const messageMemo = useMemo(() => {
		return props.messages.map((item, index) => {
			if (item.id_user == id_user) {
				return <MyMessage key={index} value={item.message} />
			}
			return <InterlocutorMessage key={index} value={item.message} />
		})
	}, [props.messages])

	return (
		<>
			<div
				className={styles.container}
				style={
					props.roomLoader
						? { display: 'flex', justifyContent: 'center', alignItems: 'center' }
						: {}
				}
			>
				{}

				{props.roomLoader ? (
					<Loader />
				) : (
					<div className={styles.container_messages}>
						<div ref={refChat} className={styles.messages} id='messages'>
							{messageMemo}
							{typing && <Typing />}
						</div>
					</div>
				)}

				<FormChat
					stopTyping={stopTyping}
					submit={submit}
					change={change}
					newMessage={newMessage}
				/>
			</div>
		</>
	)
}

export default memo(Chat)
