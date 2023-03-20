import { FC, useRef } from 'react'
import styles from './styles.module.less'
import { IInputProps } from './IInput'

const Input: FC<IInputProps> = ({
	value,
	label,
	name,
	id,
	onChange,
	style,
	title,
	type,
	placeholder,
	isVisiblePassword,
	required,
	maxLength,
	max,
	min,
	error,
	onFocus,
	autoComplete,
	readOnly
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	const focusInput = () => {
		if (!value.length) {
			inputRef.current?.focus()
		}
	}

	return (
		<>
			{label?.length ? (
				<label
					onClick={focusInput}
					htmlFor={id}
					className={value.length ? styles.label : `${styles.label} ${styles.label_on}`}
				>
					{label}
				</label>
			) : null}
			<input
				value={value}
				onChange={onChange}
				ref={inputRef}
				id={id}
				name={name}
				className={error?.length ? `${styles.input} ${styles.input_error}` : styles.input}
				type={type === 'password' ? (isVisiblePassword ? 'text' : type) : type}
				placeholder={placeholder}
				style={style}
				title={title}
				autoComplete={autoComplete}
				required={required}
				readOnly={readOnly}
				maxLength={maxLength}
				max={max}
				min={min}
				onFocus={onFocus}
			/>
		</>
	)
}

export default Input
