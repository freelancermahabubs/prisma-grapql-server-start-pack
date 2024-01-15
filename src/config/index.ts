import dotenv from "dotenv";
dotenv.config();

export const PORT = 8000;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRIES_IN = process.env.JWT_EXPIRIES_IN as string;
