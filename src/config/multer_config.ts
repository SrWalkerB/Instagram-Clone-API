import multer from "multer";
import path from "path";
import crypto from "crypto";


export default {
    storage: multer.diskStorage({

        destination: (Request, file, cb) => {
            
            cb(null, path.resolve(__dirname, "..", "..", "uploads"))
        },

        filename: (Request, file, cb) => {

            crypto.randomBytes(25, (err, hash) => {

                const filename = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, filename);
            })
        }
    }),
    limits: {
        fileSize: 4 * 1024 * 1024
    },
    fileFilter: (Request, file, cb) => {

        const allowMimes = [
            "image/png",
            "image/jpeg"
        ]

        if(!allowMimes.includes(file.mimetype)){

            return cb(null, false);
        }

        cb(null, true);
    }
}