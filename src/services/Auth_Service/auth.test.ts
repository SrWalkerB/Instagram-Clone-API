import "babel-polyfill"
import { describe, expect, it, test } from "@jest/globals";
import axios from "axios";
import crypto from "crypto";

const generate = () => {
    return crypto.randomBytes(10).toString("hex");
}

test.only("Create user and delete", async () => {

    const user01 = await axios.post("http://localhost:4530/auth/create", {
        name_full: generate(),
        username: generate(),
        email: `${generate()}@gmail.com`,
        password: generate()
    })

    const user02 = await axios.post("http://localhost:4530/auth/create", {
        name_full: generate(),
        username: generate(),
        email: `${generate()}@gmail.com`,
        password: generate()
    })

    const user03 = await axios.post("http://localhost:4530/auth/create", {
        name_full: generate(),
        username: generate(),
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


test.only("Test Login and Delete", async () => {

    const password_User01 = generate();
    const password_User02 = generate();
    const password_User03 = generate();

    const user01 = await axios.post('http://localhost:4530/auth/create', {
        name_full: generate(),
        username: generate(),
        email: `${generate()}gmail.com`,
        password: password_User01
    })

    const user02 = await axios.post('http://localhost:4530/auth/create', {
        name_full: generate(),
        username: generate(),
        email: `${generate()}gmail.com`,
        password: password_User02
    })

    const user03 = await axios.post('http://localhost:4530/auth/create', {
        name_full: generate(),
        username: generate(),
        email: `${generate()}gmail.com`,
        password: password_User03
    })

    expect(user01.status).toBe(201);
    expect(user02.status).toBe(201);
    expect(user03.status).toBe(201);

    const login_User01 = await axios.post("http://localhost:4530/auth/", {
        email: user01.data.email,
        password: password_User01
    });
    
    const login_User02 = await axios.post("http://localhost:4530/auth/", {
        email: user02.data.email,
        password: password_User02
    })
    
    const login_User03 = await axios.post("http://localhost:4530/auth/", {
        email: user03.data.email,
        password: password_User03
    })
    
    expect(login_User01.status).toBe(200); 
    expect(login_User02.status).toBe(200); 
    expect(login_User03.status).toBe(200); 

    const delete_user01 = await axios.delete(`http://localhost:4530/auth/${user01.data.id}`);
    const delete_user02 = await axios.delete(`http://localhost:4530/auth/${user02.data.id}`);
    const delete_user03 = await axios.delete(`http://localhost:4530/auth/${user03.data.id}`);

    expect(delete_user01.status).toBe(200);
    expect(delete_user02.status).toBe(200);
    expect(delete_user03.status).toBe(200);

    expect(delete_user01.data.msg).toBe("User Deletado")
    expect(delete_user02.data.msg).toBe("User Deletado")
    expect(delete_user03.data.msg).toBe("User Deletado")

}) 