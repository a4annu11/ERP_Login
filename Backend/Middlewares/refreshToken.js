import jwt from "jsonwebtoken"

const generateRefreshToken = (id)=>{
    return jwt.sign({id},"0822IT21",{expiresIn :"7d"})
}

export default generateRefreshToken;