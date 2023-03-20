import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import Compressor from 'compressorjs'
import styles from './styles.module.less'
import { Arrow, Button, Input, Loader, Modal } from '../../../ui'
import { IFormPasswordChange, IModalSetting, ISetting } from './ISetting'
import { useTypeSelector } from '../../../hooks/useTypeSelector'
import { Avatar } from '../../../img'
import { Pencil } from '../../../icons'
import { SettingModalProfileImg, SettingModalPassword } from '../../../components'

const Setting: FC<ISetting> = props => {
	const { profile_img, name } = useTypeSelector(state => state.userReducer)

	const titleRef = useRef<HTMLDivElement | null>(null)
	const menuRef = useRef<HTMLDivElement | null>(null)

	const [img, setImg] = useState<string | ArrayBuffer>('')
	const [value, setValue] = useState<string>('')
	const [fileImg, setFileImg] = useState<File>()
	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
	const [isVisiblePassword2, setIsVisiblePassword2] = useState<boolean>(false)
	const [nameValue, setNameValue] = useState<string>(name)
	const [isModal, setIsModal] = useState<IModalSetting>({
		name: false,
		password: false,
		profileImg: false
	})
	const [warning, setWarning] = useState<string>('')
	const [passwords, setPasswords] = useState<IFormPasswordChange>({
		password: '',
		password_2: ''
	})

	const [isShowTitleProfileImg, setIsShowTitleProfileImg] = useState<boolean>(false)
	const [isMenu, setIsMenu] = useState<boolean>(false)

	const changeName = (e: ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value)
	}

	const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
		setPasswords(pre => (pre = { ...pre, [e.target.name]: e.target.value }))

	const showChangeName = () => setIsModal(pre => (pre = { ...pre, name: true }))

	const showChangePassword = () => {
		isVisiblePassword ? setIsVisiblePassword(false) : null
		isVisiblePassword2 ? setIsVisiblePassword2(false) : null
		warning.length ? setWarning('') : null
		setPasswords({ password: '', password_2: '' })
		setIsModal(pre => (pre = { ...pre, password: true }))
	}

	const hideChangeName = () => {
		setNameValue(name)
		setIsModal(pre => (pre = { ...pre, name: false }))
	}

	const clickChangeName = (e: FormEvent) => {
		e.preventDefault()
		if (nameValue.length) {
			setIsModal(pre => (pre = { ...pre, name: false }))
			props.handleChangeName(nameValue.trim())
		}
	}

	const clickChangePassword = async (e: FormEvent) => {
		e.preventDefault()
		const { password, password_2 } = passwords
		const passwordTrim = password.trim()
		const passwordTrim2 = password_2.trim()
		if (passwordTrim == passwordTrim2 && passwordTrim.length && passwordTrim2) {
			warning.length ? setWarning('') : null
			setPasswords({ password: '', password_2: '' })
			await props.handleChangePassword(passwordTrim)
			return setIsModal(pre => (pre = { ...pre, password: false }))
		}

		setWarning('Вы неправильно вели пароли')
	}

	const clickDeleteProfileImg = async () => {
		setIsMenu(false)
		await props.deleteProfilePhoto()
		setIsShowTitleProfileImg(false)
	}

	const showProfileImg = () => setIsShowTitleProfileImg(true)
	const hideProfileImg = () => {
		isMenu ? null : setIsShowTitleProfileImg(false)
	}

	const showMenu = () => {
		setIsMenu(pre => (pre = !pre))
	}

	const showModalProfileImg = () => {
		setIsModal(pre => (pre = { ...pre, profileImg: true }))
	}

	const hideModalProfileImg = () => {
		setIsMenu(false)
		setIsShowTitleProfileImg(false)
		setFileImg(undefined)
		setIsModal(pre => (pre = { ...pre, profileImg: false }))
		deleteImg()
	}

	const hideModalPassword = () => {
		setIsModal(pre => (pre = { ...pre, password: false }))
	}

	const deleteImg = () => {
		setImg('')
		setValue('')
	}

	const changeImg = (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e.target.files as FileList)[0]
		setValue(e.target.value)
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => setImg(reader.result || '')

		new Compressor(file, {
			quality: 0.8,
			height: 128,
			width: 128,
			strict: true,
			checkOrientation: false,
			convertTypes: ['image/png', 'image/jpeg', 'image/jpg'],
			success(file_: File) {
				const compressFile = new File([file_], file_.name)
				setFileImg(compressFile)
			}
		})
	}

	const clickHandleProfileImg = () => {
		if (value.length) {
			hideModalProfileImg()
			return props.handleImg(fileImg)
		}
	}

	const clickOutsideMenu = useCallback((e: any) => {
		if (!e.path.includes(menuRef.current) && !e.path.includes(titleRef.current)) {
			setIsShowTitleProfileImg(false)
			setIsMenu(false)
		}
	}, [])

	useEffect(() => {
		document.body.addEventListener('click', clickOutsideMenu)
		return () => document.body.removeEventListener('click', clickOutsideMenu)
	}, [clickOutsideMenu])

	return (
		<>
			{isModal.name && (
				<Modal hideModal={hideChangeName} title='Изменить имя'>
					<form>
						<div style={{ position: 'relative', marginTop: 16 }}>
							<Input label='Имя' value={nameValue} onChange={changeName} />
						</div>
						<Button
							value='Сохранить'
							style={{ marginTop: 16 }}
							disabled={!nameValue}
							onClick={clickChangeName}
						/>
					</form>
				</Modal>
			)}
			{isModal.profileImg && (
				<SettingModalProfileImg
					img={img}
					deleteImg={deleteImg}
					hideModalProfileImg={hideModalProfileImg}
					value={value}
					changeImg={changeImg}
					clickHandleProfileImg={clickHandleProfileImg}
				/>
			)}
			{isModal.password && (
				<SettingModalPassword
					hideModalPassword={hideModalPassword}
					password_2={passwords.password_2}
					password={passwords.password}
					isVisiblePassword={isVisiblePassword}
					isVisiblePassword2={isVisiblePassword2}
					setIsVisiblePassword2={setIsVisiblePassword2}
					warning={warning}
					setIsVisiblePassword={setIsVisiblePassword}
					clickChangePassword={clickChangePassword}
					changePassword={changePassword}
				/>
			)}
			<div className={styles.setting}>
				<div className={styles.header}>
					<Arrow onClick={props.hideSetting} />
					<h2>Настройки</h2>
				</div>
				<div className={styles.br}></div>

				<div className={styles.container_profile_img} onMouseOver={showProfileImg}>
					{isMenu && (
						<div ref={menuRef} className={styles.menu}>
							{profile_img.length ? (
								<p onClick={clickDeleteProfileImg}>Удалить фото</p>
							) : null}
							<p onClick={showModalProfileImg}>Загрузить фото</p>
						</div>
					)}
					<img
						className={styles.profile_img}
						src={
							profile_img.length
								? `http://localhost:5000/profile/${profile_img}`
								: Avatar
						}
						alt=''
					/>
					<div
						ref={titleRef}
						onClick={showMenu}
						onMouseOut={hideProfileImg}
						style={
							isShowTitleProfileImg
								? { visibility: 'visible', transition: '0.5s' }
								: {}
						}
						className={styles.blur}
					>
						{props.changeProfilePhotoLoader ? (
							<Loader styleSpinner={{ stroke: '#dcdcdc' }} />
						) : (
							<>
								<div>Изменить</div> <div>фото</div>
							</>
						)}
					</div>
				</div>

				<div style={{ position: 'relative', marginTop: 16 }}>
					<Input
						readOnly={true}
						label='Имя'
						value={name}
						style={{ paddingRight: '65px' }}
						onChange={changeName}
					/>
					<Pencil className={styles.icons} onClick={showChangeName} />
				</div>

				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
					<Button
						style={{ width: 'fit-content', padding: 16 }}
						value='Изменить пароль'
						loader={props.changePasswordLoader}
						onClick={showChangePassword}
					/>
				</div>
			</div>
		</>
	)
}

export default Setting
