import { basesUrl } from '../hooks/http'

class UploadPhotoService {
	async uploadPhoto(formData: FormData): Promise<string> {
		const res: Response = await fetch(basesUrl + '/user/profile-img', {
			body: formData,
			method: 'POST'
		})
		const { data }: { data: string } = await res.json()
		return data
	}
}

export default new UploadPhotoService()
