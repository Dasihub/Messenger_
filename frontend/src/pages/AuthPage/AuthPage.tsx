import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react'
import { IForm } from './IAuthPage'
import { useDispatch } from 'react-redux'
import { userSlice } from '../../redux/reducers/userSlice'
import AuthService from '../../services/AuthService'
import { Auth } from '../../components'

const AuthPage: FC = () => {
	const dispatch = useDispatch()
	const { authAccess } = userSlice.actions

	const [loader, setLoader] = useState<boolean>(false)
	const [form, setForm] = useState<IForm>({
		email: '',
		password: ''
	})
	const [warning, setWarning] = useState<string>('')
	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const loginApi = useCallback(
		async (e: FormEvent) => {
			e.preventDefault()
			const { email, password } = form
			if (email.trim().length && password.trim().length) {
				setLoader(true)
				const { accessToken, data, message } = await AuthService.auth(
					email.trim(),
					password.trim()
				)
				setLoader(false)
				if (accessToken.length) {
					return dispatch(authAccess(data))
				}
				return setWarning(message)
			}
			setWarning('Заполните всего поля')
		},
		[form]
	)

	return (
		<Auth
			loader={loader}
			change={change}
			warning={warning}
			email={form.email}
			loginApi={loginApi}
			password={form.password}
			setIsVisiblePassword={setIsVisiblePassword}
			isVisiblePassword={isVisiblePassword}
		/>
	)
}

export default AuthPage
