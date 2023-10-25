import express from 'express';
import productRouter from '../src/router/products.router.js';
import cartRouter from '../src/router/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor de servicios!');
});

app.use('/products', productRouter); 
app.use('/carts', cartRouter);       

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});;