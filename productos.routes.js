import { Router } from 'express'
import ProductosController from './productos.controller.js'

const productosRouter= Router ()

productosRouter.get('/', ProductosController.getAll)
productosRouter.get('/disponibles', ProductosController.SearchByQuery)
productosRouter.get('/:id', ProductosController.SearchById)
productosRouter.post('/',ProductosController.create)
productosRouter.put('/:id', ProductosController.update)
productosRouter.delete('/:id', ProductosController.delete)

export default productosRouter