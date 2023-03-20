import { createContext } from 'react'

interface IContext {
	logout: () => void
}

export const AppContext = createContext<Partial<IContext>>({})
