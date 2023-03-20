import { FC, ChangeEvent, useState, FormEvent } from 'react'
import styles from './styles.module.less'
import { Alert, Button, Input } from '../../../ui'
import { IActiveAccountProps } from './IActiveAccount'

const ActiveAccount: FC<IActiveAccountProps> = ({
	email,
	back,
	handleActiveAccount,
	error,
	loader
}) => {
	const [code, setCode] = useState<string>('')

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value
		if (
			v.at(-1) === '1' ||
			v.at(-1) === '2' ||
			v.at(-1) === '3' ||
			v.at(-1) === '4' ||
			v.at(-1) === '5' ||
			v.at(-1) === '6' ||
			v.at(-1) === '7' ||
			v.at(-1) === '8' ||
			v.at(-1) === '9' ||
			v.at(-1) === '0' ||
			v == ''
		) {
			setCode(v)
		}
	}

	const clickBtn = (e: FormEvent) => {
		e.preventDefault()
		handleActiveAccount(code)
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
					<Button loader={loader} onClick={clickBtn} value='Проверить код' />
				</div>
				<p className={styles.link} onClick={back}>
					Назад
				</p>
			</form>
		</div>
	)
}

export default ActiveAccount
