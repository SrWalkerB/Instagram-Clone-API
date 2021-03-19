import jwt from "jsonwebtoken";

export default new class Tokens{

    generated_Token(data: string){

        return jwt.sign({ id: data }, process.env.SECRET_KEY!, { expiresIn: "2h" })
    }

    decoded_token(token: string): object | any{
        return jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
            if(err){
                return { err: "invalid token" };
            }

            return decoded;
        });
    }
}