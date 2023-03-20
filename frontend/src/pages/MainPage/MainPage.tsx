import { FC, useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'
import moment from 'moment'
import { InfoHeader, LeftHeader, ListUsers, Chat, Setting } from '../../modules'
import styles from './styles.module.less'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { IMainLoader } from './IMainPage'
import { userSlice } from '../../redux/reducers/userSlice'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { toast } from 'react-toastify'
import { IMessage } from '../../models/IMessage'
import MainService from '../../services/MainService'
import UploadPhotoService from '../../services/UploadPhotoService'
import { IUser } from '../../models/IUser'

const socket = io('http://localhost:5000/', { transports: ['websocket'] })

const MainPage: FC = () => {
	const { changeNameAction, changePhotoImgAction } = userSlice.actions
	const dispatch = useTypeDispatch()
	const { id_user, name, profile_img } = useTypeSelector(state => state.userReducer)
	const [isViewChat, setIsViewChat] = useState<boolean>(false)
	const [isSetting, setIsSetting] = useState<boolean>(false)
	const [isMenu, setIsMenu] = useState<boolean>(false)
	const [messages, setMessages] = useState<any[]>([])
	const [recipient, setRecipient] = useState<IUser>({
		name: '',
		email: '',
		id_user: null,
		profile_img: '',
		active: true
	})
	const [loader, setLoader] = useState<IMainLoader>({
		room: false,
		partner: false,
		changePassword: false,
		changeProfilePhoto: false
	})

	const recipientJoin = (user: IUser) => setRecipient(user)

	const handleMessage = async (message: string) => {}

	const showChat = () => {
		setIsViewChat(true)
	}

	const hideChat = () => {
		setIsViewChat(false)
	}

	const showSetting = () => {
		setIsSetting(true)
		setIsMenu(false)
	}

	const hideSetting = () => {
		setIsSetting(false)
	}

	const hideMenu = () => {
		setIsMenu(false)
	}

	const clickBurger = () => {
		setIsMenu(pre => (pre = !pre))
	}

	const handleChangeName = async (newName: string) => {
		dispatch(changeNameAction(newName))
		const { message, type }: IMessage = await MainService.changeName(newName, id_user)
		toast[type](message)
	}

	const handleChangePassword = async (password: string) => {
		setLoader(pre => (pre = { ...pre, changePassword: true }))
		const { message, type }: IMessage = await MainService.changePassword(password, id_user)
		setLoader(pre => (pre = { ...pre, changePassword: false }))
		toast[type](message)
	}

	const deleteProfilePhoto = async () => {
		setLoader(pre => (pre = { ...pre, changeProfilePhoto: true }))
		await MainService.deleteProfileImg(profile_img, id_user)
		dispatch(changePhotoImgAction(''))
		setLoader(pre => (pre = { ...pre, changeProfilePhoto: false }))
	}

	const handleImg = useCallback(async (fileImg?: File) => {
		try {
			const formData: FormData = new FormData()
			formData.append('img', fileImg || '')
			formData.append('id_user', String(id_user))

			setLoader(pre => (pre = { ...pre, changeProfilePhoto: true }))
			const data = await UploadPhotoService.uploadPhoto(formData)
			dispatch(changePhotoImgAction(data))
		} catch (e) {
			console.log(e)
			toast.warn('Ошибка не удалость сохранить фото')
		} finally {
			setLoader(pre => (pre = { ...pre, changeProfilePhoto: false }))
		}
	}, [])

	useEffect(() => {
		console.log(`Socket connected: ${socket.connected}`)
	}, [socket])

	return (
		<div className={styles.container}>
			<div className={styles.left_sidebar}>
				{isSetting && (
					<Setting
						deleteProfilePhoto={deleteProfilePhoto}
						handleChangeName={handleChangeName}
						handleChangePassword={handleChangePassword}
						handleImg={handleImg}
						hideSetting={hideSetting}
						changePasswordLoader={loader.changePassword}
						changeProfilePhotoLoader={loader.changeProfilePhoto}
					/>
				)}
				<LeftHeader
					clickBurger={clickBurger}
					isMenu={isMenu}
					showSetting={showSetting}
					recipientJoin={recipientJoin}
					hideMenu={hideMenu}
				/>
				<ListUsers />
			</div>
			<div className={styles.container_message} style={isViewChat ? { left: '0' } : {}}>
				<InfoHeader recipient={recipient} hideChat={hideChat} />
				<Chat
					socket={socket}
					handleMessage={handleMessage}
					messages={messages}
					roomLoader={loader.room}
				/>
			</div>
		</div>
	)
}

export default MainPage
