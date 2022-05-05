import express from 'express';
import {createServer} from 'http'
import cors from 'cors';
import axios from 'axios';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { createSocket } from './utils/socketIo.js';
import { verifyJwt } from './middlewares/verifyJwt.js';

connectDB();

const app = express();
const httpServer = createServer(app)


app.use(express.json())
app.use(cors({origin:"*"}));
app.use(morgan('dev'));
// app.use(verifyJwt)

createSocket(httpServer)


import AUTH_ROUTES from './routes/userRoutes.js'
import CATEGORY_ROUTES from './routes/categoryRoutes.js'
import COMPANY_ROUTES from './routes/companyRoutes.js'


app.use('/user', AUTH_ROUTES);
app.use('/category', CATEGORY_ROUTES);
app.use('/company', COMPANY_ROUTES);

app.get('/protected',async (req,res)=>{
    try {
        
        const accessToken = req.headers.authorization.split(' ')[1];
        const response = await axios.get('https://virtual-company.us.auth0.com/userinfo',{
            headers:{
                authorization: `Bearer ${accessToken}`
            }
        });
        const userInfo = response.data
        res.send("helo");
    } catch (error) {
        res.send(error.message)
    }
})

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    const status = error.status || 500
    const message = error.message || 'Internal server error'
    res.status(status).send(message)
})

httpServer.listen(4000,()=> console.log('server on port 4000'))
