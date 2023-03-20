import { FC } from 'react'
import { IFileInputProps } from './IFileInput'
import styles from './styles.module.less'
import { Button } from '../index'

const FileInput: FC<IFileInputProps> = ({
	label,
	id,
	onChange,
	style,
	accept,
	isLabel,
	deleteImg,
	value
}) => {
	return (
		<>
			{isLabel ? (
				<Button
					value='Удалить фото'
					style={{ backgroundColor: '#EF4444' }}
					onClick={deleteImg}
				/>
			) : (
				<label className={styles.file} style={style} htmlFor={id}>
					{label}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='ionicon'
						viewBox='0 0 512 512'
					>
						<title>Cloud Upload</title>
						<path
							d='M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56'
							fill='none'
							stroke='white'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='32'
						/>
						<path
							fill='none'
							stroke='white'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='32'
							d='M320 255.79l-64-64-64 64M256 448.21V207.79'
						/>
					</svg>
				</label>
			)}
			<input
				type='file'
				accept={accept}
				onChange={onChange}
				id={id}
				value={value}
				style={{ display: 'none' }}
			/>
		</>
	)
}

export default FileInput
