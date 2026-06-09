import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());


import userRoutes from "./routes/user.route";
import customerRoutes from "./routes/customer.route"
import adminRoutes from "./routes/admin.route"
app.use("/api/users", userRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);

export default app;