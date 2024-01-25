import { productService } from "../services/index.repositories.js"


export const getProducts = async (req, res)=> {
    try {
        /* const products = await juan.getProducts() */
        const limit = parseInt(req.query.limit) || 3
        const page = parseInt(req.query.page) || 1
        const query = req.query.query || ""
        const order = req.query.sort === "Desc" ? -1 : 1
        const sortValue = req.query.sort? {price: order} :'-createdAt'
 
        const search = {}
        if (query) {
            search.title= { "$regex": query, "$options": "i" } 
            search.category= { "$regex": query, "$options": "i" }
        }

        const result = await productService.getProducts(search, limit, page, query, sortValue) 

        result.payload = result.docs
        result.query = query
        result.sortOrder = sortValue
        result.status = "succes"
        delete result.docs

        console.log(result);

        res.status(200).send(result)
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send(error)
    }
}

export const getProductById = async (req, res) => {
    try {
        const id=req.params.pid
        //const productRequired = await juan.getProductsById(parseInt(id))
        const productRequired = await productService.getProductById(id)
        productRequired? res.json( { productRequired } ) : res.json("Not Found")
        
    } catch (error) {
        console.log("Error " + error);
        res.status(500).send(error)    
    }
}

export const createProduct = async (req,res) => {
    try {
        const product = req.body
        const { title, category, description, price, thumbnail, code, stock } = product

        //const productAdded = await juan.addProduct(title, category, description, price, thumbnail, code, stock)
        const productAdded = await productService.createProduct(title, category, description, price, thumbnail, code, stock)
        
        /* ProductsModel.create({title, category, description, price, thumbnail, code, stock}) */

        res.json(productAdded)

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const updateProduct = async (req,res) =>{
    try {
        const id = req.params.pid
        const updateRequest = req.body

        const productUpdated = await productService.updateProduct(id, updateRequest)/* ProductsModel.updateOne({ _id: id },{ $set: updateRequest }); */
        
        res.status(200).send({productUpdated})

        /*
        const updateMessage = await juan.updateProduct(parseInt(req.params.pid),keyToUpdate,newValue) 
        */
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const id=req.params.pid
        //const deletionMessage = await juan.deleteProduct(id)
        await productService.deleteProduct(id)
        /* await ProductsModel.deleteOne({ _id: id }) */;
        res.status(200).send("Product ID "+id+" has been deleted")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
}