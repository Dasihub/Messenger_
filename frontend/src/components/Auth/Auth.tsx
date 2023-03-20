import { FC } from 'react'
import { Alert, Button, Eye, Input } from '../../ui'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.less'
import { IAuthProps } from './IAuth'

const Auth: FC<IAuthProps> = props => {
	return (
		<div className={styles.main}>
			<form className={`${styles.container} ${styles.auth}`}>
				<h1>Авторизация</h1>
				<div style={{ position: 'relative' }}>
					<Input
						type='email'
						label='Email'
						name='email'
						value={props.email}
						required={true}
						onChange={props.change}
					/>
				</div>
				<div style={{ position: 'relative' }}>
					<Input
						type='password'
						label='Пароль'
						name='password'
						value={props.password}
						isVisiblePassword={props.isVisiblePassword}
						onChange={props.change}
					/>
					<Eye
						setIsVisiblePassword={props.setIsVisiblePassword}
						isVisiblePassword={props.isVisiblePassword}
					/>
				</div>
				<div>
					{!!props.warning.length && <Alert value={props.warning} />}
					<Button
						style={props.warning.length ? { marginTop: '5px' } : {}}
						loader={props.loader}
						value='Вход'
						onClick={props.loginApi}
					/>
				</div>
				<p className={styles.link}>
					<NavLink to='/register'>Зарегистрироваться</NavLink>
				</p>
			</form>
		</div>
	)
}

export default Auth
