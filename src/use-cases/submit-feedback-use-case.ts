import { FeedbacksRepository } from '../repositories/feedbacksRepository';

// Application business rules
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(private feedbackRepository: FeedbacksRepository) { }

    // Create a new feedback
    async execute(data: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = data;

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

    }
}