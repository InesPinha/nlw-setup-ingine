import Fastify from 'fastify';
import cors from '@fastify/cors'
import { appRoutes } from './routes';


const app = Fastify();

//alow being called by client 
app.register(cors,
   /*{
        origin: [''] //I can configure witch address can access
}*/);

app.register(appRoutes);

/*
 * HTTP Method: GET, POST, PUT, PATCH, DELETE
 */


app.listen({ port: 3333, host: '0.0.0.0', }).then(() => {
    console.log('Http server running')
})