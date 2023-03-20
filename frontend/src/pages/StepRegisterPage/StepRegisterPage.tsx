import { useState, FormEvent, FC, ChangeEvent, useCallback } from 'react'
import { IForm, IWarning } from './IStepRegisterPage'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { userSlice } from '../../redux/reducers/userSlice'
import { ActiveAccount, UserRegister } from '../../modules'
import { useNavigate } from 'react-router-dom'
import RegisterService from '../../services/RegisterService'

const StepRegisterPage: FC = () => {
	const { pushUserData } = userSlice.actions
	const dispatch = useTypeDispatch()
	const navigate = useNavigate()
	const [loader, setLoader] = useState<boolean>(false)
	const [isPage, setIsPage] = useState<number>(1)
	const [warning, setWarning] = useState<IWarning>({
		password: '',
		register: '',
		code: ''
	})
	const [form, setForm] = useState<IForm>({
		name: '',
		email: '',
		password: '',
		password_2: ''
	})

	const change = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleRegister = useCallback(
		async (e: FormEvent) => {
			e.preventDefault()
			const { name, email, password, password_2 } = form

			const name_ = name.trim()
			const email_ = email.trim()
			const password_ = password.trim()
			const password_2_ = password_2.trim()

			if (name_.length && email_.length && password_.length && password_2_.length) {
				if (password_2_ === password_) {
					setLoader(true)
					const { register, message } = await RegisterService.register(
						email_,
						password_,
						name_
					)
					setLoader(false)

					if (register?.length) {
						return setIsPage(2)
					}
					return setWarning(pre => (pre = { ...pre, register: message }))
				}
				return setWarning(pre => (pre = { ...pre, password: 'Пароли не похожи' }))
			}
			setWarning(pre => (pre = { ...pre, register: 'Заполните все поля' }))
		},
		[form]
	)

	const handleActiveAccount = async (code: string) => {
		code = code.trim()
		if (code.length >= 4) {
			setLoader(true)
			const { active, data } = await RegisterService.activeAccount(code, form.email.trim())
			setLoader(false)

			if (active.length) {
				setIsPage(2)
				navigate('/upload-photo')
				return dispatch(pushUserData(data))
			}
			return setWarning(pre => (pre = { ...pre, code: 'Неправильный код' }))
		}
		setWarning(pre => (pre = { ...pre, code: 'Неправильный код' }))
	}

	const back = () => {
		setIsPage(1)
	}

	if (isPage == 1) {
		return (
			<UserRegister
				loader={loader}
				warning={warning}
				form={form}
				handleRegister={handleRegister}
				change={change}
			/>
		)
	}

	return (
		<ActiveAccount
			loader={loader}
			back={back}
			error={warning.code}
			email={form.email}
			handleActiveAccount={handleActiveAccount}
		/>
	)
}

export default StepRegisterPage
