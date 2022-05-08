import express from 'express'
import cors from 'cors'
import { routes } from './routes'

    const app = express()
    const port = 3333
    
    app.use(cors({
        origin: 'https://return-frontend.vercel.app/'
    }))
    app.use(express.json())
    app.use(routes)
 
app.listen(process.env.PORT || port,() => console.log(`HTTP server running`))