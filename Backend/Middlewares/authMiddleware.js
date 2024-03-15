import jwt from "jsonwebtoken";
import StudentModel from "../Models/studentModel.js";

export const authMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req?.headers?.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            if (token) {
                const decoded = jwt.verify(token, "0822IT21");
                const student = await StudentModel.findById(decoded?.id);
                if (!student) {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                }
                req.student = student;
                next();
            } else {
                return res.status(401).json({ success: false, message: 'Token not provided' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Invalid token format' });
        }
    } catch (err) {
        console.error("Error in authMiddleware:", err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        } else {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};
