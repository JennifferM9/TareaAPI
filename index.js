import express from 'express'
import productosRouter from './productos.routes.js'

const app= express()
app.use(express.json())
app.use('/productos', productosRouter)

const PORT=3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})