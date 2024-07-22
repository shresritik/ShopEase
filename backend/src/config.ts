import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
const config = {
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  password: process.env.ADMIN_PASSWORD,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 5000,
    refreshTokenExpiryMS: 50000,
  },
};
export default config;
