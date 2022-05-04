 import express from 'express'
 import nodemailer from 'nodemailer'
import { prisma } from './prisma'

 const app = express()
 const port = 5000
 app.use(express.json())

 const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c36f96a9698c4c",
      pass: "04da1407d07750"
    }
  });


 app.post('/feedbacks', async(req, res) => {

    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    }) 

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

 app.listen(port,() => console.log(`Server running on the port ${port}`))