import express from 'express'
import { prisma } from './prisma'

import nodemailer from 'nodemailer'
export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c36f96a9698c4c",
      pass: "04da1407d07750"
    }
  });

routes.post('/feedbacks', async(req, res) => {

    const { type, comment, screenshot } = req.body

    const feedback = 

    await transport.sendMail({
        from: 'Equipe Feedback <oi@feedget.com>',
        to: 'Patrick Anjos <developer@seven77@gmail.com>',
        subject: 'New Feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 1rem; color: #333;">`,
            `<p>Feedback Type: ${type}</p>`,
            `<p>Comment: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

     return res.status(201).json({ data: feedback })
 })