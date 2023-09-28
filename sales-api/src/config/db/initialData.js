import Order from "../../modules/sales/model/Order.js";
import { v4 as uuidv4 } from 'uuid';

export async function createInitialData() {
    try{
        let exisingData = await Order.find();
        if(exisingData && exisingData.length > 0) {
            console.info("Remove existing data...")
            await Order.collection.drop();
        }
        await Order.create({
            products: [
                {
                    productId: 1001,
                    quantity: 3,
                },
                {
                    productId: 1002,
                    quantity: 1,
                },
                {
                    productId: 1003,
                    quantity: 1,
                },
            ],
            user: {
                id: "daksdjaksfasçlfasf",
                name: 'User Teste 1',
                email: 'teste@email.com'
            },
            status: 'APPROVED',
            createdAt: new Date(),
            updatedAt: new Date(),
            transactionid: uuidv4(),
            serviceid: uuidv4()
        });
        await Order.create({
            products: [
                {
                    productId: 1001,
                    quantity: 4,
                },
                {
                    productId: 1003,
                    quantity: 2,
                },
            ],
            user: {
                id: "beryytryrtwyubyvjykjybkjyu",
                name: 'User Teste 2',
                email: 'teste2@email.com'
            },
            status: 'REJECTED',
            createdAt: new Date(),
            updatedAt: new Date(),
            transactionid: uuidv4(),
            serviceid: uuidv4()
        });
    }catch(e) {
        console.info(e)
    }
    let initialData = await Order.find();
    console.info(`Initial data was created: ${JSON.stringify(initialData, undefined, 2)}`)
}