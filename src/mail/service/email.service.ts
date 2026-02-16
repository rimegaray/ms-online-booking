import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
    ){}

    async sendMessage(username: string, email?: string) {
        const title = `Bienvenido ${username} a PSICOSOFT! 🙌🏻`;

        await this.mailerService.sendMail({
            to: email,
            subject: title,
            text: `Tu cuenta ${username} se registró correctamente 🎉.` 
        })
    }
}