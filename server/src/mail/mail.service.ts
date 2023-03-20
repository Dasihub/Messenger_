import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendMail(email: string) {
		try {
			const num_1 = Math.floor(Math.random() * 9) + 1
			const num_2 = Math.floor(Math.random() * 9) + 1
			const num_3 = Math.floor(Math.random() * 9) + 1
			const num_4 = Math.floor(Math.random() * 9) + 1

			const code: string = `${num_1}${num_2}${num_3}${num_4}`

			await this.mailerService.sendMail({
				from: process.env.SMTP_USER,
				to: email,
				subject: 'Код для активации аккаунта',
				text: 'Dosya',
				html: `
					<html>
						<head>
							<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
									rel="stylesheet">
							<title>Mail</title>
							<style>
									* {
									    margin: 0;
									    padding: 0;
									    box-sizing: border-box;
									}

									body {
									    font-family: 'Roboto', sans-serif;
									}

									header {
									    background-color: #6E00FF;
									    text-align: center;
									    color: white;
									    padding: 16px;
									    font-size: 24px;
									}

									h1 {
									    text-align: center;
									    border: 1px solid black;
									    width: fit-content;
									    display: block;
									    margin: 16px auto 0 auto;
									    padding: 8px;
									    border-radius: 4px;
									}
							</style>
						</head>
						<body>
							<header>Код для активации аккаунта</header>
							<h1>${code}</h1>
						</body>
					</html>
			`
			})

			return code
		} catch (e) {
			console.log(e)
		}
	}
}
