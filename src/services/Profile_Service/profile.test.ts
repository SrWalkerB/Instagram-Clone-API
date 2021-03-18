import "babel-polyfill"
import axios from "axios";
import crypto from "crypto";
import { expect, test } from "@jest/globals";

const generate = () => {
    return crypto.randomBytes(10).toString("hex");
}


test.only("Test Profile seacher", async () => {

    const password_user_01 = generate();
    const password_user_02 = generate();

    const user01 = await axios.post('http://localhost:4530/auth/create', {
        name_full: generate(),
        username: generate(),
        email: `${generate()}gmail.com`,
        password: password_user_01
    })
    const user02 = await axios.post('http://localhost:4530/auth/create', {
        name_full: generate(),
        username: generate(),
        email: `${generate()}gmail.com`,
        password: password_user_02
    })

    expect(user01.status).toBe(201);
    expect(user02.status).toBe(201);

    const login_user = await axios.post("http://localhost:4530/auth", {
        email: user01.data.email,
        password: password_user_01
    })

    const login_user2 = await axios.post("http://localhost:4530/auth", {
        email: user02.data.email,
        password: password_user_02
    })

    expect(login_user.status).toBe(200);
    expect(login_user2.status).toBe(200);

    
    const consult_user = await axios.get("http://localhost:4530/profile", {
        headers: {
            token: login_user.data.msg
        } 
    })

    const consult_user2 = await axios.get("http://localhost:4530/profile", {
        headers: {
            token: login_user2.data.msg
        } 
    })

    const user01_data = {
        id: user01.data.id,
        name_full: user01.data.name_full,
        username: user01.data.username,
        email: user01.data.email,
        created_at: user01.data.created_at,
    }

    const user02_data = {
        id: user02.data.id,
        name_full: user02.data.name_full,
        username: user02.data.username,
        email: user02.data.email,
        created_at: user02.data.created_at,
    }

    expect(consult_user.data).toMatchObject(user01_data);
    expect(consult_user2.data).toMatchObject(user02_data);


    const delete_user01 = await axios.delete(`http://localhost:4530/auth/${user01.data.id}`);
    const delete_user02 = await axios.delete(`http://localhost:4530/auth/${user02.data.id}`);

    expect(delete_user01.status).toBe(200)
    expect(delete_user02.status).toBe(200)
})