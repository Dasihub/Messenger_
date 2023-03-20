import { FC } from 'react'
import { Alert, Button, Eye, Input, Modal } from '../../ui'
import styles from '../../modules/Main/Setting/styles.module.less'
import { ISettingModalPasswordProps } from './ISettingModalPassword'

const SettingModalPassword: FC<ISettingModalPasswordProps> = props => {
	return (
		<Modal hideModal={props.hideModalPassword} title='Изменить имя'>
			<form className={styles.change_password}>
				<div style={{ position: 'relative', marginTop: 16 }}>
					<Input
						label='Новый пароль'
						name='password'
						type='password'
						value={props.password}
						onChange={props.changePassword}
						isVisiblePassword={props.isVisiblePassword}
					/>
					<Eye
						setIsVisiblePassword={props.setIsVisiblePassword}
						isVisiblePassword={props.isVisiblePassword}
					/>
				</div>
				<div style={{ position: 'relative' }}>
					<Input
						label='Повторите новый пароль'
						name='password_2'
						type='password'
						value={props.password_2}
						onChange={props.changePassword}
						isVisiblePassword={props.isVisiblePassword2}
					/>
					<Eye
						setIsVisiblePassword={props.setIsVisiblePassword2}
						isVisiblePassword={props.isVisiblePassword2}
					/>
				</div>
				{!!props.warning.length && <Alert value={props.warning} />}
				<div className={styles.change_password_btns}>
					<Button value='Сохранить' onClick={props.clickChangePassword} />
				</div>
			</form>
		</Modal>
	)
}

export default SettingModalPassword
