import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
const config = {
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  password: process.env.ADMIN_PASSWORD,
};
export default config;
