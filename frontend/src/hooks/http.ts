export const basesUrl = 'http://localhost:5000/api'

type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const http = async (
	url: string,
	method: methodType = 'GET',
	body: any = null,
	headers: any = {}
) => {
	try {
		if (body) {
			body = JSON.stringify(body)
			headers = { 'Content-Type': 'application/json' }
		}
		const res: Response = await fetch(basesUrl + url, { method, body, headers })

		return await res.json()
	} catch (e) {
		console.log(e)
	}
}
