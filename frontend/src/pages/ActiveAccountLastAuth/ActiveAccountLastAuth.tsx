import { ChangeEvent, FC, FormEvent, useState } from 'react'
import styles from './styles.module.less'
import { Alert, Button, Input } from '../../ui'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { userSlice } from '../../redux/reducers/userSlice'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import AuthService from '../../services/AuthService'

const ActiveAccountLastAuth: FC = () => {
	const dispatch = useTypeDispatch()
	const { activeAcc } = userSlice.actions
	const { email } = useTypeSelector(state => state.userReducer)
	const [isBtn, setIsBtn] = useState(true)
	const [code, setCode] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [loader, setLoader] = useState<boolean>(false)

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value)
	}

	const handleActiveAccount = async (e: FormEvent) => {
		e.preventDefault()
		if (code.length >= 4) {
			setLoader(true)
			const active = await AuthService.activeAccount(code, email)
			setLoader(false)

			if (active.length) {
				return dispatch(activeAcc())
			}
			return setError('Неправильный код')
		}
		setError('Неправильный код')
	}

	const handleGenerateCode = async (e: FormEvent) => {
		e.preventDefault()
		await AuthService.generateCode(code, email)
		setIsBtn(false)
	}

	if (isBtn) {
		return (
			<div className={styles.main}>
				<div className={`${styles.container} ${styles.auth}`}>
					<h1>Аккаунт не активирован</h1>
					<div className={styles.title}>
						Нажмите кнопку Далее чтобы активировать аккаунт
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							loader={loader}
							value='Далее'
							style={{ width: '120px' }}
							onClick={handleGenerateCode}
						/>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.main}>
			<form className={`${styles.container} ${styles.auth}`}>
				<h1>Активация аккаунта</h1>
				<div className={styles.title}>
					В электронную почту <span>{email}</span> был отправлен код. Вам нужно вести этот
					код
				</div>
				<div>
					<Input
						type='text'
						placeholder='1234'
						maxLength={4}
						value={code}
						onChange={change}
						error={error}
					/>
					{!!error.length && <Alert value={error} />}
				</div>
				<div>
					<Button loader={loader} onClick={handleActiveAccount} value='Проверить код' />
				</div>
			</form>
		</div>
	)
}

export default ActiveAccountLastAuth
