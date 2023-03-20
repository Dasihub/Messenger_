import * as fs from 'fs'
import { v4 } from 'uuid'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FileService {
	constructor() {}

	async saveProfileImg(img: any): Promise<string> {
		try {
			if (!fs.existsSync('public/profile')) {
				fs.mkdir('public/profile', err => {
					if (err) {
						console.log(err, 'Error create dir')
					}
				})
			}
			const fileName = v4() + '.jpg'
			await fs.writeFile('public/profile/' + fileName, img.buffer, err => {
				if (err) {
					console.log(err, 'Error save img')
				}
			})

			return fileName
		} catch (e) {
			console.log(e)
		}
	}

	async deleteProfileImg(fileName: string) {
		try {
			await fs.unlink('public/profile/' + fileName, err => {
				if (err) {
					console.log(err, 'Error remove img')
				}
			})
		} catch (e) {
			console.log(e)
		}
	}
}
