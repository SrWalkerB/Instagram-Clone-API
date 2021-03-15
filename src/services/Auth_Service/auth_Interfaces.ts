

interface ICreateUser{
    name: string,
    surname: string,
    email: string,
    password: string
}

interface ILoginUser{
    email: string,
    password: string
}

export {
    ICreateUser,
    ILoginUser
}