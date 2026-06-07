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
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
    res.send("Running");
});
export default app;