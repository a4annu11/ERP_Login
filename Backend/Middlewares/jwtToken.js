import jwt from "jsonwebtoken"

const generateToken = (id)=>{
    return jwt.sign({id},"0822IT21",{expiresIn :"7d"})
}

export default generateToken