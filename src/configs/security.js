import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// ====== hash password ======
export const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
  return await bcrypt.hash(plainPassword, salt);
};

// ====== compare password ======
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
