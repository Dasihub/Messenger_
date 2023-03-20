import { FC, useEffect } from 'react'
import styles from './styles.module.less'
import { ILoaderProps } from './ILoader'

const Loader: FC<ILoaderProps> = ({ style, styleSpinner, isBackground }) => {
	const svg = (
		<svg
			style={style}
			className={styles.loader}
			viewBox='0 0 100 100'
			xmlns='http://www.w3.org/2000/svg'
		>
			<circle
				style={styleSpinner}
				cx='50'
				cy='50'
				r='30'
				fill='transparent'
				strokeWidth='8px'
				strokeDasharray='160'
			/>
		</svg>
	)

	useEffect(() => {
		if (isBackground) {
			document.body.style.overflow = 'hidden'

			return () => {
				document.body.style.overflow = 'visible'
			}
		}
	}, [])

	if (isBackground) {
		return <div className={styles.background}>{svg}</div>
	}

	return <>{svg}</>
}

export default Loader
