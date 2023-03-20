import { FC, useEffect, useState } from 'react'
import Router from './pages/Router'
import { IUser } from './models/IUser'
import { useDispatch } from 'react-redux'
import { Loader } from './ui'
import { userSlice } from './redux/reducers/userSlice'
import { ToastContainer } from 'react-toastify'
import { AppContext } from './hooks/AppContext'
import { http } from './hooks/http'
import AppService from './services/AppService'

const App: FC = () => {
	const { authAccess, clearUserData } = userSlice.actions
	const dispatch = useDispatch()
	const [loader, setLoader] = useState<boolean>(true)

	const checkTokenAPI = async () => {
		const { data, accessToken } = await AppService.checkToken()
		setLoader(false)

		if (accessToken.length) {
			dispatch(authAccess(data))
		}
	}

	const logout = async () => {
		setLoader(true)
		await AppService.logout()
		setLoader(false)
		dispatch(clearUserData())
	}

	useEffect(() => {
		checkTokenAPI()
	}, [])

	if (loader) {
		return (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'white'
				}}
			>
				<Loader />
			</div>
		)
	}

	return (
		<AppContext.Provider value={{ logout }}>
			<ToastContainer />
			<Router />
		</AppContext.Provider>
	)
}

export default App
