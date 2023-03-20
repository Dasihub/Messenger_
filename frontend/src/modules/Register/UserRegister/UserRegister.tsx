import { FC, useState } from 'react'
import styles from './styles.module.less'
import { Alert, Button, Eye, Input } from '../../../ui'
import { IDataUserRegister } from './IDataUserRegister'
import { NavLink } from 'react-router-dom'

const UserRegister: FC<IDataUserRegister> = props => {
	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
	const [isVisiblePassword2, setIsVisiblePassword2] = useState<boolean>(false)

	return (
		<div className={styles.main}>
			<form className={`${styles.container} ${styles.auth}`}>
				<h1>Регистрация</h1>
				<div style={{ position: 'relative' }}>
					<Input
						type='text'
						label='Имя'
						name='name'
						required={true}
						value={props.form.name}
						onChange={props.change}
						max={100}
					/>
				</div>
				<div style={{ position: 'relative' }}>
					<Input
						type='email'
						label='Email'
						name='email'
						required={true}
						value={props.form.email}
						onChange={props.change}
						max={100}
					/>
				</div>
				<div>
					<div style={{ position: 'relative' }}>
						<Input
							type='password'
							label='Новый пароль'
							name='password'
							required={true}
							value={props.form.password}
							isVisiblePassword={isVisiblePassword}
							onChange={props.change}
							error={props.warning.password}
						/>
						<Eye
							setIsVisiblePassword={setIsVisiblePassword}
							isVisiblePassword={isVisiblePassword}
						/>
					</div>
					{!!props.warning.password.length && <Alert value={props.warning.password} />}
				</div>
				<div>
					<div style={{ position: 'relative' }}>
						<Input
							type='password'
							label='Повторите новый пароль'
							name='password_2'
							required={true}
							value={props.form.password_2}
							isVisiblePassword={isVisiblePassword2}
							onChange={props.change}
							error={props.warning.password}
						/>
						<Eye
							setIsVisiblePassword={setIsVisiblePassword2}
							isVisiblePassword={isVisiblePassword2}
						/>
					</div>
					{!!props.warning.password.length && <Alert value={props.warning.password} />}
				</div>
				<div>
					{!!props.warning.register.length && <Alert value={props.warning.register} />}
					<Button
						loader={props.loader}
						style={props.warning.register.length ? { marginTop: '5px' } : {}}
						value='Зарегистрироваться'
						onClick={props.handleRegister}
					/>
				</div>
				<p className={styles.link}>
					<NavLink to='/login'>Авторизация</NavLink>
				</p>
			</form>
		</div>
	)
}

export default UserRegister
