import "babel-polyfill"
import { expect, test } from "@jest/globals";
import axios from "axios";
import crypto from "crypto";

const generate = () => {
    return crypto.randomBytes(10).toString("hex");
}

test.only("Create user and delete", async () => {

    const user01 = await axios.post("http://localhost:4530/auth/create", {
        name: generate(),
        surname: generate(),
        email: `${generate()}@gmail.com`,
        password: generate()
    })

    const user02 = await axios.post("http://localhost:4530/auth/create", {
        name: generate(),
        surname: generate(),
        email: `${generate()}@gmail.com`,
        password: generate()
    })

    const user03 = await axios.post("http://localhost:4530/auth/create", {
        name: generate(),
        surname: generate(),
        email: `${generate()}@gmail.com`,
        password: generate()
    })

    expect(user01.status).toBe(201);
    expect(user02.status).toBe(201);
    expect(user03.status).toBe(201);

    const deleteUser01 = await axios.delete(`http://localhost:4530/auth/${user01.data.id}`);
    const deleteUser02 = await axios.delete(`http://localhost:4530/auth/${user02.data.id}`);
    const deleteUser03 = await axios.delete(`http://localhost:4530/auth/${user03.data.id}`);

    expect(deleteUser01.status).toBe(200);
    expect(deleteUser02.status).toBe(200);
    expect(deleteUser03.status).toBe(200);

    expect(deleteUser01.data.msg).toBe("User Deletado");
    expect(deleteUser02.data.msg).toBe("User Deletado");
    expect(deleteUser03.data.msg).toBe("User Deletado") 
})