import jwt from 'jsonwebtoken';

export const createEmailVerificationToken = async (studentId) => {
    return jwt.sign({studentId},"EmailVerify",{expiresIn :"1d"})
};
