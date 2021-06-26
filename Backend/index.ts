import Server from './class/server';
import userRoutes from './routes/usuarios';
import connection from './bin/connectionMySQL';
import bodyParser from 'body-parser';

//Creando servidor web
const server = new Server();

server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});

server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())
// Rutas de aplicacion
server.app.use('/users', userRoutes);

// conexion my sql
connection.connect((error)=>{
    if(error){
        throw error
    }else{
        console.log('Aplicacion conectada a la base de datos de pollos')
    }
})
