import productos from './productos.json' with {type: 'json'}

export default class ProductosController {

    static getAll=(req,res)=>{
        res.json(productos)
    }

    static SearchByQuery =(req, res)=> {
        const { disponible, nombre} =req.query

        let resultado= productos

        if(disponible !== undefined){
            const BoolD=disponible ==='true'
            resultado= resultado.filter(p=> p.disponible ===BoolD)
        }

        if(nombre){
            resultado=resultado.filter(p=> p.nombre.toLowerCase().includes(nombre.toLowerCase()))
        }

        if(resultado.length===0){
            return res.status(404).json({
                message: 'Producto No encontrado'
            })
        }
        
        res.json(resultado)
    }


    static SearchById =(req, res)=>{
    const {id} = req.params
    const parseId =Number(id)

        if(isNaN(parseId)){
            return res.status(400).json({
                message: 'El ID debe ser un número'
            })
        }

        const producto= productos.find(p=> p.id == parseId)

        if(!producto){
            return res.status(404).json({
                message: 'El producto no existe'
            })
        }
        res.json(producto)
    }

    static create =(req, res)=>{
    const id= Date.now()
    const {nombre, precio, descripcion, disponible}=req.body

        if(!nombre){
            return res.status(400).json({
                message: 'Debe de ingresar un nombre'
            })
        }

        if( typeof precio !== 'number' || precio <= 0){
            return res.status(400).json({
                message: 'El precio debe de ser mayor a cero'
            })
        }

        if(!descripcion || descripcion.length <10){
            return res.status(400).json({
                message: 'La descripción debe tener mínimo 10 caracteres'
            })
        }

        const nuevoP ={
            id,
            nombre,
            precio,
            descripcion,
            disponible: disponible === true,
            fechaIngreso: new Date().toISOString()
        }

    productos.push(nuevoP)
    res.status(201).json(nuevoP)

    }


    static delete =(req, res) =>{
    const {id}= req.params
    const parseId= Number(id)

        if(isNaN(parseId)){
            return res.status(400).json({
                message: 'Por favor ingrese un número'
            })
        }

        const index =productos.findIndex(p=> p.id === parseId)

        if(index === -1){
            return res.status(404).json({
                message: 'El producto no se encuentra. Verfique la información'
            })
        }

        productos.splice(index,1)
        res.json({message: 'El producto ha sido eliminado'})
    }

    static update =(req, res)=>{
    const {id}=req.params
    const parseId =Number (id)

        if(isNaN(parseId)){
            return res.status(400).json({
                message: 'El ID debe ser un número'
            })
        }

        const index =productos.findIndex(p=> p.id === parseId)

        if (index === -1){
            return res.status(404).json({
                message:'El producto no se encuentra. Verfique la información'
            })
        }

        const {nombre, precio, descripcion, disponible} =req.body

        if(!nombre){
            return res.status(400).json({
                message:'Debe de ingresar un nombre'
            })
        }

        if(typeof precio !== 'number' || precio <=0){
            return res.status(400).json({
                message: 'El precio debe de ser mayor a cero'
            })
        }

        if(!descripcion || descripcion.length <10){
            return res.status(400).json({
                message: 'La descripción debe tener mínimo 10 caracteres'
            })
        }

        const productoActualizado={
            id:parseId,
            nombre,
            precio,
            descripcion,
            disponible: disponible == true,
            fechaIngreso: productos[index].fechaIngreso
        }


        productos[index] = productoActualizado

        res.json({message: 'El producto ha sido actualizado correctamente', producto: productoActualizado})
    }
}

