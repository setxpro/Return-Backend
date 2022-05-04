import express from 'express'


import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
export const routes = express.Router()

routes.post('/feedbacks', async(req, res) => {

    const { type, comment, screenshot } = req.body

    const PrimaFeedbackRepository = new PrismaFeedbacksRepository()

    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      PrimaFeedbackRepository,
      nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
      type, 
      comment, 
      screenshot
    })

     return res.status(201).send();
 })