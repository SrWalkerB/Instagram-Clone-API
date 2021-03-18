import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import crypto from "crypto";
import bcrypto from 'bcrypt';
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/UserRepository"
import { Request, Response } from "express";

class PopulatedDatabase{

    async populated(Request: Request, Response: Response){

        const userRepository = await getCustomRepository(UserRepository);
        const generated = (bytes: number) => crypto.randomBytes(bytes).toString('hex');

        for(let x = 0; x < 1000000; x++){

            const id = uuidv4() + generated(16);
            const nameFirt = faker.name.firstName()
            const nameUser = `${nameFirt} ${faker.name.lastName()}`;
            const username = `${nameFirt}${generated(5)}`;
            const email = `${generated(5)}${faker.internet.email()}`;
            const password = `${nameFirt}123`

            console.log("Index", x);
            console.log("ID", id);
            console.log(`Name: ${nameUser}`)
            console.log(`Username: ${username}`)
            console.log(`Email: ${email}`)
            console.log(`Password: ${password}`)
            console.log()

            await userRepository.insert({
                id: id,
                name_full: nameUser,
                username: username,
                email: email,
                password: bcrypto.hashSync(password, 12),
                atualized_at: new Date()
            });
        }

        return Response.status(200).json({ msg: "HEllo " });
    }
}

export default new PopulatedDatabase;