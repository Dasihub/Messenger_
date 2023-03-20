import { ChangeEvent, FormEvent } from 'react'
import { IForm, IWarning } from '../../../pages/StepRegisterPage/IStepRegisterPage'

export interface IDataUserRegister {
	change: (e: ChangeEvent<HTMLInputElement>) => void
	handleRegister: (e: FormEvent) => void
	form: IForm
	warning: IWarning
	loader: boolean
}
