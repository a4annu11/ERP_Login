import mongoose from "mongoose";

const ValidateMongodbID = (Id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(Id);
    if(!isValid){
        throw new Error("This Id is Not Valid")
    }
}

export default  {ValidateMongodbID}