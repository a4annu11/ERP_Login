import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Throw the error to indicate failure
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createPasswordResetToken = async () => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest("hex");

    // Set expiration time to 10 minutes from now
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Return an object containing the hashed token and expiration time
    return { token: hashedToken, expiresAt: expirationTime };
  } catch (error) {
    console.error("Error generating password reset token:", error);
    throw error;
  }
};
