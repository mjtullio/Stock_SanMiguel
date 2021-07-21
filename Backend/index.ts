import Server from './class/server';
import userRoutes from './routes/usuarios';
import connection from './bin/connectionMySQL';
import bodyParser from 'body-parser';
import proveedoresRoutes from './routes/proveedores';
import tiposRoutes from './routes/tipos';
import productosRoutes from './routes/productos';
import pedidosprovRoutes from './routes/pedidos_proveedores';
import pedidosventRoutes from './routes/pedidos_venta';
import detallesRoutes from './routes/detalles';
import stockRoutes from './routes/stock';
import fileUpload from 'express-fileupload';
import cors from 'cors';
//Creando servidor web
const server = new Server();

server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});

server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())

//upload
server.app.use(fileUpload());

//cors
server.app.use(cors());

// Rutas de aplicacion
server.app.use('/users', userRoutes);
server.app.use('/prov', proveedoresRoutes);
server.app.use('/tipos', tiposRoutes);
server.app.use('/produ', productosRoutes);
server.app.use('/pedidosprov', pedidosprovRoutes);
server.app.use('/pedidosvent', pedidosventRoutes);
server.app.use('/detalles', detallesRoutes);
server.app.use('/stock', stockRoutes);



// conexion my sql
connection.connect((error)=>{
    if(error){
        throw error
    }else{
        console.log('Aplicacion conectada a la base de datos de pollos')
    }
})
