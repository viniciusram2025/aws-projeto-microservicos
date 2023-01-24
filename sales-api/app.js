import express from "express";

import { connectMongoDB } from "./src/config/db/mongoDBConfig.js";
import { createInitialData } from "./src/config/db/initialData.js";
import { connectRabbitMq } from './src/config/rabbitmq/rabbitConfig.js';

import checkToken from './src/config/auth/checkToken.js';
import orderRoutes from './src/modules/sales/routes/OrderRoutes.js';


const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDB();
//createInitialData();
connectRabbitMq();

app.use(express.json());
app.use(checkToken);
app.use(orderRoutes);


app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: 'Sales-api',
        status: 'up',
        httpStatus: 200,
    });
});

app.listen(PORT, () => {
    console.info(`Server started successfully at port ${PORT}`);
})