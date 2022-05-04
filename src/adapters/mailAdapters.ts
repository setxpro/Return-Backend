
export interface SendMailData {
    subject: string;
    body: string;
}

export interface MailAdapters {
    sendMail: (data: SendMailData) => Promise<void>;
}