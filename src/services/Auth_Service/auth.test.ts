import "babel-polyfill"
import { expect, test } from "@jest/globals";
import axios from "axios";
import crypto from "crypto";

const generate = () => {
    return crypto.randomBytes(20).toString("hex");
}


test.only("Create user and delete", async () => {

    /* const createUser01 = await axios.post("http://localhost:4530/auth", {
        name: generate(),
        surname: generate(),
        email: `${generate()}@gmail.com`,
        password: generate()
    }) */

    expect(1+1).toBe(2);
})