import { MailAdapters } from '../adapters/mailAdapters';
import { FeedbacksRepository } from '../repositories/feedbacksRepository';

// Application business rules
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapters    
    ) { }

    // Create a new feedback
    async execute(data: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = data;

        if (!type) {
            throw new Error('Type is Required.')
        }
        if (!comment) {
            throw new Error('Comment is Required.')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'New Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 1rem; color: #333;">`,
                `<p>Feedback Type: ${type}</p>`,
                `<p>Comment: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })

    }
}