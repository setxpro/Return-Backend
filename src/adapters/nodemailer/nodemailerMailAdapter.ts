import { MailAdapters, SendMailData } from '../mailAdapters';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c36f96a9698c4c",
      pass: "04da1407d07750"
    }
  });

export class NodemailerMailAdapter implements MailAdapters {
    async sendMail({subject, body}: SendMailData)  {
        await transport.sendMail({
        from: 'Equipe Feedback <oi@feedget.com>',
        to: 'Patrick Anjos <developer@seven77@gmail.com>',
        subject,
        html: body
    })
    };
}