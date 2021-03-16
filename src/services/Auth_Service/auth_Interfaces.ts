

interface ICreateUser{
    name_full: string,
    username: string,
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