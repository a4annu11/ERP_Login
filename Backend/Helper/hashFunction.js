import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPasssword = await bcrypt.hash(password, saltRounds);
    return hashedPasssword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPasssword) => {
  return bcrypt.compare(password, hashedPasssword);
};
