import { ChangeEvent, FC, memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.less'
import { Arrow, Input, Loader } from '../../../ui'
import { Loup, X } from '../../../icons'
import { IUser } from '../../../models/IUser'
import { Avatar } from '../../../img'
import { useTypeSelector } from '../../../hooks/useTypeSelector'
import { ILeftHeaderProps } from './ILeftHeader'
import { AppContext } from '../../../hooks/AppContext'
import MainService from '../../../services/MainService'

const LeftHeader: FC<ILeftHeaderProps> = props => {
	const [loader, setLoader] = useState<boolean>(false)
	const { id_user } = useTypeSelector(state => state.userReducer)
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')
	const menuRef = useRef<HTMLDivElement | null>(null)
	const burgerRef = useRef<HTMLDivElement | null>(null)
	const [users, setUsers] = useState<IUser[]>([])
	const [noData, setNoData] = useState<boolean>(false)

	const { logout } = useContext(AppContext)

	const hideTitle = () => {
		noData ? setNoData(false) : null
	}

	const searchUserAPI = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value
		setValue(v)
		hideTitle()
		setTimeout(async () => {
			if (v.length) {
				setUsers([])
				loader ? null : setLoader(true)
				noData ? setNoData(false) : null
				const data = await MainService.searchUsers(v, id_user)
				setLoader(false)
				if (data.length) {
					return setUsers(data)
				}
				return setNoData(true)
			}
			setUsers([])
		}, 500)
	}, [])

	const showSearchContainer = () => {
		setIsSearch(true)
	}

	const hideSearchContainer = () => {
		clearValue()
		setIsSearch(false)
		hideTitle()
		setUsers([])
	}

	const clearValue = () => {
		setValue('')
		hideTitle()
		setUsers([])
	}

	const clickOutsideMenu = useCallback((e: any) => {
		if (!e.path.includes(menuRef.current) && !e.path.includes(burgerRef.current)) {
			props.hideMenu()
		}
	}, [])

	const focusInput = () => {
		const input = document.querySelector('#search') as HTMLInputElement
		input.focus()
	}

	const clickRecipient = (user: IUser) => {
		setIsSearch(false)
		props.recipientJoin(user)
	}

	useEffect(() => {
		document.body.addEventListener('click', clickOutsideMenu)
		return () => document.body.removeEventListener('click', clickOutsideMenu)
	}, [clickOutsideMenu])

	return (
		<div
			className={
				isSearch ? `${styles.item_search} ${styles.search_container}` : styles.item_search
			}
		>
			<div className={styles.container}>
				{props.isMenu && (
					<div ref={menuRef} className={styles.menu}>
						<p onClick={props.showSetting}>Настройки</p>
						<p onClick={logout}>Выйти</p>
					</div>
				)}
				{isSearch ? (
					<Arrow onClick={hideSearchContainer} style={{ stroke: '#707991' }} />
				) : (
					<div
						ref={burgerRef}
						style={props.isMenu ? { backgroundColor: 'rgba(124, 124, 124, 0.11)' } : {}}
						className={styles.burger}
						onClick={props.clickBurger}
					>
						<div className={styles.burger__items} />
						<div className={styles.burger__items} />
						<div className={styles.burger__items} />
					</div>
				)}
				<div className={styles.input}>
					<Loup onClick={focusInput} className={styles.loup} />
					<Input
						title='Тесктовое поле для поиска'
						autoComplete='off'
						placeholder='Поиск'
						id='search'
						value={value}
						max={100}
						onFocus={showSearchContainer}
						onChange={searchUserAPI}
					/>
					{loader && (
						<Loader
							style={{
								position: 'absolute',
								right: '2px',
								width: '32px',
								height: '32px'
							}}
						/>
					)}
					{!loader && value.length ? (
						<X className={styles.x} onClick={clearValue} />
					) : null}
				</div>
			</div>
			{isSearch && <div className={styles.br} />}
			{noData && <p className={styles.no_data}>Не найдено</p>}
			{isSearch
				? users.map(item => (
						<div
							key={item.id_user}
							onClick={clickRecipient.bind(null, item)}
							className={styles.user}
						>
							<img
								src={
									item.profile_img
										? `http://localhost:5000/profile/${item.profile_img}`
										: Avatar
								}
								alt=''
							/>
							<div style={{ flex: 3 }}>
								<div className={styles.username}>{item.name}</div>
							</div>
						</div>
				  ))
				: null}
		</div>
	)
}

export default memo(LeftHeader)
