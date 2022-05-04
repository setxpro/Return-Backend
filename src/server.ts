 import express from 'express'
import { prisma } from './prisma'

 const app = express()
 const port = 5000
 app.use(express.json())


 app.post('/feedbacks', async(req, res) => {

    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })

     return res.status(201).json({ data: feedback })
 })

 app.listen(port,() => console.log(`Server running on the port ${port}`))