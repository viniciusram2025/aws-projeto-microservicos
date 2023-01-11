import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialData() {
    try {
        await User.sync ({ force: true});

        let password = await bcrypt.hash("123456", 10);

        await User.create({
            name: "User Teste 1",
            email: "teste@email.com",
            password: password,
        });

        await User.create({
            name: "User Teste 2",
            email: "teste2@email.com",
            password: password,
        });
    } catch (err) {
       console.log(err)
    }
};