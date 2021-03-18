import faker from "faker";
import crypto from "crypto";
import { getCustomRepository } from "typeorm"
import UserRepository from "../repositories/UserRepository"
import { Request, Response } from "express";

class PopulatedDatabase{

    async populated(Request: Request, Response: Response){

        const userRepository = await getCustomRepository(UserRepository);
        const generated = crypto.randomBytes(4).toString('hex');

        for(let x = 0; x < 5; x++){

            
            const nameUser = `${faker.name.firstName()} ${faker.name.lastName()}`;
            const email = `${generated}${faker.internet.email()}`;

            console.log(`Name: ${nameUser}`)
            console.log(`Email: ${email}`)
            console.log()
        }

        return Response.status(200).json({ msg: "HEllo " });
    }
}

export default new PopulatedDatabase;