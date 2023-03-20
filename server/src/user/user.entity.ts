import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id_user: number

	@Column({ type: 'varchar', length: 100, unique: true })
	email: string

	@Column({ type: 'varchar', length: 100 })
	name: string

	@Column({ type: 'varchar' })
	password: string

	@Column({ type: 'varchar', length: 4 })
	code: string

	@Column({ type: 'boolean', default: false })
	active: boolean

	@Column({ type: 'boolean', default: false })
	ban: boolean

	@Column({ type: 'varchar', default: '' })
	profile_img: string
}
