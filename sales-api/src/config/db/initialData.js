import Order from "../../modules/sales/model/Order.js";

export async function createInitialData() {
    await Order.collection.drop();
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
            name: 'User Teste',
            email: 'usertest@gmail.com'
        },
        status: 'APPROVED',
        createdAt: new Date(),
        updatedAt: new Date()
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
            email: 'usertest2@gmail.com'
        },
        status: 'REJECTED',
        createdAt: new Date(),
        updatedAt: new Date()
    });

    let initialData = await Order.find();
    console.info(`Initial data was created: ${JSON.stringify(initialData, undefined, 2)}`)
}